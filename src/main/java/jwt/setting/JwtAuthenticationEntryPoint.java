package jwt.setting;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {
    /**
     * 유효한 자격증명을 하지 않고 접근하려 할때 401.
     *
     * @param request
     * @param response
     * @param e
     * @throws IOException
     */
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException e) throws IOException {
        System.out.println("JwtAuthenticationEntryPoint에서 예외처리");
        System.out.println("예외 종류: " + e.getClass().getSimpleName());
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
    }
}