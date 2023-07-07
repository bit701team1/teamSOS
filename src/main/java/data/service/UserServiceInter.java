package data.service;

import data.dto.UserDto;
import org.springframework.security.core.userdetails.User;

public interface UserServiceInter {
    public void insertUser(UserDto dto);
    public UserDto getUserByEmail(String email);
}
