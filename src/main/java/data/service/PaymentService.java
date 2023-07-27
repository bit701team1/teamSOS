package data.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import data.dto.PaymentDto;
import data.mapper.PaymentMapper;
import data.mapper.TokenMapper;
import data.mapper.UserMapper;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@AllArgsConstructor
@Service
public class PaymentService implements PaymentServiceInter{
    private PaymentMapper paymentMapper;

//    @Override
//    public void insertPayment(PaymentDto dto, String imp_uid) {
//        paymentMapper.insertPayment(dto);
//    }
    @Override
    public void insertPayment(PaymentDto dto) {
        paymentMapper.insertPayment(dto);
    }

    //토큰 가져오는 서비스(토큰 생성)
    public JsonNode getToken() {
        String url = "https://api.iamport.kr/users/getToken"; //API URL
        HttpMethod method = HttpMethod.POST; //API METHOD
        String impKey = "5241476238764722";
        String impSecret = "FEGg1bKjDnj1TcK2WUjr6VOs0FoJXKqHWc8lhjJ09aQw6h2ekW8mJ3z1OAoxPARo23WIE9YtQrraIiUG";

        // 데이터 설정
        Map<String, String> data = new HashMap<>();
        data.put("imp_key", impKey);
        data.put("imp_secret", impSecret);
        ObjectMapper objectMapper = new ObjectMapper(); //object 만드는 객체
        String jsonStr = null; //jsonString 변수 선언
        try {
            jsonStr = objectMapper.writeValueAsString(data); //data를 json형식의 string으로 만듦
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        HttpHeaders headers = new HttpHeaders(); //Header 생성
        headers.setContentType(MediaType.APPLICATION_JSON); //body형식 지정(json)

        HttpEntity<String> requestEntity = new HttpEntity<>(jsonStr, headers); //위에서만든 data(jsonStr=json형식의 String)와 Header를 하나의 Entity로 만듦

        RestTemplate restTemplate = new RestTemplate(); //restTemplate을 만듦
        ResponseEntity<String> responseEntity = restTemplate.exchange(url, method, requestEntity, String.class); //restTemplate을 통해서 Api 호출(url로, method으로, requestEntity를 보내서 responseEntity를 받음=토큰 받음)

        JsonNode responseJson = null;
        try {
            responseJson = objectMapper.readTree(responseEntity.getBody());//responsEntity안의 데이터를 json형식으로 변환
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return responseJson;//json형식으로 리턴=json 안의 access Token을 꺼내야 함 일단 찍어보고 String으로 토큰만 보낼거면 위에 형식 jsonnode에서 string으로 바꾸고 리턴하면 댐
    }

    //결제 정보 가져오는 서비스
    public JsonNode getPaymentData(String accessToken, String impUid) {
        String url = "https://api.iamport.kr/payments/" + impUid;// 보낼 api url 선언
        HttpMethod method = HttpMethod.GET; //호출할 api method 선언

        HttpHeaders headers = new HttpHeaders(); //header 선언
        headers.set("Authorization", accessToken); //header에서 인증정보 세팅

        HttpEntity<String> requestEntity = new HttpEntity<>(headers);//requestentity 선언 get은 body가 없고, POST는 있음

        RestTemplate restTemplate = new RestTemplate(); //resttemplate을 선언
        ResponseEntity<String> responseEntity = restTemplate.exchange(url, method, requestEntity, String.class); //restTemplate을 통해서 Api 호출(url로, method으로, requestEntity를 보내서 responseEntity를 받음= 결제정보)

        ObjectMapper objectMapper = new ObjectMapper(); //objectMapper 선언
        JsonNode responseJson = null; //json 객체 선언(responseEntity의 값을 json형식으로 넣을 객체 선언)
        try {
            responseJson = objectMapper.readTree(responseEntity.getBody());//responseEntity에서 받아온 데이터를 json형식으로 저장
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return responseJson; // 결제정보가 json형식으로 리턴
    }


}
