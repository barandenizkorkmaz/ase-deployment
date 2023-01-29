package com.ase.ase_box.security.filter;

import com.ase.ase_box.security.SecurityConstants;
import com.ase.ase_box.security.jwt.JwtUtil;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {
        System.out.println("AuthRequestFilter: doFilterInternal");

        String jwt = null;
        final String authHeader = request.getHeader(SecurityConstants.AUTHORIZATION);
        System.out.println("Authenticate Header " + authHeader);

        if (authHeader != null && authHeader.startsWith(SecurityConstants.BEARER)) {
            // Get the JWT in the header.
            // If the JWT expires or not signed by us, send an error to the client
            jwt = authHeader.replace(SecurityConstants.BEARER, "");

            if (jwtUtil.verifyJwtSignature(jwt)){

                String username = jwtUtil.extractUsername(jwt);
                Claims claims = jwtUtil.extractAllClaims(jwt);
                Collection<Map<String,String>> roles = claims.get("roles", Collection.class);

                List<GrantedAuthority> authorities = new ArrayList<>();
                roles.forEach((role) -> {
                    authorities.add(new SimpleGrantedAuthority(role.get("role")));
                });

                if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                    UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                            username,
                            "",
                            authorities
                    );
                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                    Authentication authContext = SecurityContextHolder.getContext().getAuthentication();
                    System.out.println(String.format("Authenticate Token Set:\n"
                                    + "Username: %s\n"
                                    + "Password: %s\n"
                                    + "Authority: %s\n",
                            authContext.getPrincipal(),
                            authContext.getCredentials(),
                            authContext.getAuthorities().toString()));
                }

            }
            else{
                response.sendError(HttpStatus.BAD_REQUEST.value(), "Failed to Verify JWT Token");
            }
        }

        filterChain.doFilter(request, response);
    }
}
