package data.service;

import data.mapper.AuthMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class AuthService {
    private AuthMapper authMapper;

    public List<String> selectHpList(){
        System.out.println("진입 확인");
        return authMapper.selectHpList();
    };
}
