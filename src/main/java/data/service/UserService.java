package data.service;

import data.dto.UserDto;
import data.mapper.UserMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class UserService implements UserServiceInter{

    private UserMapper userMapper;

    @Override
    public List<UserDto> getAllUsers(){
        return userMapper.getAllUsers();
    }

}
