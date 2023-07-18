
package data.controller;

import data.dto.NaverLoginDto;
import data.dto.UserDto;
import data.mapper.UserMapper;

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
    UserController userController;

    @Autowired
    UserMapper userMapper;

    @PostMapping("/naverlogin")
    public ResponseEntity<Integer> naverlogin(@RequestBody NaverLoginDto dto, HttpServletResponse response)  {
        int result = -1;
        System.out.println("NaverLogindto : " + dto);

        UserDto userDto = new UserDto();
        //로그인 및 가입을 위한 기본 정보 옮김
        userDto.setEmail(dto.getEmail());
        userDto.setUser_name(dto.getName());
        userDto.setHp(dto.getMobile());
        userDto.setResponse(response);
        userDto.setNaver(true);
        //이 부분 자체가 랜덤 변수가 요구됨
        userDto.setPassword("네이버비밀번호");
        

        //가입이 필요하면 join, 아니면 signIn으로 진입시킴
        if(userMapper.countEmail(dto.getEmail()) > 0){
            System.out.println("naver direct 로그인");
            userController.signIn(userDto,response);
            System.out.println("Naver singIn 끝");
            return ResponseEntity.ok(result);
        }
        userController.join(userDto);

        return  ResponseEntity.ok(result);
    }


    @GetMapping("/callback")
    @ResponseBody
    public String callback(String accessToken) {
        System.out.println("/callback 진입");
        System.out.println(accessToken);
        String token = accessToken; // 네이버 로그인 접근 토큰;
        String header = "Bearer " + token; // Bearer 다음에 공백 추가

        String apiURL = "https://openapi.naver.com/v1/nid/me";

        Map<String, String> requestHeaders = new HashMap<>();
        requestHeaders.put("Authorization", header);
        String responseBody = get(apiURL, requestHeaders);
        System.out.println(responseBody);
        return responseBody;
    }

    private static String get(String apiUrl, Map<String, String> requestHeaders) {
        HttpURLConnection con = connect(apiUrl);
        try {
            con.setRequestMethod("GET");
            for (Map.Entry<String, String> header : requestHeaders.entrySet()) {
                con.setRequestProperty(header.getKey(), header.getValue());
            }

            int responseCode = con.getResponseCode();
            System.out.println("responseCode : " + responseCode);
            System.out.println("HttpURLConnection.HTTP_OK : " + HttpURLConnection.HTTP_OK);
            if (responseCode == HttpURLConnection.HTTP_OK) { // 정상 호출
                System.out.println("responseCode 정상");
                return readBody(con.getInputStream());
            } else { // 에러 발생
                System.out.println("responseCode 에러");
                return readBody(con.getErrorStream());
            }
        } catch (IOException e) {
            throw new RuntimeException("API 요청과 응답 실패", e);
        } finally {
            con.disconnect();
        }
    }

    private static HttpURLConnection connect(String apiUrl) {
        try {
            URL url = new URL(apiUrl);
            System.out.println("connect 정상");
            return (HttpURLConnection) url.openConnection();
        } catch (MalformedURLException e) {
            throw new RuntimeException("API URL이 잘못되었습니다. : " + apiUrl, e);
        } catch (IOException e) {
            throw new RuntimeException("연결이 실패했습니다. : " + apiUrl, e);
        }
    }

    private static String readBody(InputStream body) {
        InputStreamReader streamReader = new InputStreamReader(body);

        try (BufferedReader lineReader = new BufferedReader(streamReader)) {
            StringBuilder responseBody = new StringBuilder();

            String line;
            while ((line = lineReader.readLine()) != null) {
                responseBody.append(line);
            }
            System.out.println("readBody Test");
            return responseBody.toString();
        } catch (IOException e) {
            throw new RuntimeException("API 응답을 읽는데 실패했습니다.", e);
        }
    }
}
