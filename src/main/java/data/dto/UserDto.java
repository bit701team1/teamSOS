package data.dto;

import org.apache.ibatis.type.Alias;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.apache.ibatis.type.Alias;

import java.sql.Timestamp;
@Data
@Alias("UserDto")
public class UserDto {
    private int user_id;
    private String password;
    private String user_name;
    private String email;
    private String hp;

    //db에는 int임 조심
    private String user_type;

    private boolean isalarm;
    private boolean iswinner;
    private int report_num;
    private long total_payment;

}



