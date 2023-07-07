package data.dto.security;

import lombok.Builder;
import lombok.Data;
import org.apache.ibatis.type.Alias;

@Data
@Builder
@Alias("TokenDto")
public class TokenDto {
    private int user_id;
    private String granttype;
    private String accesstoken;
    private String refreshtoken;
    private Long accesstokenexpire;
    private Long refreshtokenexpire;
}
