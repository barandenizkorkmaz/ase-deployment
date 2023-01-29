package com.ase.ase_box.data.entity;

import com.ase.ase_box.data.enums.DeliveryStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.data.mongodb.core.mapping.Document;

import org.springframework.data.annotation.Id;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.util.UUID;


@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Document("deliveries")
public class Delivery extends BaseEntity{

    @Id
    private String id = UUID.randomUUID().toString();

    private String boxId;

    private String delivererEmail;

    private String customerEmail;

    @Enumerated(EnumType.STRING)
    private DeliveryStatus deliveryStatus = DeliveryStatus.DISPATCHED;
}
