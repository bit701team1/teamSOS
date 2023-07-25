package data.controller;

import data.dto.BidDto;
import data.service.BidService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/bid")
public class BidController {
    private BidService bidService;

    @PostMapping("/insert")
    public void insertBid(@RequestBody BidDto bidDto){
        bidService.insertBid(bidDto);
    }

    @GetMapping("/bidresult")
    public List<BidDto> getBidResult(@RequestParam("productName") String productName) {
        return bidService.getBidResult(productName);
    }

    @GetMapping("/highestprice")
    public BidDto getHighestPriceBid(@RequestParam("productName") String productName) {
        return bidService.getHighestPriceBid(productName);
    }
    @GetMapping("/userbid")
    public BidDto getUserBid(@RequestParam("productName") String productName, @RequestParam("userEmail") String userEmail) {
        return bidService.getUserBid(productName, userEmail);
    }
    @GetMapping("/countbids")
    public int countBidsByProductName(@RequestParam("productName") String productName) {
        return bidService.countBidsByProductName(productName);
    }

}
