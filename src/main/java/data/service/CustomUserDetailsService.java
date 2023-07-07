package data.service;

import data.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import data.mapper.UserMapper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.Console;
import java.util.Collections;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    //    private final MemberRepository memberRepository;
    @Autowired
    UserMapper userMapper;

    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;
//    @Autowired
//    PasswordEncoder passwordEncoder;

    //    @Transactional

    //메서드명은 정해져있지만 ID로 진행했음
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        System.out.println("CustomUserDetailsService의 loadUserByUsername 진입");
        System.out.println("loadUserByUsername 의 parameter = " + email);
        UserDto user = userMapper.getUserByEmail(email);
        System.out.println("user = " + user);
        if (user == null) {
//            System.out.println(username);
            throw new UsernameNotFoundException(email + "-> DB에서 찾을 수 없습니다.");

        } else {
            System.out.println("******************* Found user *******************");
            System.out.println("id : " + user.getUser_name());

            GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(user.getUser_type());
            System.out.println("grantedAuthority = "+grantedAuthority);

            String rawPassword = user.getPassword(); // 암호화되지 않은 비밀번호
            //System.out.println("rawPassword = " + rawPassword);
            String encodedPassword = bCryptPasswordEncoder.encode(rawPassword);
            //System.out.println("encodedPassword = "+encodedPassword);

            System.out.println(new User(user.getUser_name(), user.getEmail(), Collections.singleton(grantedAuthority)));
            return new User(user.getEmail(), encodedPassword, Collections.singleton(grantedAuthority));
//                    (
//                    userDto.getEmail(),
//                    userDto.getPass(),
//                    Collections.singleton(grantedAuthority));
        }
    }


//        return userMapper.getUserInfo(username)
//                .map(this::createUserDetails)
//                .orElseThrow(() -> new UsernameNotFoundException(username + " -> 데이터베이스에서 찾을 수 없습니다."));


//    // DB 에 User 값이 존재한다면 UserDetails 객체로 만들어서 리턴
//    private UserDetails createUserDetails(Member member) {
//        System.out.println(1);
//        System.out.println(member.getAuthority());
//        System.out.println(member.getEmail());
//        System.out.println(member.getPassword());
//        System.out.println(member.getId());
//        GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(member.getAuthority().toString());
//
//        return new User(
//                String.valueOf(member.getId()),
//                member.getPassword(),
//                Collections.singleton(grantedAuthority)
//        );
//    }
}
