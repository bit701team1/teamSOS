package data.controller;

import data.dto.security.RefreshTokenDto;
import data.dto.security.TokenDto;
import data.dto.UserDto;
import data.mapper.TokenMapper;
import data.mapper.UserMapper;
import data.service.CustomUserDetailsService;
import data.service.LoginService;
import data.service.UserService;
import jwt.setting.JwtTokenProvider;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.AuthenticationException;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/user")
public class UserController {

//    @Autowired
//    TokenMapper tokenMapper;
//    @Autowired
//    PasswordEncoder passwordEncoder;
//    @Autowired
//    UserMapper userMapper;
//    @Autowired
//    UserService userService;
//    @Autowired
//    AuthenticationManagerBuilder authenticationManagerBuilder;
//    @Autowired
//    JwtTokenProvider jwtTokenProvider;
//    @Autowired
//    CookieController cookieController;
//    @Autowired
//    BCryptPasswordEncoder bCryptPasswordEncoder;
//    @Autowired
//    CustomUserDetailsService customUserDetailsService;
    @Autowired
    LoginService loginService;


    @PostMapping("/passUpatebyHp")
    public void passUpatebyHp(@RequestBody UserDto dto){
        loginService.passUpatebyHp(dto);
    }

    //signIn:  Refresh,Access 발급 갱신
    @PostMapping("/login")
    public ResponseEntity<TokenDto> signIn(@RequestBody UserDto dto, HttpServletResponse response) {
        return loginService.signIn(dto,response);
    }
    
    //refresh 토큰 발급, 비밀번호 암호화 이후 DB 저장, email 유효성 검사 이후 가입
    @PostMapping("/join")
    public int join(@RequestBody UserDto dto) {
        return loginService.join(dto);
    }

    @GetMapping("/islogin")
    public ResponseEntity<String> isLogin(HttpServletRequest request, HttpServletResponse response) {
        return loginService.isLogin(request,response);
    }
   
}
