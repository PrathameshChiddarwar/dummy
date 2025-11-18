package com.shreegen.ecommerce.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/order/users/payments")
@CrossOrigin(origins = "http://localhost:5173")
public class PaymentNotificationController {

    private static final Logger logger = LoggerFactory.getLogger(PaymentNotificationController.class);

    @Autowired
    private JavaMailSender mailSender;

    @PostMapping("/RAZORPAY")
    public ResponseEntity<String> handlePaymentSuccess(@RequestBody Map<String, Object> paymentDetails) {
        String paymentId = (String) paymentDetails.get("pgPaymentId");
        String status = (String) paymentDetails.get("pgStatus");

        String email = "chiddarwarprathamesh@gmail.com";
        String phoneNumber = "919922588917"; // India format

        if ("SUCCESS".equalsIgnoreCase(status)) {
            sendEmail(email, paymentId);
            sendSms(phoneNumber, "✅ Payment successful! Your order is confirmed. Payment ID: " + paymentId);
        }

        return ResponseEntity.ok("Payment confirmation received and notifications sent.");
    }

    private void sendEmail(String email, String paymentId) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(email);
            message.setSubject("Payment Successful - ShreeGen Store");
            message.setText("Dear Customer,\n\nYour payment with ID " + paymentId +
                    " has been successfully received.\n\nThank you for shopping with ShreeGen Store!");
            mailSender.send(message);
            logger.info("✅ Email sent to {}", email);
        } catch (MailException e) {
            logger.error("❌ Failed to send email to {}: {}", email, e.getMessage(), e);
        }
    }

    private void sendSms(String phoneNumber, String message) {
        try {
            String apiKey = "YOUR_FAST2SMS_API_KEY";
            String data = "sender_id=TXTIND&message=" + URLEncoder.encode(message, "UTF-8") +
                    "&language=english&route=v3&numbers=" + phoneNumber;

            URL url = new URL("https://www.fast2sms.com/dev/bulkV2");
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("authorization", apiKey);
            conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
            conn.setDoOutput(true);

            try (OutputStream os = conn.getOutputStream()) {
                os.write(data.getBytes());
                os.flush();
            }

            logger.info("✅ SMS sent to {} | Response Code: {}", phoneNumber, conn.getResponseCode());
        } catch (IOException e) {
            logger.error("❌ Failed to send SMS to {}: {}", phoneNumber, e.getMessage(), e);
        }
    }
}
