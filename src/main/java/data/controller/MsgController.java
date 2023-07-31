package data.controller;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.RestController;
import data.dto.MsgDto;
import data.dto.RoomDto;
import data.service.RoomService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor

public class MsgController {
    @Autowired
    RoomService roomService;
    private final SimpMessageSendingOperations sendingOperations;

    @MessageMapping("/msg")
    public void msg(MsgDto msg) {
        switch (msg.getType()) {
            case "ENTER":
                break;/// 최초 방에 입장했을때

            case "CHAT":
                // 방이 존재하는지 확인
                RoomDto room = roomService.getRoom(msg.getRoomId());
                System.out.println(msg);
                // 방이 존재하는 경우에만 채팅 전송
                sendingOperations.convertAndSend("/sub/room/" + msg.getRoomId(), msg);

                break; // 채팅을 입력했을때
            case "DELETE": //삭제 타입
                // 방이 존재하는지 확인
                room = roomService.getRoom(msg.getRoomId());
                MsgDto deleteNotification = new MsgDto();
                deleteNotification.setType("DELETE");
                deleteNotification.setRoomId(msg.getRoomId());
                deleteNotification.setMsgId(msg.getMsgId());
                deleteNotification.setMsg(msg.getMsg());
                deleteNotification.setUserName(msg.getUserName());
                deleteNotification.setUser(msg.getUser());
                // deleteNotification.setUserName(msg.getEmailName());

                // 모든 클라이언트에게 삭제 알림 메시지를 전달
                sendingOperations.convertAndSend("/sub/room/" + msg.getRoomId(), deleteNotification);
                System.out.println(deleteNotification);
                break;
            case "KICK": //강퇴 타입
                room = roomService.getRoom(msg.getRoomId());
                MsgDto kickuser = new MsgDto();
                // 특정 사용자를 강퇴하는 로직 추가
                kickuser.setType("KICK");
                kickuser.setUserName(msg.getUserName());
                kickuser.setRoomId(msg.getRoomId());
                System.out.println("강퇴되었습니다.");
                sendingOperations.convertAndSend("/sub/room/" + msg.getRoomId(), kickuser);
                break;
            case "LIVE_END":
                room = roomService.getRoom(msg.getRoomId());
                MsgDto broadcastEnd = new MsgDto();
                broadcastEnd.setType("LIVE_END");
                broadcastEnd.setRoomId(msg.getRoomId());

                // 모든 클라이언트에게 방송 종료 메시지를 전달
                sendingOperations.convertAndSend("/sub/room/" + msg.getRoomId(), broadcastEnd);
                System.out.println(broadcastEnd);
                break;
            default:
                break;
        }
    }
}