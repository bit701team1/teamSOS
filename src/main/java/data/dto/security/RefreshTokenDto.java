package data.dto.security;

import lombok.Data;
import org.apache.ibatis.type.Alias;

@Data
@Alias("RTokenDto")
public class RefreshTokenDto {
    private String rt_key;
    private String rt_value;
}
