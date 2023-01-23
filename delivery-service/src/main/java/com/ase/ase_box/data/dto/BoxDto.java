package com.ase.ase_box.data.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@Data
@NoArgsConstructor
public class BoxDto {
    private String id;
    private String address;
    private String raspberryId;
    private String name;
}
