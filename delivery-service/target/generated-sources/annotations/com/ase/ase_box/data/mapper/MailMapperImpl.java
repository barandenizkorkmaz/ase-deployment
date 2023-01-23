package com.ase.ase_box.data.mapper;

import com.ase.ase_box.data.dto.content.ContentDto;
import com.ase.ase_box.data.dto.content.MailContentDto;
import com.ase.ase_box.data.entity.Content;
import com.ase.ase_box.data.request.notification.SendMailRequest;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-01-23T22:39:01+0100",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 17.0.1 (Oracle Corporation)"
)
@Component
public class MailMapperImpl implements MailMapper {

    @Override
    public MailContentDto createMailContentDto(SendMailRequest sendMailRequest) {
        if ( sendMailRequest == null ) {
            return null;
        }

        MailContentDto mailContentDto = new MailContentDto();

        mailContentDto.setReceiver( sendMailRequest.getReceiver() );
        mailContentDto.setTitle( sendMailRequest.getTitle() );
        mailContentDto.setContent( sendMailRequest.getContent() );
        mailContentDto.setSender( sendMailRequest.getSender() );

        return mailContentDto;
    }

    @Override
    public MailContentDto convertToMailContentDto(ContentDto contentDto) {
        if ( contentDto == null ) {
            return null;
        }

        MailContentDto mailContentDto = new MailContentDto();

        mailContentDto.setReceiver( contentDto.getReceiver() );
        mailContentDto.setTitle( contentDto.getTitle() );
        mailContentDto.setContent( contentDto.getContent() );
        mailContentDto.setErrorMessage( contentDto.getErrorMessage() );

        return mailContentDto;
    }

    @Override
    public Content createContent(MailContentDto mailContentDto) {
        if ( mailContentDto == null ) {
            return null;
        }

        Content content = new Content();

        content.setReceiver( mailContentDto.getReceiver() );
        content.setTitle( mailContentDto.getTitle() );
        content.setContent( mailContentDto.getContent() );
        content.setErrorMessage( mailContentDto.getErrorMessage() );

        return content;
    }
}
