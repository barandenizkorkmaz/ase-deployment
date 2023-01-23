package com.ase.ase_box.service.delivery;

import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import com.ase.ase_box.data.dto.DeliveryDto;
import com.ase.ase_box.data.entity.Delivery;
import com.ase.ase_box.data.enums.DeliveryStatus;
import com.ase.ase_box.data.request.delivery.*;
import com.ase.ase_box.data.response.delivery.CreateDeliveryResponse;
import com.ase.ase_box.data.response.delivery.DeleteDeliveryResponse;
import com.ase.ase_box.data.response.delivery.UpdateDeliveryResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import static com.ase.ase_box.data.mapper.BoxMapper.BOX_MAPPER;
import static com.ase.ase_box.data.mapper.DeliveryMapper.DELIVERY_MAPPER;

@Service
@RequiredArgsConstructor
public class DeliveryCrudService implements IDeliveryCrudService{
    private final DeliveryEntityService deliveryEntityService;

    @Override
    public CreateDeliveryResponse createDelivery(CreateDeliveryRequest createDeliveryRequest) {
        boolean isValid = deliveryEntityService.isCreateDeliveryValid(
                IsCreateDeliveryValidRequest.builder()
                        .boxId(createDeliveryRequest.getBoxId())
                        .customerId(createDeliveryRequest.getCustomerId())
                        .build()
        );
        if(isValid){
            deliveryEntityService.saveDelivery(createDeliveryRequest);
        }
        return CreateDeliveryResponse
                .builder()
                .isSuccessful(isValid)
                .build();
    }

    @Override
    public DeleteDeliveryResponse deleteDelivery(String id) {
        boolean isSuccessful = false;
        if(deliveryEntityService.isDeliveryExists(id)){
            deliveryEntityService.deleteDeliveryById(id);
            isSuccessful = true;
        }
        return DeleteDeliveryResponse
                .builder()
                .isSuccessful(isSuccessful)
                .build();
    }

    @Override
    public UpdateDeliveryResponse updateDelivery(String id, UpdateDeliveryRequest updateDeliveryRequest) {
        boolean isValid = deliveryEntityService.isUpdateDeliveryValid(
                id,
                IsUpdateDeliveryValidRequest.builder()
                        .boxId(updateDeliveryRequest.getBoxId())
                        .customerId(updateDeliveryRequest.getCustomerId())
                        .build()
        );
        if(isValid){
            Delivery delivery = deliveryEntityService.getDeliveryById(id)
                    .orElseThrow(IllegalArgumentException::new);
            DELIVERY_MAPPER.updateDelivery(delivery, updateDeliveryRequest);
            deliveryEntityService.updateDelivery(delivery);
        }
        return UpdateDeliveryResponse
                .builder()
                .isSuccessful(isValid)
                .build();
    }

    @Override
    public DeliveryDto getDelivery(String id) {
        Delivery delivery = deliveryEntityService.getDeliveryById(id)
                .orElseThrow(IllegalArgumentException::new);
        return DELIVERY_MAPPER.convertToDeliveryDto(delivery);
    }

    @Override
    public List<DeliveryDto> getDeliveries() {
        return DELIVERY_MAPPER.convertToDeliveryDtoList(deliveryEntityService.getDeliveries());
    }

    @Override
    public List<DeliveryDto> getDeliveriesByDelivererId(String delivererId) {
        return DELIVERY_MAPPER.convertToDeliveryDtoList(deliveryEntityService.getDeliveriesByDelivererId(delivererId));
    }

    @Override
    public List<DeliveryDto> getDeliveriesByCustomerId(String customerId) {
        return DELIVERY_MAPPER.convertToDeliveryDtoList(deliveryEntityService.getDeliveriesByCustomerId(customerId));
    }

    @Override
    public List<DeliveryDto> getActiveDeliveriesByCustomerId(String customerId) {
        return DELIVERY_MAPPER.convertToDeliveryDtoList(deliveryEntityService.getActiveDeliveriesByCustomerId(customerId));
    }

    @Override
    public List<DeliveryDto> getPastDeliveriesByCustomerId(String customerId) {
        return DELIVERY_MAPPER.convertToDeliveryDtoList(deliveryEntityService.getPastDeliveriesByCustomerId(customerId));
    }

    @Override
    public void attemptDelivery(AttemptDeliveryRequest attemptDeliveryRequest) throws IllegalAccessException {
        Delivery delivery = deliveryEntityService.getDeliveryById(attemptDeliveryRequest.getDeliveryId())
                .orElseThrow(IllegalArgumentException::new);
        if(delivery.getDelivererId().equals(attemptDeliveryRequest.getCandidateDelivererId()) && delivery.getDeliveryStatus().equals(DeliveryStatus.DISPATCHED)){
            delivery.setDeliveryStatus(DeliveryStatus.SHIPPING);
            deliveryEntityService.updateDelivery(delivery);
        }
        else {
            throw new IllegalAccessException();
        }
    }
}
