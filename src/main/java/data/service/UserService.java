package data.service;

import data.dto.ReportDto;
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
    //회원 검색
//    @Override
//    public List<UserDto> getSearchUser(String search,Integer startNum, Integer perPage){
//        if(startNum==null) startNum = 0;
//        if(perPage==null) perPage= 0;
//
//        Map<String ,Object> map =new HashMap<>();
//        map.put("start",Integer.valueOf(startNum));
//        map.put("perpage",Integer.valueOf(perPage));
//        map.put("search",search);
//
//        return userMapper.getSearchUser(map);
//    }
//    //회원 검색 카운트
//    @Override
//    public int getSearchUserCount(String search,Integer startNum, Integer perPage){
//        if(startNum==null) startNum = 0;
//        if(perPage==null) perPage= 0;
//
//        Map<String ,Object> map =new HashMap<>();
//        map.put("start",Integer.valueOf(startNum));
//        map.put("perpage",Integer.valueOf(perPage));
//        map.put("search",search);
//
//        return userMapper.getSearchUserCount(map);
//    }
//
    //수연 알람
    public void updatealarm(UserDto dto){
        userMapper.updatealarm(dto);
    }
    //수연 경고증가
    public void insertReport(ReportDto dto){
        userMapper.insertReport(dto);
    }
}
