package data.controller;

import java.util.List;
import java.util.Map;
import java.util.Timer;
import java.util.TimerTask;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import data.dto.RoomDto;
import data.service.RoomService;

@RestController
@RequestMapping("/lobby")
public class LobbyController {

    @Autowired
    RoomService roomService;

    @GetMapping("/list")
    public List<RoomDto> getList(){
        return roomService.getAll();
    }
    @PostMapping("/create")
    public RoomDto postCreate(@RequestBody Map<String,Object> data) {
        String roomName = data.get("name").toString();
        RoomDto createdRoom = roomService.createRoom(roomName);
        // 10초 후에 방을 삭제
        Timer timer = new Timer();
        timer.schedule(new TimerTask() {
            @Override
            public void run() {
                roomService.deleteRoom(createdRoom.getRoomId());
                timer.cancel(); // 타이머 종료
            }
        }, 600 * 1000); // 10초 (밀리초)
        
        return createdRoom;
    }

}