package com.ase.ase_box.data.entity;

import com.ase.ase_box.config.ErrorMessage;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.util.UUID;


// TODO: 21.12.2022 Use as log table
@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Document("notification")
public class Content {

    private String id = UUID.randomUUID().toString();

    private String receiver;

    private String title;

    private String content;

    private ErrorMessage errorMessage;

    @Enumerated(EnumType.STRING)
    private ContentChannel contentChannel;
}
