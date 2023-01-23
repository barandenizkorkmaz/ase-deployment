package com.ase.ase_box.repository;

import com.ase.ase_box.data.entity.Delivery;
import com.ase.ase_box.data.enums.DeliveryStatus;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

public interface DeliveryRepository extends MongoRepository<Delivery,String> {

    List<Delivery> findAllByBoxIdAndCustomerIdIsNot(String boxId, String customerId);

    List<Delivery> findAllByIdIsNotAndBoxIdAndCustomerIdIsNot(String id, String boxId, String customerId);

    List<Delivery> findAllByDelivererId(String delivererId);

    List<Delivery> findAllByCustomerId(String customerId);

    List<Delivery> findAllByBoxIdAndCustomerIdAndDeliveryStatus(String boxId, String customerId, DeliveryStatus deliveryStatus);

    List<Delivery> findAllByBoxIdAndDelivererIdAndDeliveryStatus(String boxId, String delivererId, DeliveryStatus deliveryStatus);

    List<Delivery> findAllByCustomerIdAndDeliveryStatusIn(String customerId, List<String> deliveryStatus);
}
