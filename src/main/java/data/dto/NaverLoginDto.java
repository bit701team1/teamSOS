package data.dto;

import lombok.Data;
import org.apache.ibatis.type.Alias;

@Data
@Alias("NaverLoginDto")
public class NaverLoginDto {
    private String email;
    private String mobile;
    private String name;
}
