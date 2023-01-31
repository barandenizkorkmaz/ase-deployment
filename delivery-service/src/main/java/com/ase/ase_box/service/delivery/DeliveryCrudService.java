package com.ase.ase_box.service.delivery;

import java.util.ArrayList;
import java.util.List;

import com.ase.ase_box.data.dto.DeliveryDto;
import com.ase.ase_box.data.entity.Box;
import com.ase.ase_box.data.entity.Delivery;
import com.ase.ase_box.data.enums.DeliveryStatus;
import com.ase.ase_box.data.request.delivery.*;
import com.ase.ase_box.data.request.notification.SendMailRequest;
import com.ase.ase_box.data.response.delivery.CreateDeliveryResponse;
import com.ase.ase_box.data.response.delivery.DeleteDeliveryResponse;
import com.ase.ase_box.data.response.delivery.GetDeliveriesResponse;
import com.ase.ase_box.data.response.delivery.UpdateDeliveryResponse;
import com.ase.ase_box.service.box.BoxEntityService;
import com.ase.ase_box.service.notification.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import static com.ase.ase_box.data.mapper.DeliveryMapper.DELIVERY_MAPPER;

@Service
@RequiredArgsConstructor
public class DeliveryCrudService implements IDeliveryCrudService{
    private final DeliveryEntityService deliveryEntityService;
    private final NotificationService notificationService;
    private final BoxEntityService boxEntityService;

    @Override
    public CreateDeliveryResponse createDelivery(CreateDeliveryRequest createDeliveryRequest) throws Exception {
        boolean isBoxExists = boxEntityService.isBoxExists(createDeliveryRequest.getBoxId());
        boolean isValid = deliveryEntityService.isCreateDeliveryValid(
                createDeliveryRequest.getBoxId(),
                createDeliveryRequest.getCustomerEmail()
        );
        if(isBoxExists && isValid){
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
        boolean isBoxExists = boxEntityService.isBoxExists(updateDeliveryRequest.getBoxId());
        boolean isValid = deliveryEntityService.isUpdateDeliveryValid(
                updateDeliveryRequest.getBoxId(),
                updateDeliveryRequest.getCustomerEmail()
        );
        if(isBoxExists && isValid){
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
    public DeliveryDto getDeliveryForCustomer(String deliveryId){
        Delivery delivery = deliveryEntityService.getDeliveryById(deliveryId)
                .orElseThrow(IllegalArgumentException::new);
        Authentication authContext = SecurityContextHolder.getContext().getAuthentication();
        if(delivery.getCustomerEmail().equals(authContext.getPrincipal().toString())){
            return DELIVERY_MAPPER.convertToDeliveryDto(delivery);
        }else{
            throw new IllegalArgumentException();
        }
    }


    @Override
    public List<DeliveryDto> getDeliveries() {
        return DELIVERY_MAPPER.convertToDeliveryDtoList(deliveryEntityService.getDeliveries());
    }

    @Override
    public List<GetDeliveriesResponse> getDeliveriesByDelivererId(String delivererId) {
        List<Delivery> deliveries = deliveryEntityService.getDeliveriesByDelivererId(delivererId);
        return convertDeliveryListToGetDeliveryResponseList(deliveries);
    }

    @Override
    public List<GetDeliveriesResponse> getDeliveriesByCustomerId(String customerId) {
        List<Delivery> deliveries = deliveryEntityService.getDeliveriesByCustomerId(customerId);
        return convertDeliveryListToGetDeliveryResponseList(deliveries);
    }

    private List<GetDeliveriesResponse> convertDeliveryListToGetDeliveryResponseList(List<Delivery> deliveries){
        List<GetDeliveriesResponse> getDeliveriesResponses = new ArrayList<>();
        for (Delivery delivery :
                deliveries) {
            Box box = boxEntityService.getBoxById(delivery.getBoxId()).orElseThrow(IllegalArgumentException::new);
            GetDeliveriesResponse getDeliveriesResponse = DELIVERY_MAPPER.convertToGetDeliveryResponse(delivery);
            getDeliveriesResponse.setBoxName(box.getName());
            getDeliveriesResponses.add(getDeliveriesResponse);
        }
        return getDeliveriesResponses;
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
            Delivery responseFromDelivery = deliveryEntityService.updateDelivery(delivery);
            notificationService.sendMail(
                    SendMailRequest.builder()
                            .content(responseFromDelivery.getDeliveryStatus().name() + "delivery track number: " + responseFromDelivery.getId())
                            .receiver(delivery.getCustomerEmail())
                            .build()
            );
        }
        else {
            throw new IllegalAccessException();
        }
    }
}
