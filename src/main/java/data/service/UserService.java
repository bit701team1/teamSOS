package data.service;

import data.dto.UserDto;
import data.mapper.UserMapper;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService implements UserServiceInter{

    private UserMapper userMapper;

    @Override
    public void insertUser(UserDto dto) {
        userMapper.insertUser(dto);
    }

    @Override
    public UserDto getUserByEmail(String email) {
        return userMapper.getUserByEmail(email);
    }
}
