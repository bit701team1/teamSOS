package data.service;

import data.dto.ProductDto;
import data.mapper.ProductMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@AllArgsConstructor
@Service
public class ProductService implements ProductServiceInter{
    private ProductMapper productMapper;




    @Override
    public void insertProduct(ProductDto dto) {
        productMapper.insertProduct(dto);
    }

    @Override
    public List<ProductDto> getWinnerAndFinalPriceByProductName(String product_name) {
        return productMapper.getWinnerAndFinalPriceByProductName(product_name);
    }


    @Override
    public void updateWinnerAndFinalPrice(ProductDto dto) {
        productMapper.updateWinnerAndFinalPrice(dto);
    }
}
