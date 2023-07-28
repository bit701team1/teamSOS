package data.mapper;

import data.dto.ProductDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface ProductMapper {
    public void insertProduct(ProductDto dto);

    public List<ProductDto> getWinnerAndFinalPriceByProductName(String product_name);

    public void updateWinnerAndFinalPrice(ProductDto dto);

    public ProductDto selectByCurDate();

    //    상품 최신순으로 조회
    public List<ProductDto> getProductDataRecent(String search);
    //    상품 오래된순으로 조회
    public List<ProductDto> getProductDataOld(String search);
    //    상품 가격순으로 조회
    public List<ProductDto> getProductHighPrice(String search);


}
