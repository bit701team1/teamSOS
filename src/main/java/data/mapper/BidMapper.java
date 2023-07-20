package data.mapper;

import data.dto.BidDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;


@Mapper
public interface BidMapper {
    void insertBid(BidDto dto);
    int checkDuplicateBid(@Param("productName") String productName, @Param("userEmail") String userEmail);
}

