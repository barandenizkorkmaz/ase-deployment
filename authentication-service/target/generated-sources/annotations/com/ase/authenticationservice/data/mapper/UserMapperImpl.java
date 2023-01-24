package com.ase.authenticationservice.data.mapper;

import com.ase.authenticationservice.data.dto.UserDto;
import com.ase.authenticationservice.data.entity.User;
import com.ase.authenticationservice.data.request.UserRequest;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-01-24T15:45:55+0100",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 17.0.5 (Private Build)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public UserDto convertToUserDto(User user) {
        if ( user == null ) {
            return null;
        }

        UserDto.UserDtoBuilder userDto = UserDto.builder();

        userDto.id( user.getId() );
        userDto.email( user.getEmail() );
        userDto.password( user.getPassword() );
        userDto.userType( user.getUserType() );

        return userDto.build();
    }

    @Override
    public List<UserDto> convertToUserDtoList(List<User> users) {
        if ( users == null ) {
            return null;
        }

        List<UserDto> list = new ArrayList<UserDto>( users.size() );
        for ( User user : users ) {
            list.add( convertToUserDto( user ) );
        }

        return list;
    }

    @Override
    public User createUser(UserRequest userRequest) {
        if ( userRequest == null ) {
            return null;
        }

        User.UserBuilder<?, ?> user = User.builder();

        user.email( userRequest.getEmail() );
        user.password( userRequest.getPassword() );
        user.userType( userRequest.getUserType() );

        return user.build();
    }

    @Override
    public void updateUser(User user, UserRequest userRequest) {
        if ( userRequest == null ) {
            return;
        }

        user.setEmail( userRequest.getEmail() );
        user.setPassword( userRequest.getPassword() );
        user.setUserType( userRequest.getUserType() );
    }
}
