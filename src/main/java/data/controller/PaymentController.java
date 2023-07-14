package data.controller;


import com.fasterxml.jackson.databind.JsonNode;
import data.dto.PaymentDto;
import data.dto.UserDto;
import data.mapper.TokenMapper;
import data.mapper.UserMapper;
import data.service.PaymentService;
import lombok.AllArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.util.Map;


@RestController
@AllArgsConstructor
@RequestMapping("/payment")
public class PaymentController {
    PaymentService paymentService;

    UserMapper userMapper;
    TokenMapper tokenMapper;

    @PostMapping("/insert")
    public void insert(@RequestBody PaymentDto dto, String imp_uid)
    {
        System.out.println("insert>>"+dto);
        System.out.println("uid>>"+imp_uid);
        paymentService.insertPayment(dto,imp_uid);
    }

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

}



