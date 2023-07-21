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


}
