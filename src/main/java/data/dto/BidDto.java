
package data.dto;

import lombok.AllArgsConstructor;

import lombok.Data;
import lombok.NoArgsConstructor;



@Data
@AllArgsConstructor
public class BidDto {
    private int bid_num;
    private String product_name;
    private String user_email;
    private int price;
}
