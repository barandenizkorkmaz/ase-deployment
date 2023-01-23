package com.ase.ase_box.data.request.delivery;

import com.ase.ase_box.data.enums.DeliveryStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UpdateDeliveryRequest {
    private String boxId;

    private String delivererId;

    private String customerId;

    @Enumerated(EnumType.STRING)
    private DeliveryStatus deliveryStatus;

}
