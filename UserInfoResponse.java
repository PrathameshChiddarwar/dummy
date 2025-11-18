package com.shreegen.ecommerce.controller;

import java.util.List;

public class UserInfoResponse {

    private Long id;
    private String token;
    private String username;
    private List<String> roles;

    // Constructor used during signin
    public UserInfoResponse(Long id, String token, String username, List<String> roles) {
        this.id = id;
        this.token = token;
        this.username = username;
        this.roles = roles;
    }

    // Constructor used during /user endpoint
    public UserInfoResponse(Long id, List<String> roles, String username) {
        this.id = id;
        this.username = username;
        this.roles = roles;
    }

    public Long getId() {
        return id;
    }

    public String getToken() {
        return token;
    }

    public String getUsername() {
        return username;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }
}
