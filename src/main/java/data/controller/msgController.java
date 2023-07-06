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
    private AtomicInteger anonymousCount = new AtomicInteger(0); // 익명 숫자를 저장할 AtomicInteger

    @MessageMapping("/msg")
    public void msg(msgDto msg) {
        switch (msg.getType()) {
            case "ENTER":
                msg.setMsg(msg.getUserName() + "님이 접속하였습니다.");
                // 익명 숫자를 전송
                msg.setAnonymousCount(anonymousCount.incrementAndGet());
                sendingOperations.convertAndSend("/sub/room/" + msg.getRoomId(), msg);
                break;/// 최초 방에 입장했을때

            case "CHAT":
                // 방이 존재하는지 확인
                roomDto room = roomService.getRoom(msg.getRoomId());
                if (room != null) {
                    // 방이 존재하는 경우에만 채팅 전송
                    sendingOperations.convertAndSend("/sub/room/" + msg.getRoomId(), msg);
                } else if(room == null) {
                    // 방이 존재하지 않는 경우에는 적절한 처리 (예: 에러 메시지 등)
                    System.out.println("끝");
                }
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
