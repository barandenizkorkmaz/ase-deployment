package com.ase.ase_box.service.delivery;

import java.util.List;

import com.ase.ase_box.data.dto.DeliveryDto;
import com.ase.ase_box.data.entity.Delivery;
import com.ase.ase_box.data.enums.DeliveryStatus;
import com.ase.ase_box.data.request.delivery.*;
import com.ase.ase_box.data.response.delivery.CreateDeliveryResponse;
import com.ase.ase_box.data.response.delivery.DeleteDeliveryResponse;
import com.ase.ase_box.data.response.delivery.UpdateDeliveryResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import static com.ase.ase_box.data.mapper.DeliveryMapper.DELIVERY_MAPPER;

@Service
@RequiredArgsConstructor
public class DeliveryCrudService implements IDeliveryCrudService{
    private final DeliveryEntityService deliveryEntityService;

    @Override
    public CreateDeliveryResponse createDelivery(CreateDeliveryRequest createDeliveryRequest) throws Exception {
        boolean isValid = deliveryEntityService.isCreateDeliveryValid(
                createDeliveryRequest.getBoxId(),
                createDeliveryRequest.getCustomerEmail()
        );
        if(isValid){
            deliveryEntityService.saveDelivery(createDeliveryRequest);
        }else{
            throw new Exception();
        }
        return CreateDeliveryResponse
                .builder()
                .isSuccessful(isValid)
                .build();
    }

    @Override
    public DeleteDeliveryResponse deleteDelivery(String id) throws Exception {
        boolean isSuccessful = false;
        if(deliveryEntityService.isDeliveryExists(id)){
            deliveryEntityService.deleteDeliveryById(id);
            isSuccessful = true;
        }else{
            throw new Exception();
        }
        return DeleteDeliveryResponse
                .builder()
                .isSuccessful(isSuccessful)
                .build();
    }

    @Override
    public UpdateDeliveryResponse updateDelivery(String id, UpdateDeliveryRequest updateDeliveryRequest) throws Exception {
        boolean isValid = deliveryEntityService.isUpdateDeliveryValid(
                updateDeliveryRequest.getBoxId(),
                updateDeliveryRequest.getCustomerEmail()
        );
        if(isValid){
            Delivery delivery = deliveryEntityService.getDeliveryById(id)
                    .orElseThrow(IllegalArgumentException::new);
            DELIVERY_MAPPER.updateDelivery(delivery, updateDeliveryRequest);
            deliveryEntityService.updateDelivery(delivery);
        }else{
            throw new Exception();
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
    public void attemptDelivery(String id, AttemptDeliveryRequest attemptDeliveryRequest) throws IllegalAccessException {
        Delivery delivery = deliveryEntityService.getDeliveryById(id)
                .orElseThrow(IllegalArgumentException::new);
        if(delivery.getDelivererEmail().equals(attemptDeliveryRequest.getCandidateDelivererEmail()) && delivery.getDeliveryStatus().equals(DeliveryStatus.DISPATCHED)){
            delivery.setDeliveryStatus(DeliveryStatus.SHIPPING);
            deliveryEntityService.updateDelivery(delivery);
        }
        else {
            throw new IllegalAccessException();
        }
    }
}
