package boot.myproject.login.config;

import boot.myproject.login.dto.UserDto;
import boot.myproject.login.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class LoginIdPwValidator implements UserDetailsService{

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
        //password 암호화 구간으로 다른 종류도 있음
        //넣는 위치는 상관없다고함
        //운영자도 몰라야하는게 비밀번호
    }

    @Autowired
    private UserMapper userMapper;

    @Override
    public UserDetails loadUserByUsername(String insertedId) throws UsernameNotFoundException {
        UserDto user = userMapper.getUserInfo(insertedId);

        if (user == null) {
            return null;
        }

        //
        String pw = user.getPw(); //"d404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db"
        String roles = user.getRoles(); //"USER"

        return User.builder()
                .username(insertedId)
                .password(pw)
                .roles("USER")
                .build();
    }
}
