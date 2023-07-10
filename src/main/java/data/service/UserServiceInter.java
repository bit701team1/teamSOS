package data.service;

import data.dto.UserDto;
import data.dto.security.RefreshTokenDto;
import org.springframework.security.core.userdetails.User;

public interface UserServiceInter {
    public void insertUser(UserDto dto);
    public UserDto getUserByEmail(String email);
    public void updateAccessToken(RefreshTokenDto RTokenDto);
    public int selectAccessToken(String accesstoken_value);
    public UserDto getUserByUserId(int user_id);
    public int countEmail(String email);
}
