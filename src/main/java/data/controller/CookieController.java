package data.controller;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
public class CookieController {

    private static final String JWT_SECRET = "KbPeShVmYq3t6w9z$C&F)H@McQfTjWnZ";

    @GetMapping("/api/get-cookie")
    public ResponseEntity<String> getCookieValue(HttpServletRequest request) {
        // HTTP Only 쿠키 값을 가져옵니다.
        Cookie[] cookies = request.getCookies();
        String cookieValue = null;
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("access_token")) {
                    cookieValue = cookie.getValue();
                    break;
                }
            }
        }
        //  System.out.println("cookieValue = " + cookieValue);
        // 가져온 쿠키 값을 클라이언트로 전달합니다.
        if (cookieValue != null) {
            return ResponseEntity.ok(cookieValue);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // JWT 토큰에서 email 값을 추출하는 메서드
    @GetMapping("/api/getemail")
    public String getEmailFromAccessToken(String AccessToken) {
        // JWT 토큰 디코딩 및 파싱
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(Keys.secretKeyFor(SignatureAlgorithm.HS256))
                .build()
                .parseClaimsJws(AccessToken)
                .getBody();

        // email 값을 추출
        return claims.getSubject();
    }

    @DeleteMapping("/api/delete-cookie")
    public ResponseEntity<String> deleteCookie(HttpServletResponse response) {
        // 쿠키 삭제를 위해 동일한 이름과 path, domain을 가진 쿠키를 생성하여 만료시간을 0으로 설정합니다.
        Cookie cookie = new Cookie("access_token", null);
        cookie.setPath("/");
        cookie.setDomain("localhost"); // 도메인을 적절하게 변경해야 합니다.
        cookie.setMaxAge(0);
        cookie.setHttpOnly(true);
        // 쿠키를 응답 헤더에 추가하여 클라이언트로 전달합니다.
        response.addCookie(cookie);
        return ResponseEntity.ok("Cookie deleted successfully");
    }


}

