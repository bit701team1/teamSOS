package data.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.apache.ibatis.type.Alias;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Date;


@Data
@Alias("ProductDto")
public class ProductDto {
    private int product_id;
    private String product_name;
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia:Seoul")
    private Timestamp transaction_date;
    private String description;
    private String winner;
    private int final_price;
    private String product_photo;
}
