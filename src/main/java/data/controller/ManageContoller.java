package data.controller;

import data.dto.ReportDto;
import data.dto.UserDto;
import data.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Vector;

@RestController
@CrossOrigin
@RequestMapping("/manage")
@AllArgsConstructor
public class ManageContoller {

    UserService userService;


    //회원 목록 조회 페이징리스트
    @GetMapping("/userlist")
    public Map<String, Object> list(@RequestParam(defaultValue = "1") int currentPage, @RequestParam(required = true) String search)
    {
        //currentPage가 안넘어오면 무조건 1페이지로
        System.out.println("userlist>>"+currentPage);

        //search
        System.out.println("searchlist"+search);

        //페이징처리
        int totalCount;//총갯수
        int perPage=8;//한페이지당 출력할 글갯수
        int perBlock=5;//출력할 페이지갯수
        int startNum;//db에서 가져올 시작번호
        int startPage;//출력할 시작페이지
        int endPage;//출력할 끝페이지
        int totalPage;//총 페이지수
        int no;//출력할 시작번호

        //검색된 유저의 수
        int totalUserCount=userService.getManageTotalCount();
        //총갯수
        totalCount=userService.getManageTotalCountWithSearch(search);
        //총 페이지수
        totalPage=totalCount/perPage+(totalCount%perPage==0?0:1);
        //시작페이지
        startPage=(currentPage-1)/perBlock*perBlock+1;
        //끝페이지
        endPage=startPage+perBlock-1;
        if(endPage>totalPage)
            endPage=totalPage;

        //시작번호
        startNum=(currentPage-1)*perPage;
        //각페이지당 출력할 번호
        no=totalCount-(currentPage-1)*perPage;

        List<UserDto> list=userService.getManagePagingList(search,startNum,perPage);

        //출력할 페이지번호들을 Vector에 담아서 보내기
        Vector<Integer> parr=new Vector<>();
        for(int i=startPage;i<=endPage;i++){
            parr.add(i);
        }

        //리액트로 필요한 변수들을 Map 에 담아서 보낸다
        Map<String,Object> smap=new HashMap<>();
        smap.put("totalCount",totalCount);
        smap.put("totalUserCount",totalUserCount);
        smap.put("getUserList",list);
        smap.put("parr",parr);
        smap.put("startPage",startPage);
        smap.put("endPage",endPage);
        smap.put("no",no);
        smap.put("totalPage",totalPage);

        return  smap;
    }


    //블랙리스트 목록 조회 페이징리스트
    @GetMapping("/blocklist")
    public Map<String, Object> blocklist(@RequestParam(defaultValue = "1") int currentPage, @RequestParam(required = true) String search)
    {
        //currentPage가 안넘어오면 무조건 1페이지로
        System.out.println("blocklistCurrentPage>>"+currentPage);

        //search
        System.out.println("getblocklist(new)"+search);

        //페이징처리
        int totalCount;//총갯수
        int perPage=8;//한페이지당 출력할 글갯수
        int perBlock=5;//출력할 페이지갯수
        int startNum;//db에서 가져올 시작번호
        int startPage;//출력할 시작페이지
        int endPage;//출력할 끝페이지
        int totalPage;//총 페이지수
        int no;//출력할 시작번호

        //총갯수
        totalCount=userService.getBlockListCount();
        //총 페이지수
        totalPage=totalCount/perPage+(totalCount%perPage==0?0:1);
        //시작페이지
        startPage=(currentPage-1)/perBlock*perBlock+1;
        //끝페이지
        endPage=startPage+perBlock-1;
        if(endPage>totalPage)
            endPage=totalPage;

        //시작번호
        startNum=(currentPage-1)*perPage;
        //각페이지당 출력할 번호
        no=totalCount-(currentPage-1)*perPage;

        List<ReportDto> blist=userService.getBlockList(search,startNum,perPage);

        //출력할 페이지번호들을 Vector에 담아서 보내기
        Vector<Integer> barr=new Vector<>();
        for(int i=startPage;i<=endPage;i++){
            barr.add(i);
        }

        //리액트로 필요한 변수들을 Map 에 담아서 보낸다
        Map<String,Object> map=new HashMap<>();
        map.put("totalCount",totalCount);
        map.put("Blocklist",blist);
        map.put("barr",barr);
        map.put("startPage",startPage);
        map.put("endPage",endPage);
        map.put("no",no);
        map.put("totalPage",totalPage);

        return  map;
    }




    @DeleteMapping("/delete")
    public void deleteUser(int user_id)
    {
        System.out.println("delete"+user_id);
        userService.deleteUser(user_id);
    }


}
