package com.ase.ase_box.data.dto.content;

import com.ase.ase_box.config.ErrorMessage;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public abstract class ContentDto {

    private String receiver;

    private String title;

    private String content;

    private ErrorMessage errorMessage;
}
