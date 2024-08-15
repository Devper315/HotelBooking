package com.example.backend.config;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class SecurityConfig {
    String[] PUBLIC_GET_ENPOINTS = {"room/all"};
    String[] PUBLIC_POST_ENPOINTS = {"/auth/login", "/register"};
    String[] COMMON_ENDPOINTS = {"/profile"};
    CustomJWTDecoder jwtDecoder;
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.authorizeHttpRequests(request ->
                request
                .requestMatchers(HttpMethod.GET, "/user", "customer").hasRole("USER")
                .requestMatchers(HttpMethod.GET, "/admin").hasRole("USER")
                .requestMatchers(HttpMethod.GET, COMMON_ENDPOINTS).hasAnyRole("USER", "ADMIN")
                .requestMatchers(HttpMethod.POST, COMMON_ENDPOINTS).hasAnyRole("USER", "ADMIN")
                .requestMatchers(HttpMethod.POST, PUBLIC_POST_ENPOINTS).permitAll()
                .requestMatchers(HttpMethod.GET, PUBLIC_GET_ENPOINTS).permitAll()
                .anyRequest().authenticated());
        httpSecurity.oauth2ResourceServer(oath2 ->
                oath2.jwt(jwtConfigurer ->
                        jwtConfigurer.decoder(jwtDecoder)
                        .jwtAuthenticationConverter(jwtAuthenticationConverter())));
        httpSecurity.csrf(AbstractHttpConfigurer::disable);
        return httpSecurity.build();
    }

    @Bean
    public JwtAuthenticationConverter jwtAuthenticationConverter() {
        JwtGrantedAuthoritiesConverter grantedConverter = new JwtGrantedAuthoritiesConverter();
        grantedConverter.setAuthorityPrefix("");
        JwtAuthenticationConverter authConverter = new JwtAuthenticationConverter();
        authConverter.setJwtGrantedAuthoritiesConverter(grantedConverter);
        return authConverter;
    }
    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("http://localhost:3000/");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


}
