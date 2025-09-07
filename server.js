const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,   // Gmail from .env
        pass: process.env.GMAIL_PASS    // App password from .env
    }
});

// Verify transporter
transporter.verify((error, success) => {
    if (error) {
        console.log("❌ Transporter error:", error);
    } else {
        console.log("✅ Transporter is ready to send emails");
    }
});

// ===== Brand Form Handler =====
app.post("/send-brand", async (req, res) => {
    const { company, domainEmail, campaign } = req.body;

    if (!company || !domainEmail || !campaign) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(domainEmail)) {
        return res.status(400).json({ success: false, message: "Invalid email address" });
    }

    // ❌ Block free/public providers
    const blockedDomains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"];
    const domain = domainEmail.split("@")[1].toLowerCase();

    if (blockedDomains.includes(domain)) {
        return res.status(400).json({
            success: false,
            message: "Please use a professional company email (not Gmail, Yahoo, Hotmail, etc.)"
        });
    }

    try {
        const mailOptions = {
            from: process.env.GMAIL_USER,
            replyTo: domainEmail,
            to: "contact@globallyinfluencer.com",
            subject: "📩 New Brand Partnership Request",
            html: `
                <h2>Brand Partnership Request</h2>
                <p><b>Company:</b> ${company}</p>
                <p><b>Email:</b> ${domainEmail}</p>
                <p><b>Campaign Details:</b></p>
                <p>${campaign.replace(/\n/g, "<br>")}</p>
                <hr>
                <p><small>Sent from Global Influencer Contact Form</small></p>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("✅ Brand email sent:", info.messageId);
        res.status(200).json({ success: true, message: "✅ Brand request sent successfully!" });
    } catch (error) {
        console.error("❌ Error sending brand email:", error);
        res.status(500).json({ success: false, message: "❌ Failed to send brand request. Please try again." });
    }
});

// ===== Creator Form Handler =====
app.post("/send-creator", async (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ success: false, message: "Invalid email address" });
    }

    try {
        const mailOptions = {
            from: process.env.GMAIL_USER,
            replyTo: email,
            to: "your_creator_email@gmail.com",
            subject: `📩 Creator Inquiry - ${subject}`,
            html: `
                <h2>Creator Inquiry</h2>
                <p><b>Name:</b> ${name}</p>
                <p><b>Email:</b> ${email}</p>
                <p><b>Subject:</b> ${subject}</p>
                <p><b>Message:</b></p>
                <p>${message.replace(/\n/g, "<br>")}</p>
                <hr>
                <p><small>Sent from Global Influencer Contact Form</small></p>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("✅ Creator email sent:", info.messageId);
        res.status(200).json({ success: true, message: "✅ Creator message sent successfully!" });
    } catch (error) {
        console.error("❌ Error sending creator email:", error);
        res.status(500).json({ success: false, message: "❌ Failed to send creator message. Please try again." });
    }
});

// Health check
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "OK",
        message: "Server is running correctly",
        timestamp: new Date().toISOString()
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ success: false, message: "Endpoint not found" });
});

// Error handler
app.use((error, req, res, next) => {
    console.error("🛑 Server error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
