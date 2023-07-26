package data.mapper;
import data.dto.ReportDto;
import data.dto.UserDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import data.dto.security.RefreshTokenDto;
import org.springframework.security.core.userdetails.User;

@Mapper
public interface UserMapper {


    public UserDto getUserByEmail(String email);

    public UserDto getUserByUserId(int user_id);

    public int countEmail(String email);

    public void updateUserPassbyHp(Map<String,String> map);


    //회원가입
    public void insertUser(UserDto dto);

    // 이메일 중복 체크
    public int emailCheck(String email);

    // 핸드폰 중복 체크
    public int hpCheck(String hp);

    //이메일 수정
    public void emailChange(UserDto dto);

    // 이전 비밀번호 일치 체크
    public int passCheck(UserDto dto);

    // 비밀번호 수정
    public void passChange(UserDto dto);

    // 이름 수정
    public void nameChange(UserDto dto);

    // 휴대폰 번호 수정
    public void hpChange(UserDto dto);

    //회원 탈퇴
    public void deleteUser(int user_id);

    ///////////////////////////////////경철 ///////////////////////////////////////

    //관리자페이지에서 회원 목로 페이징
    public List<UserDto> getManagePagingList(Map<String,Object>map);
    //관리자페이지에서 회원 목록 토탈 카운트
    public int getManageTotalCount();

    //검색된 유저의 총 토탈 카운트
    public int getManageTotalCountWithSearch(Map<String, Object> map);

    //블랙리스트 멤버 숫자(new)
    public int getBlockListCount();
    //수연 알람
    public void updatealarm(UserDto dto);
    //수연 경고증가
    public void insertReport(ReportDto dto);
    //수연 유저 정보 수정
    public void updateUserInfo(UserDto dto);
    //수연 비밀번호 변경
    public void updatePassword(UserDto dto);

    //관리자페이지에서 블랙리스트 회원출력(new)
    public List<ReportDto> getBlockList(Map<String,Object> map);

    // 버튼 클릭시 report num 증가
    public void updateReportNum(String email);
}
