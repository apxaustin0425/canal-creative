import { describe, expect, it } from "vitest";
import nodemailer from "nodemailer";

describe("SMTP credentials", () => {
  it("should verify SMTP connection with provided credentials", async () => {
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    expect(user, "SMTP_USER must be set").toBeTruthy();
    expect(pass, "SMTP_PASS must be set").toBeTruthy();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });

    // verify() checks the connection and auth without sending
    await expect(transport.verify()).resolves.toBe(true);
  }, 15000);
});
