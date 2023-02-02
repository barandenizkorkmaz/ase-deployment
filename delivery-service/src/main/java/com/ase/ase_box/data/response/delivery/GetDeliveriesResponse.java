package com.ase.ase_box.data.response.delivery;

import com.ase.ase_box.data.enums.DeliveryStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@Data
@NoArgsConstructor
public class GetDeliveriesResponse {
    private String id;
    private String boxName;
    private String delivererEmail;
    private String customerEmail;
    private DeliveryStatus deliveryStatus;
}
