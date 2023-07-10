package data.dto.security;

import lombok.Data;
import org.apache.ibatis.type.Alias;

@Data
@Alias("RTDto")
public class RefreshTokenDto {
    private String rt_key;
    private String refreshtoken_value;
    private Long refreshtoken_expire;
    private String accesstoken_value;
}
