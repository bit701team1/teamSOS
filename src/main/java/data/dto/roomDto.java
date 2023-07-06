package data.dto;

import java.util.UUID;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class roomDto {
    String roomId;
    String roomName;

    public static roomDto create(String name) {
        roomDto r = new roomDto(); //생성자 생성
        r.roomId=UUID.randomUUID().toString();//roomId UUID(랜덤 고유 번호로 생성)
        r.roomName = name;
        return r;
    }
}
