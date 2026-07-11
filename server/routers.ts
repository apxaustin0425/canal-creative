import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { notifyOwner } from "./_core/notification";
import { sendApplicationEmail } from "./email";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // ── Space Application ──────────────────────────────────────────────────────
  spaceApplication: router({
    submit: publicProcedure
      .input(
        z.object({
          // Personal
          firstName: z.string().min(1),
          lastName: z.string().min(1),
          email: z.string().email(),
          phone: z.string().optional(),
          // Business
          businessName: z.string().min(1),
          businessType: z.string().min(1),
          businessDescription: z.string().min(1),
          website: z.string().optional(),
          // Space
          spaceType: z.string().min(1),
          sqftNeeded: z.string().optional(),
          moveInDate: z.string().optional(),
          budget: z.string().optional(),
          leaseLength: z.string().optional(),
          additionalNeeds: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const title = `New Space Application — ${input.firstName} ${input.lastName} (${input.businessName})`;
        const content = [
          `=== CANAL CREATIVE SPACE APPLICATION ===`,
          ``,
          `PERSONAL`,
          `Name: ${input.firstName} ${input.lastName}`,
          `Email: ${input.email}`,
          `Phone: ${input.phone || "—"}`,
          ``,
          `BUSINESS`,
          `Business Name: ${input.businessName}`,
          `Type: ${input.businessType}`,
          `Description: ${input.businessDescription}`,
          `Website: ${input.website || "—"}`,
          ``,
          `SPACE NEEDS`,
          `Space Type: ${input.spaceType}`,
          `Sq Ft: ${input.sqftNeeded || "Not specified"}`,
          `Move-in: ${input.moveInDate || "Flexible"}`,
          `Budget: ${input.budget || "Flexible"}`,
          `Lease: ${input.leaseLength || "No preference"}`,
          `Notes: ${input.additionalNeeds || "—"}`,
          ``,
          `Submitted: ${new Date().toLocaleString("en-US", { timeZone: "America/New_York" })} ET`,
        ].join("\n");

        // Send both: owner notification (in-app) + email to aaacuna1@gmail.com
        const [delivered, emailed] = await Promise.allSettled([
          notifyOwner({ title, content }),
          sendApplicationEmail(input),
        ]);
        return {
          success: true,
          delivered: delivered.status === "fulfilled" ? delivered.value : false,
          emailed: emailed.status === "fulfilled" ? emailed.value : false,
        };
      }),
  }),
});

export type AppRouter = typeof appRouter;
