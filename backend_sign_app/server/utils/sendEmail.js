import nodemailer from "nodemailer";

export const sendSignatureEmail = async (toEmail, token) => {
  // ✅ Localhost link for development/testing
  const link = `http://localhost:3000/sign/${token}`;

  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"${process.env.EMAIL_NAME || "DocuApp"}" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: "📄 Please Sign the Document",
      html: `
        <div style="font-family: sans-serif; padding: 16px;">
          <h2 style="color: #2e6fd8;">You've been requested to sign a document</h2>
          <p>Hello,</p>
          <p>Please click the secure link below to review and sign the document:</p>
          <a href="${link}" style="color: #2e6fd8; font-weight: bold;">Sign Document</a>
          <p>This link will expire in 24 hours for your security.</p>
          <p style="margin-top: 24px;">Thanks,<br/>The DocuApp Team</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent to:", toEmail);
    console.log("📩 Link being emailed:", link); // Add this

  } catch (error) {
    console.error("❌ Failed to send email:", error.message);
    throw new Error("Email send failed");
  }
};
