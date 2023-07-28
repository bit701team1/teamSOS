package data.mapper;

import data.dto.BidDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;


@Mapper
public interface BidMapper {
    void insertBid(BidDto dto);
    int checkDuplicateBid(@Param("productName") String productName, @Param("userEmail") String userEmail);
    List<BidDto> getBidResult(@Param("product_name") String productName);
    BidDto getHighestPriceBid(@Param("productName") String productName);
    BidDto getUserBid(@Param("productName") String productName, @Param("userEmail") String userEmail);
    int countBidsByProductName(@Param("productName") String productName);
}

