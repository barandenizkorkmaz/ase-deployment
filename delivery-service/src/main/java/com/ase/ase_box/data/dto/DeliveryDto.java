package com.ase.ase_box.data.dto;

import com.ase.ase_box.data.enums.DeliveryStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@Data
@NoArgsConstructor
public class DeliveryDto {
    private String id;
    private String boxId;
    private String delivererId;
    private String customerId;
    private DeliveryStatus deliveryStatus;

}
