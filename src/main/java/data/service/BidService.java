package data.service;

import data.dto.BidDto;

import data.mapper.BidMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@AllArgsConstructor
@Service
public class BidService implements BidServiceInter{
    private final BidMapper bidMapper;

    @Override
    public void insertBid(BidDto bidDto) {
        bidMapper.insertBid(bidDto);
    }

    @Override
    public int checkDuplicateBid(String productName, String userEmail) {
        return bidMapper.checkDuplicateBid(productName, userEmail);
    }
}

