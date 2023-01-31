package com.ase.ase_box.service.notification.content.factory;

import com.ase.ase_box.config.ErrorMessage;
import com.ase.ase_box.config.StaticString;
import com.ase.ase_box.data.dto.content.ContentDto;
import com.ase.ase_box.data.dto.content.MailContentDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class MailContentFactory implements ContentFactory{

    @Override
    public ContentDto produceContent(ContentDto content) {
        try {
            MailContentDto mailContentDto = (MailContentDto) content;
            String mailTemplate = StaticString.mailContent;
            mailContentDto.setContent(StaticString.replaceString(mailTemplate,mailContentDto.getContent()));
            return mailContentDto;
        }catch (ClassCastException | NullPointerException castException){
            return MailContentDto.builder().errorMessage(ErrorMessage.WrongContent).build();
        }
    }

}
