package pl.readyTask.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import pl.readyTask.entity.User;
import pl.readyTask.exception.NoDataFoundException;
import pl.readyTask.repository.UserRepository;

@Service
@AllArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public User getById(Long id){
        return userRepository.findById(id).orElseThrow(() -> new NoDataFoundException("user", id));
    }
}
