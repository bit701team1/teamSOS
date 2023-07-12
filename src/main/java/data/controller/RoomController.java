package data.controller;

import java.util.Timer;
import java.util.TimerTask;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import data.dto.RoomDto;
import data.service.RoomService;
@RestController
@RequestMapping("/room")
public class RoomController {
    @Autowired
    RoomService roomService;

    @GetMapping("/info/{id}")
    public RoomDto getInfo(@PathVariable String id) {
        RoomDto room = roomService.getRoom(id);
        if (room != null) {
            // 방 정보를 가져왔을 때만 타이머를 시작하고, 10초 후에 방을 삭제하도록 설정
            Timer timer = new Timer();
            timer.schedule(new TimerTask() {
                @Override
                public void run() {
                    roomService.deleteRoom(id);
                    timer.cancel(); // 타이머 종료
                    System.out.println("끝");
                }
            }, 600 * 1000);
        }
        return room;
    }
}
