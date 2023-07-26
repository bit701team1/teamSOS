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


    @Override
    public List<ProductDto> getProductDataRecent(String search) {
        return productMapper.getProductDataRecent(search);
    }

    @Override
    public List<ProductDto> getProductDataOld(String search) {
        return productMapper.getProductDataOld(search);
    }

    @Override
    public List<ProductDto> getProductHighPrice(String search) {
        return productMapper.getProductHighPrice(search);
    }


}
