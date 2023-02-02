package com.ase.ase_box.data.response.delivery;

import com.ase.ase_box.data.dto.DeliveryDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UpdateDeliveryResponse {
    boolean isSuccessful;
}
