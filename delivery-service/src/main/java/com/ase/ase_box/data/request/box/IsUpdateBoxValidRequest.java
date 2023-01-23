package com.ase.ase_box.data.request.box;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class IsUpdateBoxValidRequest {
    private String name;
    private String raspberryId;
}
