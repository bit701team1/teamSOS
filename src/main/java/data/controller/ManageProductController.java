package data.controller;


import data.dto.ProductDto;
import data.mapper.ProductMapper;
import data.service.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@AllArgsConstructor
@RequestMapping("/productlist")
public class ManageProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/recentlist")
    public List<ProductDto> recentlist(@RequestParam(required = false) String search){
        return productService.getProductDataRecent(search);
    }
    @GetMapping("/oldlist")
    public List<ProductDto> oldlist(@RequestParam(required = false) String search){
        return productService.getProductDataOld(search);
    }
    @GetMapping("/highpricelist")
    public List<ProductDto> highpricelist(@RequestParam(required = false) String search){
        return productService.getProductHighPrice(search);
    }




}
