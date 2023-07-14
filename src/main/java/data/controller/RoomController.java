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
import org.springframework.web.bind.annotation.*;

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
    @GetMapping("/info/{id}")
    public RoomDto getInfo(@PathVariable String id) {

        RoomDto room = roomService.getRoom(id);
        if (room != null) {
            // 방 정보를 가져왔을 때만 타이머를 시작하고, 10초 후에 방을 삭제하도록 설정
            Timer timer = new Timer();
            timer.schedule(new TimerTask() {
                @Override
                public void run() {
                    roomService.deleteRoom(id);
                    timer.cancel(); // 타이머 종료
                }
            }, 600 * 1000);
        }
        return room;
    }
    @GetMapping("/emailuser")
    public ResponseEntity<String> methodName(HttpServletRequest request) {
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
        String user_name = userMapper.getUserByUserId(tokenMapper.selectByAccessToken(accesstoken).getRt_key()).getUser_name();

        return new ResponseEntity<>(email, HttpStatus.OK);
    }

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

        return ResponseEntity.ok(user);
    }
}