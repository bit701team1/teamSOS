package data.service;

import data.dto.UserDto;
import java.util.List;
import data.dto.security.RefreshTokenDto;
import data.mapper.TokenMapper;
import data.mapper.UserMapper;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService implements UserServiceInter{

    private UserMapper userMapper;

    @Override

    public List<UserDto> getAllUsers(){
        return userMapper.getAllUsers();
    }


    public void insertUser(UserDto dto) {
        userMapper.insertUser(dto);
    }

    @Override
    public UserDto getUserByEmail(String email) {
        return userMapper.getUserByEmail(email);
    }

    public UserDto getUserByUserId(int user_id){
        return userMapper.getUserByUserId(user_id);
    }

    @Override
    public int countEmail(String email) {
        return userMapper.countEmail(email);
    }

}
