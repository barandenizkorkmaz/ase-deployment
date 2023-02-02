package com.ase.ase_box.service.notification;

import com.ase.ase_box.data.dto.content.MailContentDto;
import com.ase.ase_box.data.entity.ContentChannel;
import com.ase.ase_box.data.request.notification.SendMailRequest;
import com.ase.ase_box.repository.ContentChannelRepository;
import com.ase.ase_box.service.notification.content.factory.MailContentFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import static com.ase.ase_box.data.mapper.MailMapper.MAIL_MAPPER;

@RequiredArgsConstructor
@Service
public class NotificationService implements INotificationService{

    private final MailContentFactory mailContentFactory;
    private final ContentChannelRepository contentChannelRepository;
    private final JavaMailSender javaMailSender;

    @Override
    public void sendMail(SendMailRequest sendMailRequest) {
        MailContentDto mailContentDto = MAIL_MAPPER.createMailContentDto(sendMailRequest);
        MailContentDto mailToSend =  MAIL_MAPPER.convertToMailContentDto(mailContentFactory.produceContent(mailContentDto));
        mailToSend.setSender(mailContentDto.getSender());
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("noreply@ase.com");
        message.setTo(mailToSend.getReceiver());
        message.setSubject(mailToSend.getTitle());
        message.setText(mailToSend.getContent());
        javaMailSender.send(message);
        contentChannelRepository.save(MAIL_MAPPER.createContent(mailToSend));
    }
}
