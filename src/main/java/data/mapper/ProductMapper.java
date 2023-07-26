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

    public List<ProductDto> getProductDataRecent(String search);
    public List<ProductDto> getProductDataOld(String search);
    public List<ProductDto> getProductHighPrice(String search);


}
