package com.ase.ase_box.security;

public class SecurityConstants {
    public static final int TOKEN_EXPIRATION = 7200000; // 7200000 milliseconds = 7200 seconds = 2 hours.
    public static final String BEARER = "Bearer "; // Authorization : "Bearer " + Token
    public static final String AUTHORIZATION = "Authorization"; // "Authorization" : Bearer Token
    public static final String KEY_PASSWORD = "aseproject";
    public static final String KEY_FILE = "ase_project.keystore";
}
