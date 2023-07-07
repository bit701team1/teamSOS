package data.mapper;

import data.dto.security.RefreshTokenDto;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface TokenMapper {
    public void insertRefreshToken(RefreshTokenDto RTokenDto);

    public void updateRefreshToken(RefreshTokenDto RTokenDto);

    public int countRefreshToken(RefreshTokenDto RTokenDto);

    // u_num이 가진 refreshToken 반환
    public RefreshTokenDto selectRefreshToken(String rt_key);
}
