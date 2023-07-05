package data.dto.security;

import lombok.Builder;
import lombok.Data;
import org.apache.ibatis.type.Alias;

@Data
@Builder
@Alias("TokenDto")
public class TokenDto {
    private int user_id;
    private String grantType;
    private String accessToken;
    private String refreshToken;
    private Long accessTokenExpiresIn;
}
