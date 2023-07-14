package jwt.setting;

import data.dto.UserDto;
import data.dto.security.RefreshTokenDto;
import data.dto.security.TokenDto;
import data.mapper.TokenMapper;
import data.mapper.UserMapper;
import data.service.CustomUserDetailsService;
import data.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private UserService userService;
    private AuthenticationManagerBuilder authenticationManagerBuilder;
    private UserMapper userMapper;
    private TokenMapper tokenMapper;

    public JwtAuthenticationFilter(UserService userService,
                                   AuthenticationManagerBuilder authenticationManagerBuilder,
                                   UserMapper userMapper,
                                   TokenMapper tokenMapper) {
        this.userService = userService;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
        this.userMapper = userMapper;
        this.tokenMapper = tokenMapper;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        System.out.println("doFilterInternal");
        log.info(request.getRequestURI());

        if (!request.getRequestURI().contains("join") && !request.getRequestURI().contains("delete-") &&
                !request.getRequestURI().contains("room") && !request.getRequestURI().contains("lobby") &&
                !request.getRequestURI().contains("ws") && !request.getRequestURI().contains("oauth")) {
            log.info("토큰 체크");
            UserDto dto = new UserDto();
            try {
                String jwt = getJwtFromRequest(request); //request에서 jwt 토큰을 꺼낸다.
                System.out.println("jwt = " + jwt);
                System.out.println("JwtTokenProvider.validateToken(jwt) : " + JwtTokenProvider.validateToken(jwt));

                //System.out.println("Rt_key 유효성 검사 : " + tokenMapper.countByAccessToken(jwt));

                //jwt(accesstoken)이 있으면서 그게 db에도 저장이 되어있는 경우
                //System.out.println("1. " + StringUtils.isNotEmpty(jwt));

                if (StringUtils.isNotEmpty(jwt)) {
                    if (tokenMapper != null && tokenMapper.countByAccessToken(jwt) != 0) {
                        //System.out.println("조건문 진입 확인1");

                        //System.out.println(tokenMapper.selectByAccessToken(jwt));
                        //System.out.println("access로 뽑은 rt_key"+tokenMapper.selectByAccessToken(jwt).getRt_key());

                        //재발급 요구됨
                        if (tokenMapper.selectByAccessToken(jwt).getRt_key() != 0) {
                            System.out.println("재발급 요구되는 상황");
                            //accesstoken값 일치여부로 user id 구하고 그것으로 다른 유저정보 dto에 저장
                            dto = userService.getUserByUserId(tokenMapper.selectByAccessToken(jwt).getRt_key());
                            System.out.println("재발급 dto = " + dto);

//                        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(dto.getEmail(), null);
//                        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
                            TokenDto tokenDto = JwtTokenProvider.generateTokenDto(dto.getEmail());

                            // 4. RefreshToken 저장
                            RefreshTokenDto RTDto = new RefreshTokenDto();
                            RTDto.setRt_key((userMapper.getUserByEmail(dto.getEmail()).getUser_id()));
                            RTDto.setRefreshtoken_expire(tokenDto.getRefreshtokenexpire());
                            RTDto.setRefreshtoken_value(tokenDto.getRefreshtoken());

                            if (tokenMapper.countRefreshToken(RTDto) > 0) {
                                tokenMapper.updateRefreshToken(RTDto);
                            } else {
                                tokenMapper.insertRefreshToken(RTDto);
                            }

                            tokenDto.setUser_id(userMapper.getUserByEmail(dto.getEmail()).getUser_id());
                            tokenDto.setRefreshtoken(RTDto.getRefreshtoken_value());

                            // 5. Access Token을 HttpOnly쿠키와 와 DB에 저장
                            Cookie accessTokenCookie = new Cookie("access_token", tokenDto.getAccesstoken());
                            accessTokenCookie.setPath("/");
                            accessTokenCookie.setHttpOnly(true);
                            response.addCookie(accessTokenCookie);

                            RTDto.setAccesstoken_value(tokenDto.getAccesstoken());
                            tokenMapper.updateAccessToken(RTDto);
                        }

                        String userId = JwtTokenProvider.getUserIdFromJWT(jwt); //jwt에서 사용자 id를 꺼낸다.

                        log.info("userId : " + userId);

                        UserAuthentication authentication = new UserAuthentication(userId, null, null); //id를 인증한다.
                        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request)); //기본적으로 제공한 details 세팅

                        SecurityContextHolder.getContext()
                                .setAuthentication(authentication); //세션에서 계속 사용하기 위해 securityContext에 Authentication 등록
                    }
                } else {
                    if (StringUtils.isEmpty(jwt)) {
                        System.out.println("조건문 진입 확인2");
                        //request.setAttribute("unauthorization", "401 인증키 없음.");
                        System.out.println("401 인증키 없음.");
                    }

                    if (JwtTokenProvider.validateToken(jwt)) {
                        System.out.println("조건문 진입 확인3");
                        //request.setAttribute("unauthorization", "401-001 인증키 만료.");
                        System.out.println("401-001 인증키 만료.");
                    }
                }
            } catch (Exception ex) {
                logger.error("Could not set user authentication in security context", ex);
            }
        }

        filterChain.doFilter(request, response);
    }

    private String getJwtFromRequest(HttpServletRequest request) {
        // HTTP Only 쿠키 값을 가져옵니다.
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("access_token")) {
                    return cookie.getValue();
                }
            }
        }

        return null;
    }


}