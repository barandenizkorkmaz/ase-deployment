package com.ase.ase_box.data.request.box;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@Data
@NoArgsConstructor
public class UpdateBoxRequest {
    private String name;
    private String address;
}
