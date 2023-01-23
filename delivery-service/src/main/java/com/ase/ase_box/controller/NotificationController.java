package com.ase.ase_box.controller;

import com.ase.ase_box.data.dto.content.MailContentDto;
import com.ase.ase_box.data.request.notification.SendMailRequest;
import com.ase.ase_box.service.notification.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("notification")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @PostMapping("test")
    public void testNotificationServerByMail(@RequestBody SendMailRequest sendMailRequest){
        notificationService.sendMail(sendMailRequest);
    }
}
