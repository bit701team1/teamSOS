package data.controller;


import com.fasterxml.jackson.databind.JsonNode;
import data.dto.PaymentDto;

import data.service.PaymentService;
import lombok.AllArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import org.springframework.web.servlet.view.RedirectView;


@RestController
@AllArgsConstructor
@RequestMapping("/payment")
public class PaymentController {
    PaymentService paymentService;


    @PostMapping("/insert")
    public void insert(@RequestBody PaymentDto dto, String imp_uid)
    {
        System.out.println("insert>>"+dto);
        System.out.println("uid>>"+imp_uid);
        paymentService.insertPayment(dto,imp_uid);
    }
//    @PostMapping("/insert")
//    public ResponseEntity<Map<String, Object>> insert(@RequestBody Map<String, Object> data) {
//        // 클라이언트에서 넘어온 결제 정보 처리 로직
//        // paymentService.insertPayment(dto, imp_uid);
//
//        // 결제 요청에 대한 응답으로 리디렉션 URL 반환
//        String redirectUrl = "https://api.iamport.kr/payments/complete"; // 결제 완료 후 리디렉션될 URL
//
//        Map<String, Object> response = new HashMap<>();
//        response.put("success", true);
//        response.put("redirect_url", redirectUrl);
//
//        return ResponseEntity.ok(response);
//    }

    @PostMapping("/paymentinfo")
    public Boolean paymentinfo(@RequestBody PaymentDto dto) {

        JsonNode token = paymentService.getToken();
        String accessToken = token.get("response").get("access_token").asText();
        System.out.println("front에서 넘어온 dto>>"+dto);
        JsonNode paymentInfo = paymentService.getPaymentData(accessToken, dto.getImp_uid());

        // 클라이언트에서 넘어온 amount와 조회한 결제 정보의 amount 비교
        int receivedAmount = dto.getAmount();
        int fetchedAmount = paymentInfo.get("response").get("amount").asInt();
        System.out.println("paymentinfo(portone에서 넘어온)>>"+paymentInfo.toString());

        if (receivedAmount == fetchedAmount) {
            // 결제 정보가 일치하면 true 리턴하고, 데이터베이스에 추가
            paymentService.insertPayment(dto,dto.getImp_uid());
            System.out.println("결제확인 완료");
            return true;
        } else {
            // 결제 정보가 일치하지 않으면 false 리턴
            System.out.println("결제정보 불일치");
            return false;
        }
    }

    @GetMapping("/ordercompletemobile")
    public RedirectView orderCompleteMobile(@RequestParam("imp_uid") String impUid,
                                            @RequestParam("merchant_uid") String merchantUid,
                                            @RequestParam("imp_success") boolean impSuccess,
                                            Model model) {
        if (impSuccess) {
            // 결제가 성공적으로 완료되었을 경우 필요한 처리를 수행합니다.
            JsonNode token = paymentService.getToken();
            String accessToken = token.get("response").get("access_token").asText();
            JsonNode paymentInfo = paymentService.getPaymentData(accessToken, impUid);

            // 리다이렉션을 원하는 도메인 입력
            String redirectUrl = "http://175.45.193.12/paymentresult";
            RedirectView redirectView = new RedirectView(redirectUrl, true);
            return redirectView;
        } else {
            // 결제가 실패한 경우 에러 페이지로 리다이렉트합니다.
            String redirectUrl = "https://example.com/error";
            RedirectView redirectView = new RedirectView(redirectUrl, true);
            return redirectView;
        }
    }

}



