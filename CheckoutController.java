package com.shreegen.ecommerce.controller;

import com.shreegen.ecommerce.util.EmailUtil;
import com.shreegen.ecommerce.util.SmsUtil;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/v1/orders")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5175"})
public class CheckoutController {

    private static final Logger logger = LoggerFactory.getLogger(CheckoutController.class);

    // default fallback destinations
    private static final String FALLBACK_EMAIL = "chiddawarprathamesh@gmail.com";
    private static final String FALLBACK_MOBILE = "9922588917";

    @Autowired
    private EmailUtil emailUtil;

    @Autowired
    private SmsUtil smsUtil;

    @PostMapping("/checkout")
    public ResponseEntity<?> checkout(@RequestBody Map<String, Object> data) {
        try {
            // -------------------------------
            // 1️⃣ READ INPUT
            // -------------------------------
            String email = data.get("email") != null
                    ? data.get("email").toString()
                    : FALLBACK_EMAIL;

            String mobile = data.get("mobile") != null
                    ? data.get("mobile").toString()
                    : FALLBACK_MOBILE;

            String amountStr = data.get("amount") != null
                    ? data.get("amount").toString()
                    : "0";

            double amount = Double.parseDouble(amountStr);

            // -------------------------------
            // 2️⃣ SEND EMAIL
            // -------------------------------
            String emailBody = "<h2>Order Confirmed!</h2>"
                    + "<p>Your ShreeGen order of <b>₹" + amount + "</b> is confirmed.</p>"
                    + "<p>Thank you for shopping with us!</p>";

            try {
                emailUtil.sendEmail(email, "Order Confirmation - ShreeGen", emailBody);
            } catch (Exception e) {
                logger.error("Failed to send email: {}", e.getMessage());
            }

            // -------------------------------
            // 3️⃣ SEND SMS
            // -------------------------------
            String smsMessage = "Your ShreeGen order of ₹" + amount + " is confirmed!";
            try {
                smsUtil.sendSms(smsMessage, mobile);
            } catch (Exception e) {
                logger.error("Failed to send SMS: {}", e.getMessage());
            }

            // -------------------------------
            // 4️⃣ SUCCESS RESPONSE
            // -------------------------------
            Map<String, Object> resp = new HashMap<>();
            resp.put("status", "success");
            resp.put("message", "Checkout complete. Email & SMS sent.");
            resp.put("emailSentTo", email);
            resp.put("smsSentTo", mobile);
            resp.put("amount", amount);

            return ResponseEntity.ok(resp);

        } catch (NumberFormatException | NullPointerException e) {
            logger.error("Checkout failed: {}", e.getMessage(), e);
            return ResponseEntity.status(500)
                    .body("Checkout failed: " + e.getMessage());
        }
    }
}
