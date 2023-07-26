package data.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.springframework.stereotype.Service;

import data.dto.MsgDto;
import data.dto.RoomDto;

@Service
public class RoomService {
    private Map<String, RoomDto> rooms;//방목록 저장
    private Map<String, MsgDto> msgs;//메세지 저장
    @PostConstruct //Autowired 되는 순간 딱 한번만 실행되는 것(PostConstruct)
    private void init() {
        rooms = new LinkedHashMap<>();
    }
    public List<RoomDto> getAll(){//방 정보 가져오기
        List<RoomDto> res = new ArrayList<>(rooms.values());
        Collections.reverse(res); //방목록 순서 반전
        return res;
    }
    public RoomDto createRoom(String name) {//방생성
        RoomDto r = RoomDto.create(name);
        rooms.put(r.getRoomId(),r);
        return r;
    }
    public RoomDto getRoom(String roomId) {//특정방
        return rooms.get(roomId);
    }
    public void deleteRoom(String roomId) {
        rooms.remove(roomId);
    }
}
