
package data.controller;

import data.dto.NaverLoginDto;
import data.dto.UserDto;
import data.mapper.UserMapper;

import data.service.NaverLoginService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.view.RedirectView;


import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Controller
@RequestMapping("/oauth")
@CrossOrigin(origins = {"https://nid.naver.com", "http://localhost:3000"}, methods = RequestMethod.GET)
public class NaverLoginController {

    @Value("6ZMOvG6WUSN5P7l2D65H")
    private String clientId;

    @Value("cK2B2OMt5E")
    private String clientSecret;

    @Value("http://localhost:3000/oauth/callback")
    private String callback_url;
    private String state = "RANDOM_STATE";


    @Autowired
    NaverLoginService naverLoginService;

    //네이버 회원 정보 받아서 Join or SingIn으로 보냄
    @PostMapping("/naverlogin")
    public ResponseEntity<Integer> naverlogin(@RequestBody NaverLoginDto dto, HttpServletResponse response)  {
            return naverLoginService.naverlogin(dto,response);
    }

    //Token값 반환
    @GetMapping("/callback")
    @ResponseBody
    public String callback(String accessToken) {
        return naverLoginService.callback(accessToken);
    }
}
