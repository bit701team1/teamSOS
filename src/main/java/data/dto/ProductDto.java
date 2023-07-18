package data.dto;

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
    private Timestamp transaction_date;
    private String description;
    private String winner;
    private int final_price;
}
