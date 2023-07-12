package data.service;

import data.dto.UserDto;

import java.util.List;
import java.util.Map;

import data.dto.security.RefreshTokenDto;
import org.springframework.security.core.userdetails.User;

public interface UserServiceInter {

    public void insertUser(UserDto dto);
    public UserDto getUserByEmail(String email);
    public void updateAccessToken(RefreshTokenDto RTokenDto);
    public int selectAccessToken(String accesstoken_value);
    public UserDto getUserByUserId(int user_id);
    public int countEmail(String email);



    //회원목록 페이징리스트
    public List<UserDto> getManagePagingList(String search,int startNum,int perPage);
    //회원목록 토탈카운트
    public int getManageTotalCount();
    //회원 삭제
    void deleteUser(int user_id);
    //회원 검색
//    public List<UserDto> getSearchUser(String search, Integer startNum, Integer perPage);
//    //회원 검색 카운트
//    public int getSearchUserCount(String search,Integer startNum, Integer perPage);



}
