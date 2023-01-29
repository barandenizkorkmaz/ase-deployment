package com.ase.ase_box.repository;

import com.ase.ase_box.data.entity.Delivery;
import com.ase.ase_box.data.enums.DeliveryStatus;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface DeliveryRepository extends MongoRepository<Delivery,String> {

    List<Delivery> findAllByDelivererEmail(String delivererEmail);

    List<Delivery> findAllByCustomerEmail(String customerEmail);

    List<Delivery> findAllByBoxIdAndCustomerEmailIsNotAndDeliveryStatusIsNot(String boxId, String customerEmail, DeliveryStatus deliveryStatus);

    List<Delivery> findAllByBoxIdAndCustomerEmailAndDeliveryStatus(String boxId, String customerEmail, DeliveryStatus deliveryStatus);

    List<Delivery> findAllByBoxIdAndDelivererEmailAndDeliveryStatus(String boxId, String delivererEmail, DeliveryStatus deliveryStatus);

    List<Delivery> findAllByCustomerEmailAndDeliveryStatusIn(String customerEmail, List<String> deliveryStatus);
}
