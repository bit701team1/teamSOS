package data.controller;

import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import data.dto.msgDto;
import data.dto.roomDto;
import data.service.roomService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class msgController {
    @Autowired
    roomService roomService;
    private final SimpMessageSendingOperations sendingOperations;
    @MessageMapping("/msg")
    public void msg(msgDto msg) {
        switch (msg.getType()) {
            case "ENTER":
                break;/// 최초 방에 입장했을때

            case "CHAT":
                // 방이 존재하는지 확인
                roomDto room = roomService.getRoom(msg.getRoomId());

                    // 방이 존재하는 경우에만 채팅 전송
                    sendingOperations.convertAndSend("/sub/room/" + msg.getRoomId(), msg);

                break; // 채팅을 입력했을때
            default:
                break;
        }
    }
    @DeleteMapping("/delmsg")
    public void delmsg(@PathVariable("msg") String msg) {
        roomService.deleteChat(msg);
    }
}