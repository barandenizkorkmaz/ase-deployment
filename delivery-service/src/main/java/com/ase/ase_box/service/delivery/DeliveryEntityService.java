package com.ase.ase_box.service.delivery;

import com.ase.ase_box.data.entity.Box;
import com.ase.ase_box.data.entity.Delivery;
import com.ase.ase_box.data.enums.DeliveryStatus;
import com.ase.ase_box.data.enums.UserType;
import com.ase.ase_box.data.request.delivery.CreateDeliveryRequest;
import com.ase.ase_box.data.request.notification.SendMailRequest;
import com.ase.ase_box.repository.DeliveryRepository;
import com.ase.ase_box.service.notification.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static com.ase.ase_box.data.mapper.DeliveryMapper.DELIVERY_MAPPER;

@Service
@RequiredArgsConstructor
public class DeliveryEntityService implements IDeliveryEntityService{


    private final DeliveryRepository deliveryRepository;
    private final NotificationService notificationService;

    @Override
    public Delivery saveDelivery(CreateDeliveryRequest createDeliveryRequest) {
        Delivery delivery =  deliveryRepository.save(DELIVERY_MAPPER.createDelivery(createDeliveryRequest));
        notificationService.sendMail(
                SendMailRequest.builder()
                        .content(delivery.getDeliveryStatus().name() + "delivery track number: " + delivery.getId())
                        .receiver(delivery.getCustomerEmail())
                        .build()
        );
        return delivery;
    }

    @Override
    public Delivery updateDelivery(Delivery delivery) {
        return deliveryRepository.save(delivery);
    }

    @Override
    public Optional<Delivery> getDeliveryById(String id) {
        return deliveryRepository.findById(id);
    }

    @Override
    public List<Delivery> getDeliveries() {
        return deliveryRepository.findAll();
    }

    @Override
    public boolean isDeliveryExists(String id) {
        return deliveryRepository.findById(id).isPresent();
    }

    @Override
    public boolean isCreateDeliveryValid(String boxId, String customerEmail) {
        return deliveryRepository.findAllByBoxIdAndCustomerEmailIsNotAndDeliveryStatusIsNot(boxId, customerEmail, DeliveryStatus.COLLECTED).isEmpty();
    }

    @Override
    public boolean isUpdateDeliveryValid(String boxId, String customerEmail) {
        return deliveryRepository.findAllByBoxIdAndCustomerEmailIsNotAndDeliveryStatusIsNot(
                        boxId, customerEmail, DeliveryStatus.COLLECTED
                )
                .isEmpty();
    }

    @Override
    public void deleteDeliveryById(String id) {
        deliveryRepository.deleteById(id);
    }

    @Override
    public List<Delivery> getDeliveriesByDelivererId(String delivererId) {
        return deliveryRepository.findAllByDelivererEmail(delivererId);
    }

    @Override
    public List<Delivery> getDeliveriesByCustomerId(String customerId) {
        return deliveryRepository.findAllByCustomerEmail(customerId);
    }

    @Override
    public List<Delivery> getActiveDeliveriesByCustomerId(String customerId) {
        String[] deliveryStatus = new String[] { DeliveryStatus.DISPATCHED.name(), DeliveryStatus.SHIPPING.name(), DeliveryStatus.DELIVERED.name() };
        return deliveryRepository.findAllByCustomerEmailAndDeliveryStatusIn(customerId, Arrays.asList(deliveryStatus));
    }

    @Override
    public List<Delivery> getPastDeliveriesByCustomerId(String customerId) {
        String[] deliveryStatus = new String[] { DeliveryStatus.COLLECTED.name() };
        return deliveryRepository.findAllByCustomerEmailAndDeliveryStatusIn(customerId, Arrays.asList(deliveryStatus));
    }

    @Override
    public boolean isBoxUnlockAuthorized(String boxId, String rfId) {
        // Note that rfid is equal to user email.
        UserType userType = getUserTypeByRfid(rfId);
        if(userType != null){
            if(userType.equals(UserType.CUSTOMER)){
                // If customer is assigned to the given box and at least one delivery is delivered, then return true.
                return !deliveryRepository.findAllByBoxIdAndCustomerEmailAndDeliveryStatus(
                        boxId,
                        rfId,
                        DeliveryStatus.DELIVERED
                ).isEmpty();
            }
            else if(userType.equals(UserType.DELIVERER)){
                // If deliverer is assigned to the given box and at least one delivery is shipping, then return true.
                return !deliveryRepository.findAllByBoxIdAndDelivererEmailAndDeliveryStatus(
                        boxId,
                        rfId,
                        DeliveryStatus.SHIPPING
                ).isEmpty();
            }
            return false;
        }
        return false;
    }

    @Override
    public UserType getUserTypeByRfid(String rfId) {
        if(!deliveryRepository.findAllByCustomerEmail(rfId).isEmpty()){
            return UserType.CUSTOMER;
        }
        else if(!deliveryRepository.findAllByDelivererEmail(rfId).isEmpty()){
            return UserType.DELIVERER;
        }
        return null;
    }

    @Override
    public boolean isDeliveryDeletableForBoxId(String boxId){
        List<Delivery> deliveries = deliveryRepository.findAllByBoxIdAndDeliveryStatusNotLike(boxId,DeliveryStatus.COLLECTED);
        return deliveries.size() == 0;
    }

    @Override
    @Transactional
    public boolean deleteAllDeliveryByBoxId(String boxId){
        List<Delivery> deliveries = deliveryRepository.findAllByBoxId(boxId);
        try {
            for (Delivery delivery :
                    deliveries) {
                deliveryRepository.deleteById(delivery.getId());
            }
            return true;
        }catch (Exception e){
            return false;
        }
    }

    @Override
    public void updateDeliveriesByLockRequest(String boxId, String rfId) throws IllegalAccessException {
        // Note that rfid is equal to user email.
        UserType userType = getUserTypeByRfid(rfId);
        List<Delivery> deliveries = new ArrayList<>();
        if(userType.equals(UserType.CUSTOMER)){
            deliveries = deliveryRepository.findAllByBoxIdAndCustomerEmailAndDeliveryStatus(
                    boxId,
                    rfId,
                    DeliveryStatus.DELIVERED
            );
            // Update delivery statuses to COLLECTED
            for (Delivery delivery:deliveries) {
                delivery.setDeliveryStatus(DeliveryStatus.COLLECTED);
                updateDelivery(delivery);
            }
        }
        else if(userType.equals(UserType.DELIVERER)){
            deliveries = deliveryRepository.findAllByBoxIdAndDelivererEmailAndDeliveryStatus(
                    boxId,
                    rfId,
                    DeliveryStatus.SHIPPING
            );
            // Update delivery statuses to DELIVERED
            for (Delivery delivery:deliveries) {
                delivery.setDeliveryStatus(DeliveryStatus.DELIVERED);
                updateDelivery(delivery);
            }
        }
        else{
            throw new IllegalAccessException();
        }
        for (Delivery delivery: deliveries) {
            notificationService.sendMail(
                    SendMailRequest.builder()
                            .content(delivery.getDeliveryStatus().name() + "delivery track number: " + delivery.getId())
                            .receiver(delivery.getCustomerEmail())
                            .build()
            );
        }
    }
}
