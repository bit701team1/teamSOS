package data.dto;

import lombok.Data;
import org.apache.ibatis.type.Alias;

@Data
@Alias("VideoDto")
public class VideoDto {
    private String id;
    private String title;
    private String url;


}

