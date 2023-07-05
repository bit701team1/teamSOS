package data.controller;

import data.dto.security.RefreshTokenDto;
import data.dto.security.TokenDto;
import data.dto.UserDto;
import data.mapper.UserMapper;
import jwt.setting.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/user")
public class UserController {

//    @Autowired
//    TokenMapper tokenMapper;
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

    //join

    //email,hp 중복체크

    //이메일 인증

    //login
    @PostMapping("/login")
    public TokenDto signIn(@RequestBody UserDto dto) {
        // 1. Login ID/PW 를 기반으로 AuthenticationToken 생성
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword());
//        System.out.println(authenticationToken);
        // 2. 실제로 검증 (사용자 비밀번호 체크) 이 이루어지는 부분
        //    authenticate 메서드가 실행이 될 때 CustomUserDetailsService 에서 만들었던 loadUserByUsername 메서드가 실행됨
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
//        System.out.println(authentication);
        // 3. 인증 정보를 기반으로 JWT 토큰 생성

        TokenDto tokenDto = JwtTokenProvider.generateTokenDto(authentication);
//        System.out.println(tokenDto.toString());

        // 4. RefreshToken 저장
        RefreshTokenDto RTDto = new RefreshTokenDto();
        RTDto.setRt_key(Integer.toString(userMapper.getUserInfo(authentication.getName()).getUser_id()));
        RTDto.setRt_value(tokenDto.getRefreshToken());
//        if (tokenMapper.countRefreshToken(RTDto) > 0) {
//            tokenMapper.updateRefreshToken(RTDto);
//        } else {
//            tokenMapper.insertRefreshToken(RTDto);
//        }
//
//        tokenDto.setU_num(userMapper.getUserInfo(dto.getEmail()).getU_num());
//        tokenDto.setRefreshToken(RTDto.getRt_value());
        return tokenDto;
    }




}
