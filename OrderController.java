package com.shreegen.ecommerce.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shreegen.ecommerce.payload.OrderDTO;
import com.shreegen.ecommerce.payload.OrderRequest;
import com.shreegen.ecommerce.service.OrderService;
import com.shreegen.ecommerce.util.AuthUtil;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @Autowired
    private AuthUtil authUtil;

    @PostMapping("/order/users/payments/{paymentMethod}")
    public ResponseEntity<OrderDTO> orderProducts(@PathVariable String paymentMethod, @Valid @RequestBody OrderRequest orderRequest){
        String email = authUtil.loggedInEmail();
        OrderDTO order = (OrderDTO) orderService.placeOrder(email,
                orderRequest.getAddressId(),
                paymentMethod,
                orderRequest.getPgName(),
                orderRequest.getPgPaymentId(),
                orderRequest.getPgStatus(),
                orderRequest.getPgResponseMessage()
        );
        return new ResponseEntity<>(order, HttpStatus.CREATED);
    }

}
