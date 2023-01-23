package com.ase.ase_box.service.delivery;

import com.ase.ase_box.data.dto.DeliveryDto;
import com.ase.ase_box.data.entity.Delivery;
import com.ase.ase_box.data.request.delivery.AttemptDeliveryRequest;
import com.ase.ase_box.data.request.delivery.CreateDeliveryRequest;
import com.ase.ase_box.data.request.delivery.IsCreateDeliveryValidRequest;
import com.ase.ase_box.data.request.delivery.UpdateDeliveryRequest;
import com.ase.ase_box.data.response.delivery.CreateDeliveryResponse;
import com.ase.ase_box.data.response.delivery.DeleteDeliveryResponse;
import com.ase.ase_box.data.response.delivery.UpdateDeliveryResponse;

import java.util.List;

public interface IDeliveryCrudService {

    CreateDeliveryResponse createDelivery(CreateDeliveryRequest createDeliveryRequest);

    UpdateDeliveryResponse updateDelivery(String id, UpdateDeliveryRequest updateDeliveryRequest);

    DeleteDeliveryResponse deleteDelivery(String deliveryId);

    DeliveryDto getDelivery(String deliveryId);

    List<DeliveryDto> getDeliveries();

    List<DeliveryDto> getDeliveriesByDelivererId(String delivererId);

    List<DeliveryDto> getDeliveriesByCustomerId(String customerId);

    List<DeliveryDto> getActiveDeliveriesByCustomerId(String customerId);

    List<DeliveryDto> getPastDeliveriesByCustomerId(String customerId);

    void attemptDelivery(AttemptDeliveryRequest attemptDeliveryRequest) throws IllegalAccessException;


}
