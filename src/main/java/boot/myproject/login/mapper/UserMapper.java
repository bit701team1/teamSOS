package boot.myproject.login.mapper;

import boot.myproject.login.dto.UserDto;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    public UserDto getUserInfo(String insertedId);
}
