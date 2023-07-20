package jwt.setting;

import data.mapper.TokenMapper;
import data.mapper.UserMapper;
import data.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Slf4j
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
    //401로 인증이 요구됨을 알려줌
    private final JwtAuthenticationEntryPoint unauthorizedHandler;
    //403으로 권한이 없음을 알려줌
    private final JwtAccessDeniedHandler accessDeniedHandler;

    private final UserService userService;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final UserMapper userMapper;
    private final TokenMapper tokenMapper;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        System.out.println("HttpSecurity 진입");
        http
                // (1) 교차출처 리소스 공유(CORS) 설정
                .cors() //(1)
                .and()
                // (2)  CSRF(Cross Site Request Forgery) 사이트 간 요청 위조 설정
                .csrf() //(2)
                .disable()
                // 인증, 허가 에러 시 공통적으로 처리해주는 부분
                .exceptionHandling() //(3)
                .authenticationEntryPoint(unauthorizedHandler)
                .accessDeniedHandler(accessDeniedHandler)
                .and()
                .sessionManagement() //(4)
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                // UsernamePasswordAuthenticationFilter보다 JwtAuthenticationFilter를 먼저 수행
                .addFilterBefore(new JwtAuthenticationFilter(userService, authenticationManagerBuilder, userMapper, tokenMapper),
                        UsernamePasswordAuthenticationFilter.class)

                .authorizeRequests() // (5)

                // login, 회원가입 API는 토큰이 없는 상태에서 요청이 들어오기 때문에 permitAll
                // 허용 영역 설정
                .antMatchers("/","/user/**").permitAll()
                .antMatchers("/oauth/**").permitAll()


                .antMatchers("/ws/**","/sub/**","/pub/**","/info/**").permitAll()

                .antMatchers("/lobby/**").permitAll()
                .antMatchers("/room/**").permitAll()

                .antMatchers("/manage/**").permitAll()
                .antMatchers("/myalert/**").permitAll()

                .antMatchers("/api/**").permitAll()

                .antMatchers("/livestream/**").permitAll()
                .antMatchers("/payment/**").permitAll()
                .antMatchers("/product/**").permitAll()

                //.antMatchers("/user/rejection").hasAnyAuthority("ROLE_USER", "ROLE_ADMIN")
                //.antMatchers("/trade/**").hasAnyAuthority("ROLE_USER", "ROLE_ADMIN")
                //.antMatchers("/user/withdrawal").hasAnyAuthority("ROLE_USER", "ROLE_ADMIN") // 회원 탈퇴


                // 나머지는 전부 인증 필요
                .antMatchers("/**")
                .authenticated()

                // 시큐리티는 기본적으로 세션을 사용
                // 여기서는 세션을 사용하지 않기 때문에 세션 설정을 Stateless 로 설정
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        System.out.println("corsConfigurationSource 진입");
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000", "https://nid.naver.com"));
        configuration.setAllowedMethods(Arrays.asList("HEAD", "GET", "POST", "PUT", "DELETE"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Authorization-refresh", "Cache-Control", "Content-Type"));
        /* 응답 헤더 설정 추가*/
        configuration.setExposedHeaders(Arrays.asList("Authorization", "Authorization-refresh","Cache-Control", "Content-Type"));

        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    // Spring security룰을 무시하게 하는 url규칙
//	@Override
//	public void configure(WebSecurity web) {
//		System.out.println("web security");
//		web.ignoring()
//		.antMatchers("/h2-console/**", "/favicon.ico")
//		.antMatchers("/v2/api-docs", "/swagger-resources/**", "/swagger-ui.html", "/webjars/**", "/swagger/**");
//		//              .antMatchers("/resources/**")
//		//              .antMatchers("/css/**")
//		//              .antMatchers("/vendor/**")
//		//              .antMatchers("/js/**")
//		//              .antMatchers("/favicon*/**")
//		//              .antMatchers("/img/**")
//	}

    //비밀번호 암호화를 위한 Encoder 설정
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        System.out.println("passwordEncoder 진입");
        return new BCryptPasswordEncoder();
    }
}