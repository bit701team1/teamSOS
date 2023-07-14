
package data.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

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

    @GetMapping("/naverlogin")
    public RedirectView naverLogin() {
        System.out.println("/naverlogin 진입");
        String apiURL = "https://nid.naver.com/oauth2.0/authorize?response_type=code"
                + "&client_id=" + clientId
                + "&state=" + state
                + "&redirect_uri=" + callback_url;
        return new RedirectView(apiURL);
    }


    @GetMapping("/callback")
    @ResponseBody
    public Map<String, String> callback(@RequestParam String code, @RequestParam String state) {
        System.out.println("/callback 진입");


        // API 요청 및 응답 처리 로직 작성
        // 예시로 응답 결과를 Map에 담아 반환하도록 작성하였습니다.
        Map<String, String> response = new HashMap<>();
        response.put("message", "Callback Successful");
        return response;
    }
}
