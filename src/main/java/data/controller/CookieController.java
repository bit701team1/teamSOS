package data.controller;

import data.service.CookieService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jwt.setting.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api")
public class CookieController {

    private final JwtTokenProvider jwtTokenProvider;
    private CookieService cookieService;

    public CookieController(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    // JWT 토큰에서 email 값을 추출하는 메서드
    @GetMapping("/getemail")
    public String getEmailFromAccessToken(String AccessToken) {
        return cookieService.getEmailFromAccessToken(AccessToken);
    }
    
    //Cookie 값 획득
    @GetMapping("/get-cookie")
    public ResponseEntity<String> getCookieValue(HttpServletRequest request) {
       return cookieService.getCookieValue(request);
    }
    
    //Cookie 값 제거
    @DeleteMapping("/delete-cookie")
    public ResponseEntity<String> deleteCookie(HttpServletResponse response) {
       return cookieService.deleteCookie(response);
    }


}

