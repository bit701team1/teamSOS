package jwt.setting;

import data.dto.security.TokenDto;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.security.Key;
import java.util.Date;
import java.util.stream.Collectors;

@Slf4j
@Component
public class JwtTokenProvider {
    private static final String AUTHORITIES_KEY = "auth";
    private static final String BEARER_TYPE = "bearer";
    // 토큰 유효시간
    private static final long ACCESS_TOKEN_EXPIRE_TIME = 1000 * 60 * 30; // 30분
    private static final long REFRESH_TOKEN_EXPIRE_TIME = 1000 * 60 * 60 * 24 * 7;  // 7일
    private static Key secretKey;

    @PostConstruct
    protected static void init() {
        secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    }

    public static Key getSecretKey() {
        return secretKey;
    }

    public static TokenDto generateTokenDto(String email) {
        // 권한 정보를 생성하지 않음
        String authorities = "";

        long now = (new Date()).getTime();
        // Access Token 생성
        Date accessTokenExpiresIn = new Date(now + ACCESS_TOKEN_EXPIRE_TIME);
        Date refreshTokenExpiresIn = new Date(now + REFRESH_TOKEN_EXPIRE_TIME);
        String accessToken = Jwts.builder()
                .setSubject(email)                          // payload "sub": "email"
                .claim(AUTHORITIES_KEY, authorities)        // payload "auth": ""
                .setExpiration(accessTokenExpiresIn)        // payload "exp": 1516239022 (예시)
                .signWith(secretKey, SignatureAlgorithm.HS256)
                .compact();

        // Refresh Token 생성
        String refreshToken = Jwts.builder()
                .claim(AUTHORITIES_KEY, authorities)        // payload "auth": ""
                .setExpiration(new Date(now + REFRESH_TOKEN_EXPIRE_TIME))
                .signWith(secretKey, SignatureAlgorithm.HS256)
                .compact();

        // 필요한 값 넣어서 token 빌드
        return TokenDto.builder()
                .granttype(BEARER_TYPE)
                .accesstoken(accessToken)
                .accesstokenexpire(accessTokenExpiresIn.getTime())
                .refreshtoken(refreshToken)
                .refreshtokenexpire(refreshTokenExpiresIn.getTime())
                .build();
    }

    public static String getUserIdFromJWT(String token) {
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(secretKey)
                    .parseClaimsJws(token)
                    .getBody();

            // 여기서 필요한 값 추출
            return claims.getSubject();
        } catch (ExpiredJwtException e) {
            // JWT 만료 예외 처리
            log.error("JWT expired: " + e.getMessage());
            // 예외 처리 후 원하는 동작 수행
            // 예: 로깅, 특정 응답 반환 등
            return null;
        }
    }

    public static boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
            return true;
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            log.error("잘못된 JWT 서명입니다.", e.getMessage());
        } catch (ExpiredJwtException e) {
            log.error("만료된 JWT 토큰입니다.", e.getMessage());
        } catch (UnsupportedJwtException e) {
            log.error("지원되지 않는 JWT 토큰입니다.", e.getMessage());
        } catch (IllegalArgumentException e) {
            log.error("JWT 토큰이 잘못되었습니다.", e.getMessage());
        } catch (Exception e) {
            log.error("에러 메세지", e.getMessage());
        }

        return false;
    }
}
