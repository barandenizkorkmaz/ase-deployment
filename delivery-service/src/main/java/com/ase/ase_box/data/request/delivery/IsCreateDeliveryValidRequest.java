package com.ase.ase_box.data.request.delivery;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class IsCreateDeliveryValidRequest {
    private String boxId;
    private String customerId;
}
