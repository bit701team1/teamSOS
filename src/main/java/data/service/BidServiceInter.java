package data.service;

import data.dto.BidDto;

import java.util.Map;

public interface BidServiceInter {
    void insertBid(BidDto bidDto);
    int checkDuplicateBid(String productName, String userEmail);
}
