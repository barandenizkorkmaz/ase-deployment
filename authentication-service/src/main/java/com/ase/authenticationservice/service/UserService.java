package com.ase.authenticationservice.service;

import com.ase.authenticationservice.data.dto.UserDto;
import com.ase.authenticationservice.data.entity.User;
import com.ase.authenticationservice.data.entity.UserType;
import com.ase.authenticationservice.data.request.UserRequest;
import com.ase.authenticationservice.security.CustomUserDetails;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;

import javax.persistence.EntityExistsException;
import java.util.List;

import static com.ase.authenticationservice.data.mapper.UserMapper.USER_MAPPER;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService{

    @Autowired
    private IUserEntityService userEntityService;

    @Autowired
    private PasswordEncoder bcryptPasswordEncoder;

    @Override
    public void createUser(UserRequest registerRequest) {
        User user = USER_MAPPER.createUser(registerRequest);
        user.setPassword(bcryptPasswordEncoder.encode(user.getPassword()));
        userEntityService.createUser(user);
    }

    @Override
    public void updateUser(String email, UserRequest updateRequest){
        User user = userEntityService.getUser(email);
        if(!email.equals(updateRequest.getEmail()) && userEntityService.isUserExists(updateRequest.getEmail())){
            throw new EntityExistsException("User with email " + updateRequest.getEmail() + "already exists");
        }
        USER_MAPPER.updateUser(user, updateRequest);
        user.setPassword(bcryptPasswordEncoder.encode(updateRequest.getPassword()));
        userEntityService.deleteUser(email);
        userEntityService.updateUser(user);
    }

    @Override
    public List<UserDto> getUsers() {
        return USER_MAPPER.convertToUserDtoList(userEntityService.getUsers());
    }

    private User getCurrentJwtUserDetails() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User jwtUserDetails = null;
        if (authentication != null && authentication.getPrincipal() != null){
            UserType userType = UserType.valueOf(authentication.getAuthorities().toArray()[0].toString());
            jwtUserDetails = User.builder().userType(userType).email(authentication.getPrincipal().toString()).build();
        }
        return jwtUserDetails;
    }

    @Override
    public UserDto getUser(String email) {
        User user = userEntityService.getUser(email);
        User customUserDetails = getCurrentJwtUserDetails();
        if(!customUserDetails.getEmail().equals(email) && (customUserDetails.getUserType() != UserType.DISPATCHER)){
            throw new NotFoundException("User not found");
        }
        return USER_MAPPER.convertToUserDto(user);
    }

    @Override
    public List<String> getEmailsByUserType(String userType) {
        return userEntityService.getEmailsByUserType(userType);
    }

    @Override
    public void deleteUser(String email) {
        userEntityService.deleteUser(email);
    }

}
