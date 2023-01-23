package com.ase.ase_box.service.delivery;

import com.ase.ase_box.data.dto.DeliveryDto;
import com.ase.ase_box.data.entity.Delivery;
import com.ase.ase_box.data.enums.UserType;
import com.ase.ase_box.data.request.delivery.CreateDeliveryRequest;
import com.ase.ase_box.data.request.delivery.IsCreateDeliveryValidRequest;
import com.ase.ase_box.data.request.delivery.IsUpdateDeliveryValidRequest;
import com.ase.ase_box.data.request.delivery.UpdateDeliveryRequest;
import com.ase.ase_box.data.response.delivery.CreateDeliveryResponse;
import com.ase.ase_box.data.response.delivery.DeleteDeliveryResponse;
import com.ase.ase_box.data.response.delivery.UpdateDeliveryResponse;

import java.util.List;
import java.util.Optional;

public interface IDeliveryEntityService {
    Delivery saveDelivery(CreateDeliveryRequest createDeliveryRequest);

    Delivery updateDelivery(Delivery delivery);

    Optional<Delivery> getDeliveryById(String deliveryId);

    List<Delivery> getDeliveries();

    List<Delivery> getDeliveriesByDelivererId(String delivererId);

    List<Delivery> getDeliveriesByCustomerId(String customerId);

    List<Delivery> getActiveDeliveriesByCustomerId(String customerId);

    List<Delivery> getPastDeliveriesByCustomerId(String customerId);

    boolean isDeliveryExists(String deliveryId);

    boolean isCreateDeliveryValid(IsCreateDeliveryValidRequest isCreateDeliveryValidRequest);

    boolean isUpdateDeliveryValid(String id, IsUpdateDeliveryValidRequest isUpdateDeliveryValidRequest);

    void deleteDeliveryById(String id);

    boolean isBoxUnlockAuthorized(String boxId, String rfId);

    UserType getUserTypeByRfid(String rfId);

    void updateDeliveriesByLockRequest(String boxId, String rfId) throws IllegalAccessException;


}
