package data.controller;

import data.dto.security.RefreshTokenDto;
import data.dto.security.TokenDto;
import data.dto.UserDto;
import data.mapper.TokenMapper;
import data.mapper.UserMapper;
import jwt.setting.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
@CrossOrigin
@RequestMapping("/user")
public class UserController {

    @Autowired
    TokenMapper tokenMapper;
    @Autowired
    PasswordEncoder passwordEncoder;

    //@Autowired
    //RegisterMail registerMail;
    @Autowired
    UserMapper userMapper;
    @Autowired
    AuthenticationManagerBuilder authenticationManagerBuilder;
    @Autowired
    JwtTokenProvider jwtTokenProvider;
    @Autowired
    CookieController cookieController;

    //join

    //email,hp 중복체크

    //이메일 인증

    //login
    @PostMapping("/login")
    public ResponseEntity<TokenDto> signIn(@RequestBody UserDto dto, HttpServletResponse response) {
        System.out.println("/login 진입");

        String encryptedPassword = userMapper.getUserByEmail(dto.getEmail()).getPassword();

        if (!checkPassword(dto.getPassword(), encryptedPassword)) {
            // 비밀번호 검증 실패
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        try {
            // 1. Login ID/PW 를 기반으로 AuthenticationToken 생성
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword());

            // 2. 실제로 검증 (사용자 비밀번호 체크)이 이루어지는 부분
            Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
            System.out.println("authentication = " + authentication);

            // 3. 인증 정보를 기반으로 JWT 토큰 생성
            TokenDto tokenDto = JwtTokenProvider.generateTokenDto(authentication);
            System.out.println("tokenDto.toString(): " + tokenDto.toString());

            // 4. RefreshToken 저장
            RefreshTokenDto RTDto = new RefreshTokenDto();
            RTDto.setRt_key(Integer.toString(userMapper.getUserByEmail(dto.getEmail()).getUser_id()));
            RTDto.setRt_expire(tokenDto.getRefreshtokenexpire());
            RTDto.setRt_value(tokenDto.getRefreshtoken());

            if (tokenMapper.countRefreshToken(RTDto) > 0) {
                tokenMapper.updateRefreshToken(RTDto);
            } else {
                tokenMapper.insertRefreshToken(RTDto);
            }

            tokenDto.setUser_id(userMapper.getUserByEmail(dto.getEmail()).getUser_id());
            tokenDto.setRefreshtoken(RTDto.getRt_value());

            // 5. Access Token을 HttpOnly 쿠키에 저장
            Cookie accessTokenCookie = new Cookie("access_token", tokenDto.getAccesstoken());
            accessTokenCookie.setPath("/");
            accessTokenCookie.setHttpOnly(true);
            response.addCookie(accessTokenCookie);

            return ResponseEntity.ok(tokenDto);
        } catch (AuthenticationException e) {
            // 인증 실패 처리
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }


    @PostMapping("/join")
    public int join(@RequestBody UserDto dto, HttpServletRequest request){
        int result = 0;
        String cookieValue = null;
        //email 중복확인 ~ count(*)은 따로 mapping해서 확인이 되었을때 join으로 넘어와야함
        //email 인증 확인
        // HTTP Only 쿠키 값을 가져옵니다.
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("access_token")) {
                    cookieValue = cookie.getValue();
                    break;
                }
            }
        }

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String encryptedPassword = encoder.encode(dto.getPassword());

        dto.setPassword(encryptedPassword);

        userMapper.insertUser(dto);

        return result;
    }


    // 암호화된 비밀번호와 사용자가 입력한 비밀번호를 확인하는 메서드
    public boolean checkPassword(String password, String encryptedPassword) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        return encoder.matches(password, encryptedPassword);
    }
}
