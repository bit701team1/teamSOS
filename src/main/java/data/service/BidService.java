package data.service;

import data.dto.BidDto;

import data.mapper.BidMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


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

    @Override
    public List<BidDto> getBidResult(String productName) {
        return bidMapper.getBidResult(productName);
    }
}

