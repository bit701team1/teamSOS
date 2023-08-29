package data.service;

import data.controller.CookieController;
import data.dto.UserDto;
import data.dto.security.RefreshTokenDto;
import data.dto.security.TokenDto;
import data.mapper.TokenMapper;
import data.mapper.UserMapper;
import jwt.setting.JwtTokenProvider;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Slf4j
@AllArgsConstructor
@Service
public class LoginService {

    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired
    UserMapper userMapper;
    @Autowired
    TokenMapper tokenMapper;
    @Autowired
    CookieController cookieController;
    @Autowired
    UserService userService;

    public ResponseEntity<TokenDto> signIn(@RequestBody UserDto dto, HttpServletResponse response) {
        System.out.println("/login 진입");
        System.out.println("logindto : " + dto);
        //System.out.println("response : " + response);
        // 사용자 정보 조회
        UserDto user = userMapper.getUserByEmail(dto.getEmail());

        if (user == null) {
            // 사용자가 존재하지 않는 경우
            System.out.println("사용자가 존재하지 않음");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String rawPassword = dto.getPassword(); // 사용자가 입력한 비밀번호

        // 비밀번호 검증
        boolean passwordMatched = bCryptPasswordEncoder.matches(rawPassword, user.getPassword());

        if (!passwordMatched && !dto.isNaver()) {
            System.out.println("비밀번호 검증 실패 case");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        try {
            //이메일을 기반으로 JWT 토큰 생성
            TokenDto tokenDto = JwtTokenProvider.generateTokenDto(dto.getEmail());
            //System.out.println("tokenDto.toString(): " + tokenDto.toString());

            //RefreshToken 값 DB에 저장
            RefreshTokenDto RTDto = new RefreshTokenDto();
            RTDto.setRt_key((userMapper.getUserByEmail(dto.getEmail()).getUser_id()));
            RTDto.setRefreshtoken_expire(tokenDto.getRefreshtokenexpire());
            RTDto.setRefreshtoken_value(tokenDto.getRefreshtoken());

            //이미 RefreshToken값이 존재하면 update 없으면 insert
            if (tokenMapper.countRefreshToken(RTDto) > 0) {
                tokenMapper.updateRefreshToken(RTDto);
            } else {
                tokenMapper.insertRefreshToken(RTDto);
            }

            tokenDto.setUser_id(userMapper.getUserByEmail(dto.getEmail()).getUser_id());
            tokenDto.setRefreshtoken(RTDto.getRefreshtoken_value());

            //Access Token을 HttpOnly쿠키와 와 DB에 저장
            Cookie accessTokenCookie = new Cookie("access_token", tokenDto.getAccesstoken());
            accessTokenCookie.setPath("/");
            accessTokenCookie.setHttpOnly(true);
            response.addCookie(accessTokenCookie);

            RTDto.setAccesstoken_value(tokenDto.getAccesstoken());
            tokenMapper.updateAccessToken(RTDto);

            System.out.println("ResponseEntity.ok(tokenDto) : " + ResponseEntity.ok(tokenDto));

            return ResponseEntity.ok(tokenDto);
        } catch (AuthenticationException e) {
            // 인증 실패 처리
            System.out.println(e);
            System.out.println("인증 실패 처리");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    public int join(@RequestBody UserDto dto) {
        int result = 0;
        String cookieValue = null;

        //email 유효성 검사
        if (!dto.getEmail().contains("@")) {
            return 2;
        }

        //naver login이 아닌 일반적인 이메일 중복 케이스
        if (userMapper.countEmail(dto.getEmail()) > 0 ) {
            System.out.println("이메일 중복 진입");
            return 1;
        }

        // 비밀번호 암호화
        PasswordEncoder encoder = new BCryptPasswordEncoder();
        String encryptedPassword = encoder.encode(dto.getPassword());

        dto.setPassword(encryptedPassword);
        //네이버에서 받아오는 번호는 -를 포함하므로 저장전에 제거해줌
        dto.setHp(dto.getHp().replace("-",""));

        userMapper.insertUser(dto);

        //이메일 정보를 기반으로 JWT 토큰 생성
        TokenDto tokenDto = JwtTokenProvider.generateTokenDto(dto.getEmail());

        //RefreshToken 저장
        RefreshTokenDto RTDto = new RefreshTokenDto();
        RTDto.setRt_key(dto.getUser_id());
        RTDto.setRefreshtoken_expire(tokenDto.getRefreshtokenexpire());
        RTDto.setRefreshtoken_value(tokenDto.getRefreshtoken());

        tokenMapper.insertRefreshToken(RTDto);
        //Naver Login은
        if(dto.isNaver()){
            System.out.println("Naver: join --> signIn");
            signIn(dto, dto.getResponse());
        }

        System.out.println("Join 완료");
        return result;
    }

    public ResponseEntity<String> isLogin(HttpServletRequest request, HttpServletResponse response) {
        Cookie[] cookies = request.getCookies();

        String accessToken = null;
        String refreshToken = null;

        // HTTP Only 쿠키에서 access_token 값 추출
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("access_token")) {
                    accessToken = cookie.getValue();
                    System.out.println("accessToken : " + accessToken);
                    String email = cookieController.getEmailFromAccessToken(accessToken);
                    System.out.println("email!!!  " + email);
                } else {
                    return ResponseEntity.ok("User is not logged in");
                }
            }
        }

        //accesstoken의 값을 db에서 찾고 존재하면 해당값 기반으로 refreshtoken값 가져옴
        refreshToken = tokenMapper.selectByRtKey(tokenMapper.selectByAccessToken(accessToken).getRt_key()).getRefreshtoken_value();
        //accesstoken값으로 email 값 가져옴
        String email = cookieController.getEmailFromAccessToken(accessToken);
        System.out.println("email!!!  " + email);

        //String email = userMapper.getUserByUserId(tokenMapper.selectByAccessToken(accessToken).getRt_key()).getEmail();

        System.out.println("accessToken = " + accessToken);
        System.out.println("refreshToken = " + refreshToken);
        System.out.println(JwtTokenProvider.validateToken(accessToken));

        if (accessToken != null && JwtTokenProvider.validateToken(accessToken)) {
            System.out.println("access가 정상인 경우");
            // 토큰이 유효한 경우 로그인 상태로 응답합니다.
            return ResponseEntity.ok("User is logged in");
        } else if (refreshToken != null && JwtTokenProvider.validateToken(refreshToken)) {
            System.out.println("access가 비정상이라서 refresh로 확인하는 경우");
            // 액세스 토큰이 만료된 경우 리프레시 토큰을 사용하여 새로운 액세스 토큰을 발급합니다.
            String userId = JwtTokenProvider.getUserIdFromJWT(refreshToken);
            //UserDetails userDetails = customUserDetailsService.loadUserByUsername(userId);
            //System.out.println("userDetails = "+userDetails);

            // 인증 정보를 기반으로 JWT 토큰을 재발급합니다.
            TokenDto newTokenDto = JwtTokenProvider.generateTokenDto(email);
            System.out.println("newAccessToekn = " + newTokenDto.getAccesstoken());
            // 새로운 액세스 토큰을 HTTP Only 쿠키에 저장합니다.
            Cookie newAccessTokenCookie = new Cookie("access_token", newTokenDto.getAccesstoken());
            newAccessTokenCookie.setPath("/");
            newAccessTokenCookie.setHttpOnly(true);
            response.addCookie(newAccessTokenCookie);

            // 토큰 재발급 후 로그인 상태로 응답합니다.
            return ResponseEntity.ok("User is logged in (Token reissued)");
        } else {
            // 토큰이 유효하지 않거나 없는 경우 로그인 상태가 아님을 응답합니다.
            return ResponseEntity.ok("User is not logged in");
        }
    }

    public void passUpatebyHp(@RequestBody UserDto dto){
        //password 암호화
        String password = bCryptPasswordEncoder.encode(dto.getRawpassword());
        //password update
        userService.updateUserPassbyHp(dto.getHp(),password);
    }
}
