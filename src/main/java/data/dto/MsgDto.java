package data.dto;


import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class MsgDto {
    private String type; // 메세지 타입
    private String roomId; // 세메지가 보내질 방 ID
    private String userName; // 메세지 보낸 사람
    private String msg; // 메세지 내용
    private int anonymousCount; // 익명 숫자
}

