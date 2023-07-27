package data.controller;

import java.io.IOException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import data.dto.PaymentDto;

import data.service.PaymentService;
import lombok.AllArgsConstructor;


import org.springframework.web.bind.annotation.*;


import javax.servlet.http.HttpServletRequest;
import java.util.Map;



@RestController
@AllArgsConstructor
@RequestMapping("/payment")
public class PaymentController {
    PaymentService paymentService;
    HttpServletRequest request;

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
        System.out.println("paymentinfo(portone에서 넘어온)>>"+paymentInfo);

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

//    @GetMapping("/getcompleteresult")
//    public boolean getcompleteresult(@RequestParam("imp_uid") String impUid,
//                                    @RequestParam("merchant_uid") String merchantUid,
//                                    @RequestParam("imp_success") boolean impSuccess,
//                                     @RequestParam("paymentData") String paymentDataStr ) {
//
//        // paymentDataStr를 JSON 객체로 변환
//        ObjectMapper objectMapper = new ObjectMapper();
//        // paymentDataStr를 Map 객체로 변환
//        Map<String, Object> paymentDataJson = objectMapper.readValue(paymentDataStr, Map.class);
//        Map<String, Object> dataJson = (Map<String, Object>) paymentDataJson.get("data");
//        if (impSuccess == true) {
//            // 결제가 성공적으로 완료되었을 경우 필요한 처리를 수행합니다.
//            JsonNode token = paymentService.getToken();
//            String accessToken = token.get("response").get("access_token").asText();
//            JsonNode paymentInfo = paymentService.getPaymentData(accessToken, impUid);
//            System.out.println("front_amount>>"+amount);
//            System.out.println("paymentinfo(portone에서 넘어온)>>" + paymentInfo.toString());
//            String info = paymentInfo.toString();
//            int fetchedAmount = paymentInfo.get("response").get("amount").asInt();
//            if (amount == fetchedAmount){
//                PaymentDto dto=new PaymentDto();
//                dto.setAmount(amount);
//                dto.setName();
//                // 결제 정보가 일치하면 true 리턴하고, 데이터베이스에 추가
//                paymentService.insertPayment(dto,impUid);
//            System.out.println("결제확인 완료");
//            return true;
//            } else {
//            // 결제 정보가 일치하지 않으면 false 리턴
//            System.out.println("결제정보 불일치");
//            return false;
//            }
//        } else {
//            // 결제가 실패한 경우 에러 페이지로 리다이렉트합니다.
//            return false;
//        }
//    }
    @GetMapping("/getcompleteresult")
    public boolean getcompleteresult(@RequestParam("imp_uid") String impUid,
                                     @RequestParam("merchant_uid") String merchantUid,
                                     @RequestParam("imp_success") boolean impSuccess,
                                     HttpServletRequest request) {
        try {
            String paymentDataStr = (String) request.getSession().getAttribute("paymentData");
            System.out.println("paydata>>"+paymentDataStr);
            // paymentDataStr를 JSON 객체로 변환
            ObjectMapper objectMapper = new ObjectMapper();

            Map<String, Object> paymentDataJson = objectMapper.readValue(paymentDataStr, Map.class);
            Map<String, Object> dataJson = (Map<String, Object>) paymentDataJson.get("data");

            int amount = (Integer) dataJson.get("amount");
            String name = (String) dataJson.get("name");
            String pg = (String) dataJson.get("pg");
            String pay_method = (String) dataJson.get("pay_method");
            String buyer_email = (String) dataJson.get("buyer_email");
            String buyer_name = (String) dataJson.get("buyer_name");
            String buyer_tel = (String) dataJson.get("buyer_tel");

            if (impSuccess) {
                // 결제가 성공적으로 완료되었을 경우 필요한 처리를 수행합니다.
                JsonNode token = paymentService.getToken();
                String accessToken = token.get("response").get("access_token").asText();
                JsonNode paymentInfo = paymentService.getPaymentData(accessToken, impUid);
                System.out.println("front_amount>>" + amount);
                System.out.println("paymentinfo(portone에서 넘어온)>>" + paymentInfo.toString());

                int fetchedAmount = paymentInfo.get("response").get("amount").asInt();
                if (amount == fetchedAmount) {
                    PaymentDto dto = new PaymentDto();
                    dto.setAmount(amount);
                    dto.setName(name);
                    dto.setPg(pg);
                    dto.setPay_method(pay_method);
                    dto.setBuyer_email(buyer_email);
                    dto.setBuyer_name(buyer_name);
                    dto.setBuyer_tel(buyer_tel);
                    // 결제 정보가 일치하면 true 리턴하고, 데이터베이스에 추가
                    paymentService.insertPayment(dto, impUid);
                    System.out.println("결제확인 완료");
                    return true;
                } else {
                    // 결제 정보가 일치하지 않으면 false 리턴
                    System.out.println("결제정보 불일치");
                    return false;
                }
            } else {
                // 결제가 실패한 경우 에러 페이지로 리다이렉트합니다.
                return false;
            }
        } catch (IOException e) {
            // 예외 처리 로직 구현 (예: 로그 남기기, 오류 응답 반환 등)
            System.out.println("Error processing JSON string: " + e.getMessage());
            return false;
        }
    }
}



