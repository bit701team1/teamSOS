package data.controller;
import data.dto.BidDto;
import data.dto.ProductDto;
import data.service.BidService;
import data.service.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/product")
public class ProductController {
    private ProductService productService;
    private BidService bidService;

    @PostMapping("/insert")
    public void insert(@RequestBody ProductDto dto) {
        productService.insertProduct(dto);
    }

    @PostMapping("/insertBid")
    public void insertBid(@RequestBody BidDto bidDto){
        bidService.insertBid(bidDto);
    }

//    @PostMapping("/price-compare")
//    public ResponseEntity<Object> bid(@RequestParam("productName") String product_name, @RequestBody BidDto bidDto) {
//        System.out.println("product_name: " + product_name);
//        System.out.println("bidDto: " + bidDto.toString());
//        try {
//            List<ProductDto> products = productService.getWinnerAndFinalPriceByProductName(product_name);
//            System.out.println("products>>" + products + "||productName>>" + product_name);
//            System.out.println("bidDto::"+bidDto);
//            if (!products.isEmpty()) {
//                ProductDto product = products.get(0);
//                System.out.println("!product>>" + product);
//
//                if (bidDto.getPrice() > product.getFinal_price()) {
//                    product.setWinner(bidDto.getUser_email());
//                    product.setFinal_price(bidDto.getPrice());
//
//                    System.out.println("winner>>" + product.getWinner());
//                    System.out.println("final_price>>" + product.getFinal_price());
//
//                    productService.updateWinnerAndFinalPrice(product);
//
//                    bidService.insertBid(bidDto); // Insert bid into bid table
//                    return ResponseEntity.ok("입찰이 성공적으로 완료되었습니다!");
//                } else if (bidDto.getPrice()==0) {
//                    return ResponseEntity.badRequest().body("금액을 입력해주세요.");
//                }
//                else {
//                    return ResponseEntity.ok("입찰이 성공적으로 완료되었습니다!");
//                }
//            } else {
//                return ResponseEntity.notFound().build();
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
//        }
//    }
    @PostMapping("/price-compare")
    public ResponseEntity<Object> bid(@RequestBody BidDto bidDto) {
        System.out.println("product_name: " + bidDto.getProduct_name());
        System.out.println("bidDto: " + bidDto.toString());
        try {
            List<ProductDto> products = productService.getWinnerAndFinalPriceByProductName(bidDto.getProduct_name());
            System.out.println("products>>" + products + "||productName>>" + bidDto.getProduct_name());
            System.out.println("bidDto::"+bidDto);
            if (!products.isEmpty()) {
                ProductDto product = products.get(0);
                System.out.println("!product>>" + product);

                if (bidDto.getPrice() > product.getFinal_price()) {
                    product.setWinner(bidDto.getUser_email());
                    product.setFinal_price(bidDto.getPrice());

                    System.out.println("winner>>" + product.getWinner());
                    System.out.println("final_price>>" + product.getFinal_price());

                    productService.updateWinnerAndFinalPrice(product);

                    bidService.insertBid(bidDto); // Insert bid into bid table
                    return ResponseEntity.ok("입찰이 성공적으로 완료되었습니다!");
                } else if (bidDto.getPrice()==0) {
                    return ResponseEntity.badRequest().body("금액을 입력해주세요.");
                }
                else {
                    return ResponseEntity.ok("입찰이 성공적으로 완료되었습니다!");
                }
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/check-duplicate")
    public ResponseEntity<Object> checkDuplicateBid(@RequestParam("productName") String productName,
                                                    @RequestParam("userEmail") String userEmail) {
        try {
            int duplicateBid = bidService.checkDuplicateBid(productName, userEmail);
            System.out.println("duplicateBid>>"+duplicateBid);
            System.out.println("name>>"+productName);
            System.out.println("email>>"+userEmail);
            if (duplicateBid == 1) {
                return ResponseEntity.ok("이미 입찰한 이용자입니다.");
            } else {
                return ResponseEntity.ok("입찰 가능한 이용자입니다.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
