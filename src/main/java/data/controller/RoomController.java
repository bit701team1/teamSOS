package data.controller;

import java.util.Map;
import java.util.Timer;
import java.util.TimerTask;

import data.dto.UserDto;
import data.mapper.TokenMapper;
import data.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import data.dto.MsgDto;
import data.dto.ReportDto;
import data.dto.RoomDto;
import data.service.RoomService;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/room")
public class RoomController {
    @Autowired
    RoomService roomService;
    @Autowired
    UserMapper userMapper;
    @Autowired
    TokenMapper tokenMapper;
     @Autowired
    private SimpMessagingTemplate template; 
    /*방 생성 */ 
    @GetMapping("/info/{id}")
    public RoomDto getInfo(@PathVariable String id) {

        RoomDto room = roomService.getRoom(id);
        // 방 삭제 후 웹소켓 메시지 전송
        if (room != null) {
            // 방 정보를 가져왔을 때만 타이머를 시작하고, 10초 후에 방을 삭제하도록 설정
            Timer timer = new Timer();
            timer.schedule(new TimerTask() {
                @Override
                public void run() {
                    roomService.deleteRoom(id);
                    timer.cancel(); // 타이머 종료
                }
            }, 10* 60 * 1000);

            
        }
        return room;
    }
    
    /* 로그인한 유저 이메일 가져오기  */
    @GetMapping("/emailuser")
    public ResponseEntity<String> emailUser(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        String accesstoken = "";

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("access_token")) {
                    accesstoken = cookie.getValue();
                    break;
                }
            }
        }
        String email = userMapper.getUserByUserId(tokenMapper.selectByAccessToken(accesstoken).getRt_key()).getEmail();
        
        return new ResponseEntity<>(email,HttpStatus.OK);
    }
    /* 로그인한 유저 이름 가져오기  */
    @GetMapping("/username")
    public ResponseEntity<String> Username(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        String accesstoken = "";

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("access_token")) {
                    accesstoken = cookie.getValue();
                    break;
                }
            }
        }
        String username = userMapper.getUserByUserId(tokenMapper.selectByAccessToken(accesstoken).getRt_key()).getUser_name();
        
        return new ResponseEntity<>(username,HttpStatus.OK);
    }
    /* 로그인한 유저 dto 가져오기 */
    @GetMapping("/userdata")
    public ResponseEntity<UserDto> userData( HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        String accessToken = null;

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("access_token")) {
                    accessToken = cookie.getValue();
                }
            }
        }
        if (accessToken == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        int userId = tokenMapper.selectByAccessToken(accessToken).getRt_key();
        UserDto user = userMapper.getUserByUserId(userId);

        if (user == null) {

            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        System.out.println("user>>>>"+user);
        return ResponseEntity.ok(user);
    }
     @GetMapping("/adminpower")
     public ResponseEntity<String> adminpower(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        String accesstoken = null;

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("access_token")) {
                    accesstoken = cookie.getValue();
                }
            }
        }
        if (accesstoken == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        String usertype = userMapper.getUserByUserId(tokenMapper.selectByAccessToken(accesstoken).getRt_key()).getUser_type();
        if(!usertype.equals("ROLE_ADMIN")){
            return new ResponseEntity<>("Forbidden", HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }
     //수연 알람
    @PostMapping("/alarm")
    public ResponseEntity<UserDto> updatealarm( HttpServletRequest request, @RequestBody UserDto dto) {
        Cookie[] cookies = request.getCookies();
        String accessToken = null;

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("access_token")) {
                    accessToken = cookie.getValue();
                }
            }
        }
        int userId = tokenMapper.selectByAccessToken(accessToken).getRt_key();
        UserDto user = userMapper.getUserByUserId(userId);
        user.setIsalarm(dto.isIsalarm());
        userMapper.updatealarm(user);
        return ResponseEntity.ok(user);
    }
    //신고기능
    @PostMapping("/insertreport")
     public ResponseEntity<ReportDto>insertreport( HttpServletRequest request, @RequestBody MsgDto msg, ReportDto reportdto, UserDto userdto) {
      Cookie[] cookies = request.getCookies();
        String accessToken = null;

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("access_token")) {
                    accessToken = cookie.getValue();
                }
            }
        }
        int userId = tokenMapper.selectByAccessToken(accessToken).getRt_key();
        UserDto user = userMapper.getUserByUserId(userId);
        reportdto.setEmail(msg.getUserName());
        reportdto.setMsg(msg.getMsg());
        userMapper.insertReport(reportdto);
        userMapper.updateReportNum(msg.getUserName());
        
        return ResponseEntity.ok(reportdto);
    }
     //정보 수정 
     @PostMapping("/userupdate")
     public ResponseEntity<UserDto> userupdate( HttpServletRequest request, @RequestBody UserDto dto) {
         Cookie[] cookies = request.getCookies();
         String accessToken = null;
 
         if (cookies != null) {
             for (Cookie cookie : cookies) {
                 if (cookie.getName().equals("access_token")) {
                     accessToken = cookie.getValue();
                 }
             }
         }
         int userId = tokenMapper.selectByAccessToken(accessToken).getRt_key();
         UserDto user = userMapper.getUserByUserId(userId);
         user.setUser_name(dto.getUser_name());
         user.setEmail(dto.getEmail());
         user.setHp(dto.getHp());
         userMapper.updateUserInfo(user);
         return ResponseEntity.ok(user);
     }
     //비밀번호 변경
    @PostMapping("/pwdupdate")
     public ResponseEntity<UserDto> pwdupdate( HttpServletRequest request, @RequestBody UserDto dto) {
         Cookie[] cookies = request.getCookies();
         String accessToken = null;
 
         if (cookies != null) {
             for (Cookie cookie : cookies) {
                 if (cookie.getName().equals("access_token")) {
                     accessToken = cookie.getValue();
                 }
             }
         }
         int userId = tokenMapper.selectByAccessToken(accessToken).getRt_key();
         UserDto user = userMapper.getUserByUserId(userId);
         PasswordEncoder encoder = new BCryptPasswordEncoder();
         String encryptedPassword = encoder.encode(dto.getPassword());
         user.setPassword(encryptedPassword);
         userMapper.updatePassword(user);
         return ResponseEntity.ok(user);
     }
}