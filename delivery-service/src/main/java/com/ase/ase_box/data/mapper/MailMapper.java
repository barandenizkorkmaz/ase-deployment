package com.ase.ase_box.data.mapper;

import com.ase.ase_box.data.dto.content.ContentDto;
import com.ase.ase_box.data.dto.content.MailContentDto;
import com.ase.ase_box.data.entity.Content;
import com.ase.ase_box.data.request.notification.SendMailRequest;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface MailMapper {

    MailMapper MAIL_MAPPER = Mappers.getMapper(MailMapper.class);

    MailContentDto createMailContentDto(SendMailRequest sendMailRequest);

    MailContentDto convertToMailContentDto(ContentDto contentDto);

    Content createContent(MailContentDto mailContentDto);
}
