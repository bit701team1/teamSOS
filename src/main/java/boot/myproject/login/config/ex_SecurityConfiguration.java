//package boot.myproject.login.config;
//
//import boot.myproject.login.filter.UsrCustomAuthenticationFilter;
//import boot.myproject.login.handler.*;
//import lombok.AllArgsConstructor;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
//
//@Configuration
//@EnableWebSecurity
//@AllArgsConstructor
//public class SecurityConfiguration {
//
//    @Autowired
//    LoginIdPwValidator loginIdPwValidator;
//
//    @Autowired
//    private SHA512PasswordEncoder passwordEncoder;
//    // 권한이 없는 사용자 접근에 대한 handler
//    @Autowired private WebAccessDeniedHandler webAccessDeniedHandler;
//    // 인증되지 않은 사용자 접근에 대한 handler
//    @Autowired private WebAuthenticationEntryPoint webAuthenticationEntryPoint;
//    //  로그인 성공 handler
//    @Autowired private UsrCustomLoginSuccessHandler usrCustomLoginSuccessHandler;
//    //  로그인 실패 handler
//    @Autowired private UserCustomLoginFailHandler userCustomLoginFailHandler;
//
//    //private UsrCustomAuthenticationFilter usrCustomAuthenticationFilter;
//
//    // 실제 인증을 담당하는 provider
//    @Bean
//    public CustomAuthenticationProvider customAuthenticationProvider() {
//        return new CustomAuthenticationProvider(passwordEncoder);
//    }
//
//    // 스프링 시큐리티가 사용자를 인증하는 방법이 담긴 객체
//
////    public void configure(AuthenticationManagerBuilder authenticationManagerBuilder) {
////        authenticationManagerBuilder.authenticationProvider(customAuthenticationProvider());
////    }
//
//    @Bean
//    public AuthenticationManager authenticationManager(HttpSecurity http, BCryptPasswordEncoder bCryptPasswordEncoder, UserDetailService userDetailService)
//            throws Exception {
//        return http.getSharedObject(AuthenticationManagerBuilder.class)
//                .userDetailsService(userDetailsService)
//                .passwordEncoder(bCryptPasswordEncoder)
//                .and()
//                .build();
//    }
//
//
//
//    /*
//     * 스프링 시큐리티 룰을 무시할 URL 규칙 설정
//     * 정적 자원에 대해서는 Security 설정을 적용하지 않음
//     */
//
////    public void configure(WebSecurity web) throws Exception {
////        web
////                .ignoring()
////                .antMatchers("/user/test/**")
////                .antMatchers("/resources/**")
////                .antMatchers("/css/**")
////                .antMatchers("/vendor/**")
////                .antMatchers("/js/**")
////                .antMatchers("/favicon*/**")
////                .antMatchers("/img/**");
////    }
//
//    @Bean
//    public WebSecurityCustomizer webSecurityCustomizer() {
//        return (web) -> web.debug(securityDebug)
//                .ignoring()
//                .antMatchers("/css/**", "/js/**", "/img/**", "/lib/**", "/favicon.ico");
//    }
//
//
//
////    @Bean
////    public UsrCustomAuthenticationFilter usrCustomAuthenticationFilter() throws Exception {
////        UsrCustomAuthenticationFilter customAuthenticationFilter = new UsrCustomAuthenticationFilter(authenticationManager());
////        customAuthenticationFilter.setFilterProcessesUrl("/loginProc");
////        customAuthenticationFilter.setAuthenticationSuccessHandler(usrCustomLoginSuccessHandler);
////        customAuthenticationFilter.setAuthenticationFailureHandler(userCustomLoginFailHandler);
////        customAuthenticationFilter.afterPropertiesSet();
////        return customAuthenticationFilter;
////    }
//
//
//
//    protected SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http
//                .csrf().disable() // 세션을 사용하지 않고 JWT 토큰을 활용하여 진행, csrf토큰검사를 비활성화
//                    .authorizeRequests()
//                    .antMatchers("/login","/","/user/login","/loginProc").permitAll()
//                    .and()
//
//                .exceptionHandling()
//                    .accessDeniedHandler(webAccessDeniedHandler)
//                    .authenticationEntryPoint(webAuthenticationEntryPoint) // 예외처리
//                    .and()
//
//                .formLogin()
//                    .loginPage("/user/login")
//                    .successForwardUrl("/user/loginsuccess")
//                    .failureForwardUrl("/user/login")
//                    .permitAll()
//                    .and()
//
//                .logout()
//                    .logoutUrl("/user/logout")
//                    .logoutSuccessUrl("/user/login")
//                    .invalidateHttpSession(true) //session clear
//                    .deleteCookies("JSESSIONID");
//
//        return http.build();
//    }
//
//}
