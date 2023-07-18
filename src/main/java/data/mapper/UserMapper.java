package data.mapper;
import data.dto.UserDto;
import org.apache.ibatis.annotations.Mapper;
import java.util.List;
import java.util.Map;

import data.dto.security.RefreshTokenDto;
import org.springframework.security.core.userdetails.User;

@Mapper
public interface UserMapper {

    //스프링 시큐리티용 로그인

    public UserDto getUserByEmail(String email);

    public UserDto getUserByNum(int user_id);

    public UserDto getUserByUserName(String user_name);

    //스프링 시큐리티용 회원가입
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

    // 주소 수정
    public void addrChange(UserDto dto);

    //회원 탈퇴
    public void deleteUser(int user_id);

    // 휴대폰 번호로 이메일 찾기
    public String findEmailByHp(String hp);

    // 휴대폰 번호, 이메일에 맞는 아이디 있는지 체크
    public int findPassCheck(UserDto dto);

    // 임시 비밀번호로 변경
    public void findPassUpdate(UserDto dto);

    // refresh_token 삭제
    public void deleteRefreshToken(int user_id);


    public UserDto getUserByUserId(int user_id);

    public int countEmail(String email);

    ///////////////////////////////////경철 ///////////////////////////////////////
    public void updateUserIsAlarm(String email, boolean isalarm);


    //관리자페이지에서 일반회원 목로 페이징
    public List<UserDto> getManagePagingList(Map<String,Object>map);
    //관리자페이지에서 회원 목록 토탈 카운트
    public int getManageTotalCount();

    //관리자페이지에서 블랙리스트 회원 출력
    public List<UserDto> getManageBlockList(Map<String,Object> map);

    //블랙리스트 멤버 수 (count)
    public int getManageBlockCount();






}
