package data.service;

import com.amazonaws.services.s3.transfer.internal.CompleteMultipartCopy;
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


    /////////////////////경철//////////////
    // 알림수신 업데이트
    public void updateUserIsAlarm(String email, boolean isalarm);


    //회원목록 페이징리스트
    public List<UserDto> getManagePagingList(String search,int startNum,int perPage);
    //회원목록 토탈카운트
    public int getManageTotalCount();
    //회원 삭제
    void deleteUser(int user_id);

    //블랙리스트 회원
    public List<UserDto> getManageBlockList(String search,int startNum,int perPage);
    //블랙리스트 멤버 수
    public int getManageBlockCount();



}
