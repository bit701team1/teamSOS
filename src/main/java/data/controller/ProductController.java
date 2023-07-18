package data.controller;

import data.dto.BidDto;
import data.dto.ProductDto;
import data.service.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/product")
public class ProductController {
    private ProductService productService;

    @PostMapping("/insert")
    public void insert(@RequestBody ProductDto dto) {
        productService.insertProduct(dto);
    }

    @PostMapping("/price-compare")
    public ResponseEntity<Object> bid(@RequestParam("productName") String product_name, @RequestBody BidDto bidDto) {
        try {
            List<ProductDto> products = productService.getWinnerAndFinalPriceByProductName(product_name);
            System.out.println("products>>" + products + "||productName>>" + product_name);
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
}
