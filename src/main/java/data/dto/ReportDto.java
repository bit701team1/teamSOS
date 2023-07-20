package data.dto;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("ReportDto")
public class ReportDto {
    private int num;
    private String email;
    private String msg;

}
