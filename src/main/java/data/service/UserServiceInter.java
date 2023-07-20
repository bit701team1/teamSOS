package data.service;

import data.dto.ReportDto;
import data.dto.UserDto;

import java.util.List;
import java.util.Map;

import data.dto.security.RefreshTokenDto;
import org.springframework.security.core.userdetails.User;

public interface UserServiceInter {

    public void insertUser(UserDto dto);
    public UserDto getUserByEmail(String email);

    public UserDto getUserByUserId(int user_id);
    public int countEmail(String email);


    ///////////////////////////////////경철 ///////////////////////////////////////

    //회원목록 페이징리스트
    public List<UserDto> getManagePagingList(String search,int startNum,int perPage);
    //회원목록 토탈카운트
    public int getManageTotalCount();
    //회원 삭제
    void deleteUser(int user_id);


    //블랙리스트 멤버수 (new)
    public int getBlockListCount();

    //블랙리스트 회원 조회 (new)
    public List<ReportDto> getBlockList(String search,int startNum,int perPage);



}
