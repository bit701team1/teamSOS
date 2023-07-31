package data.controller;

import java.util.*;

import data.mapper.TokenMapper;
import data.mapper.UserMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import data.dto.RoomDto;
import data.service.RoomService;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/lobby")
public class LobbyController {

    @Autowired
    RoomService roomService;
    @Autowired
    UserMapper userMapper;
    @Autowired
    TokenMapper tokenMapper;
    @Autowired
    CookieController cookieController;

    @GetMapping("/list")
    public List<RoomDto> getList() {
        return roomService.getAll();
    }

    @PostMapping("/create")
    public RoomDto postCreate(@RequestBody Map<String, Object> data) {
        String roomName = data.get("name").toString();
        RoomDto createdRoom = roomService.createRoom(roomName);
        return createdRoom;
    }
    

    @GetMapping("/logincheck")
    public ResponseEntity<String> loginCheck(HttpServletRequest request) {
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

        String email = cookieController.getEmailFromAccessToken(accesstoken);
        String user_name = userMapper.getUserByEmail(email).getUser_name();


        System.out.println(email + user_name);
        if (email == null || user_name == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //    UserType 체크 후 mypage, manage 페이지 경로 구별 
    @GetMapping("/mypagecheck")
    public int mypagecheck(HttpServletRequest request) {
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
            return 0;
        }
        String email = cookieController.getEmailFromAccessToken(accesstoken);
        String user_type=userMapper.getUserByUserId(tokenMapper.selectByAccessToken(accesstoken).getRt_key()).getUser_type();

        if ("ROLE_USER".equals(user_type)) {
            return 1;
        }else if ("ROLE_ADMIN".equals(user_type)) {
            return 2;
        }
        // 토큰이 있지만 user_type이 없을 경우
        return 3;
    }

}

