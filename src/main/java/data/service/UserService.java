package data.service;

import data.dto.UserDto;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import data.dto.security.RefreshTokenDto;
import data.mapper.TokenMapper;
import data.mapper.UserMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService implements UserServiceInter{

    private UserMapper userMapper;

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


///////////////////////////////////////////////////// 경 철 /////////////////////////////////
    @Override
    public void updateUserIsAlarm(String email, boolean isalarm){
        userMapper.updateUserIsAlarm(email,isalarm);
    }


    //회원목록 페이징 리스트
    public List<UserDto> getManagePagingList(String search,int startNum,int perPage){
        Map<String,Object> map=new HashMap<>();
        map.put("search",search);
        map.put("startNum",startNum);
        map.put("perPage",perPage);
        return userMapper.getManagePagingList(map);
    }
    //회원 목록 토탈카운트
    public int getManageTotalCount(){
        return userMapper.getManageTotalCount();
    }
    //회원 삭제
    @Override
    public void deleteUser(int user_id){
        userMapper.deleteUser(user_id);
    }
    
    //블랙리스트 회원 출력
    @Override
    public List<UserDto> getManageBlockList(String search,int startNum,int perPage){
        Map<String,Object> map=new HashMap<>();
        map.put("search",search);
        map.put("startNum",startNum);
        map.put("perPage",perPage);
        return userMapper.getManageBlockList(map);
    }

    //블랙리스트 목록 토탈카운트
    public int getManageBlockCount(){
        return userMapper.getManageBlockCount();
    }
    


}
