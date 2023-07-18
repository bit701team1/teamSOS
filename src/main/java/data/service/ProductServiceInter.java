package data.service;

import data.dto.ProductDto;

import java.util.List;

public interface ProductServiceInter {
    public void insertProduct(ProductDto dto);
    public List<ProductDto> getWinnerAndFinalPriceByProductName(String product_name);
    public void updateWinnerAndFinalPrice(ProductDto dto);

}
