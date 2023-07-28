package data.service;

import data.dto.BidDto;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface BidServiceInter {
    void insertBid(BidDto bidDto);
    int checkDuplicateBid(String productName, String userEmail);
    List<BidDto> getBidResult(@Param("product_name") String productName);
    BidDto getHighestPriceBid(@Param("productName") String productName);
    BidDto getUserBid(@Param("productName") String productName, @Param("userEmail") String userEmail);
    int countBidsByProductName(@Param("productName") String productName);
}
