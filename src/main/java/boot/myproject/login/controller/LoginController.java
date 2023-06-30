package boot.myproject.login.controller;

import org.apache.catalina.User;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
    public class LoginController {

        @GetMapping("/user/login")
        public String viewLoginPage() {
            return "/user/login";
        }

        @GetMapping("/user/loginSuccess")
        public String viewLoginSuccessPage(@AuthenticationPrincipal User user, Model model) {
            model.addAttribute("userId", user.getUsername()
            );
            //model.addAttribute("userRoles", user.getAuthorities());
            return "/user/loginsuccess";
        }

        @GetMapping("/user/logout")
        public String logout() {
            return "/user/logout";
        }


        @PostMapping("/loginProc")
        public String handleLoginProc(@RequestParam("id") String id, @RequestParam("pw") String password) {
            // 로그인 처리 로직을 구현하거나 다른 서비스를 호출할 수 있습니다.
            // ...
            return "redirect:/user/loginSuccess";
        }


        //컨트롤러에서 바로 유저정보를 얻을 수 있게 해줌
//        @GetMapping("/view/template_add")
//        public String dashboard(@AuthenticationPrincipal User userInfo) throws Exception {
//
//            return "/template_add";
//        }
}
