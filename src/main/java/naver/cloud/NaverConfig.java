package naver.cloud;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration // 설정 파일 혹은 bean등록 목적
@PropertySource("classpath:/naver.properties")
@ConfigurationProperties(prefix = "ncp")
@Data
public class NaverConfig {
    //naver.properties에 선언된 값중에서
    //ncp.* 이름으로 된 property값을 받을 필드 선언
    private String accessKey; //ncp.accessKey 를 받을 변수 선언
    private String secretKey;
    private String regionName;
    private String endPoint;
}