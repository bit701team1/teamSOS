package data.controller;

import data.mapper.TokenMapper;
import data.mapper.UserMapper;
import data.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;

@RestController
@CrossOrigin
@RequestMapping("/myalert")
@AllArgsConstructor
public class MyTestController {

    @Autowired
    UserService userService;

    @Autowired
    TokenMapper tokenMapper;
    @Autowired
    UserMapper userMapper;

    // 여기에 toggle 기능을 추가합니다.
    @GetMapping("/toggle")
    public ResponseEntity<Object> toggleUserIsAlarm(HttpServletRequest request) {
        System.out.println("토글 테스트 컨트롤로 입장");
        Cookie[] cookies = request.getCookies();
        String accesstoken  = null;

        // Add this line to print all cookies
        Arrays.stream(cookies).forEach(cookie -> System.out.println(cookie.getName() + ": " + cookie.getValue()));


        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("access_token")) {
                    accesstoken  = cookie.getValue();
                }
            }
        }
        if(accesstoken ==null){
            return new ResponseEntity<>("Access token not found", HttpStatus.UNAUTHORIZED);
        }
        System.out.println("access :"+accesstoken);
        System.out.println("usemapper+token+access : "+userMapper.getUserByUserId(tokenMapper.selectByAccessToken(accesstoken).getRt_key()));

        String email = userMapper.getUserByUserId(tokenMapper.selectByAccessToken(accesstoken).getRt_key()).getEmail();
        // Check if email is null here
        if (email == null) {
            return new ResponseEntity<>("User not found", HttpStatus.UNAUTHORIZED);
        }


        // 유저의 알림수신 상태를 가져옵니다.
        boolean isAlarm = userMapper.getUserByEmail(email).isIsalarm();
        System.out.println("isalarm"+isAlarm);

        // 상태를 토글합니다.
        boolean newIsAlarm = !isAlarm;  // isAlarm의 반대값을 newIsAlarm에 저장합니다.
        userService.updateUserIsAlarm(email, newIsAlarm);
        System.out.println("user+update"+newIsAlarm);

        System.out.println(email + "email+newisalarm " + newIsAlarm);

        if (email == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }


        return ResponseEntity.ok(newIsAlarm);
    }
}


