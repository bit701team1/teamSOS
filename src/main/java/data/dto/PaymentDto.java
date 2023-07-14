package data.dto;

import lombok.Data;
import org.apache.ibatis.type.Alias;

@Data
@Alias("PaymentDto")
public class PaymentDto {
    private int num;
    private String id;
    private String pg;
    private String pay_method;
    private String merchant_uid;
    private String name;
    private int amount;
    private String buyer_email;
    private String buyer_name;
    private String buyer_tel;
    private String buyer_addr;
    private String buyer_postcode;
    private String imp_uid;
}
