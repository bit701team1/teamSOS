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


    ///////////////////////////////////경철 ///////////////////////////////////////

    public int countEmail(String email);    
    //회원목록 페이징리스트
    public List<UserDto> getManagePagingList(String search,int startNum,int perPage);
    //회원목록 토탈카운트
    public int getManageTotalCount();
    //회원 삭제
    void deleteUser(int user_id);

    //검색된 유저의 토탈카운트
    int getManageTotalCountWithSearch(String search);

    //블랙리스트 멤버수 (new)
    public int getBlockListCount();

    //블랙리스트 회원 조회 (new)
    public List<ReportDto> getBlockList(String search,int startNum,int perPage);

    // 버튼 클릭시 report num 증가
    public void updateReportNum(String email);

    //수연 
    //신고 insert
    public void insertReport(ReportDto dto);
    //alarm 스위치 on, off
    public void updatealarm(UserDto dto);
    //유저 정보 수정
    public void updateUserInfo(UserDto dto);

}
