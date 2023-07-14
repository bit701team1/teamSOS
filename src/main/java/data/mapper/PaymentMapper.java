package data.mapper;

import data.dto.PaymentDto;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PaymentMapper {
    public void insertPayment(PaymentDto dto);
}
