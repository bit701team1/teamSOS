package data.controller;

import data.dto.BidDto;
import data.service.BidService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/bid")
public class BidController {
    private BidService bidService;

    @PostMapping("/insert")
    public void insertBid(@RequestBody BidDto bidDto){
        bidService.insertBid(bidDto);
    }
}
