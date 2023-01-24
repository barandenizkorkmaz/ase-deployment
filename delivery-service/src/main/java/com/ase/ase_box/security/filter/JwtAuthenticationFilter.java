package com.ase.ase_box.security.filter;

import com.ase.ase_box.security.SecurityConstants;
import com.ase.ase_box.security.jwt.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {
        System.out.println("AuthRequestFilter: doFilterInternal");

        String username = null;
        String jwt = null;
        final String authHeader = request.getHeader(SecurityConstants.AUTHORIZATION);
        System.out.println("Authenticate Header " + authHeader);

        if (authHeader != null && authHeader.startsWith(SecurityConstants.BEARER)) {
            // Get the JWT in the header.
            // If the JWT expires or not signed by us, send an error to the client
            jwt = authHeader.replace(SecurityConstants.BEARER, "");
            if (!jwtUtil.verifyJwtSignature(jwt)){
                response.sendError(HttpStatus.BAD_REQUEST.value(), "Failed to Verify JWT Token");
            }
        } else {
            response.sendError(HttpStatus.BAD_REQUEST.value(), "No JWT Token Found");
        }

        filterChain.doFilter(request, response);
    }
}
