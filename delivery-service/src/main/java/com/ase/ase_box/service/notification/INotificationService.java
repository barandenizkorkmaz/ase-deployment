package com.ase.ase_box.service.notification;

import com.ase.ase_box.data.dto.content.MailContentDto;
import com.ase.ase_box.data.request.notification.SendMailRequest;

public interface INotificationService {

    void sendMail(SendMailRequest sendMailRequest);
}
