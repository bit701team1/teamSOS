package data.service;

import data.dto.UserDto;
import data.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.apache.juli.logging.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    UserMapper userMapper;

    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        System.out.println("CustomUserDetailsService의 loadUserByUsername 진입");
        UserDto userDto = userMapper.getUserByEmail(email);
        System.out.println("user = " + userDto);

        if (userDto == null) {
            throw new UsernameNotFoundException(email + " -> DB에서 찾을 수 없습니다.");
        } else {
            System.out.println("******************* Found user *******************");

            GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(userDto.getUser_type());
            System.out.println("grantedAuthority = " + grantedAuthority);
            System.out.println("userDto.getEmail() = " + userDto.getEmail());
            //System.out.println("userDto.getPassword() = "+ userDto.getPassword());

            return new User(userDto.getEmail(), "", Collections.singleton(grantedAuthority));
        }
    }

}

