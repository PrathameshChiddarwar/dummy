package com.shreegen.ecommerce.controller;

import java.util.Map;

import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.shreegen.ecommerce.util.SmsUtil;

@RestController
@RequestMapping("/api/v1/payments")
@CrossOrigin(origins = "http://localhost:5173") // Your React app URL
public class PaymentController {

    private static final Logger logger = LoggerFactory.getLogger(PaymentController.class);

    @Autowired
    private SmsUtil smsUtil;

    @Value("${razorpay.key}")
    private String razorpayKey;

    @Value("${razorpay.secret}")
    private String razorpaySecret;

    @PostMapping("/create-payment-link")
    public ResponseEntity<?> createOrder(@RequestBody Map<String, Object> data) {
        try {
            // ✅ Get amount (in paise)
            int amount = (int) data.get("amount");

            // ✅ Create Razorpay client
            RazorpayClient client = new RazorpayClient(razorpayKey, razorpaySecret);

            // ✅ Create order request
            JSONObject orderRequest = new JSONObject();
            orderRequest.put("amount", amount*100); // amount in paise
            orderRequest.put("currency", "INR");
            orderRequest.put("receipt", "txn_" + System.currentTimeMillis());

            // ✅ Create order in Razorpay
            Order order = client.orders.create(orderRequest);

            // ✅ Send SMS confirmation to user (optional at order creation)
            String message = "🛒 Order created successfully with amount ₹" + (amount / 100.0)
                    + ". Please complete payment to confirm your order.";
            smsUtil.sendSms(message, "9922588917");

            // ✅ Return order response
            return ResponseEntity.ok(order.toString());

        } catch (RazorpayException e) {
            logger.error("Razorpay error while creating order: {}", e.getMessage(), e);
            return ResponseEntity.status(500).body("Error creating order: " + e.getMessage());
        } catch (ClassCastException e) {
            logger.error("Invalid amount type: {}", e.getMessage(), e);
            return ResponseEntity.status(400).body("Invalid amount type");
        } catch (NullPointerException e) {
            logger.error("Missing required data: {}", e.getMessage(), e);
            return ResponseEntity.status(400).body("Missing required data");
        }
    }
}
