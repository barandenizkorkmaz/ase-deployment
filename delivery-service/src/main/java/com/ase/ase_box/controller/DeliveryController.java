package com.ase.ase_box.controller;

import com.ase.ase_box.data.dto.DeliveryDto;
import com.ase.ase_box.data.entity.Delivery;
import com.ase.ase_box.data.request.delivery.CreateDeliveryRequest;
import com.ase.ase_box.data.request.delivery.AttemptDeliveryRequest;
import com.ase.ase_box.data.request.delivery.UpdateDeliveryRequest;
import com.ase.ase_box.data.response.delivery.CreateDeliveryResponse;
import com.ase.ase_box.data.response.delivery.DeleteDeliveryResponse;
import com.ase.ase_box.data.response.delivery.GetDeliveriesResponse;
import com.ase.ase_box.data.response.delivery.UpdateDeliveryResponse;
import com.ase.ase_box.service.delivery.DeliveryCrudService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/delivery")
@RequiredArgsConstructor
@RestController
public class DeliveryController {

    private final DeliveryCrudService deliveryCrudService;

    @GetMapping("")
    public ResponseEntity<HttpStatus> startSession(){
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/create")  // TODO: 25.01.2023 Distpacher
    @PreAuthorize("hasAuthority('DISPATCHER')")
    public ResponseEntity<CreateDeliveryResponse> createDelivery(@RequestBody CreateDeliveryRequest createDeliveryRequest){
        try {
            return ResponseEntity.ok(deliveryCrudService.createDelivery(createDeliveryRequest));
        }catch (Exception exception){
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/list/{id}")  // TODO: 25.01.2023 Distpacher
    @PreAuthorize("hasAuthority('DISPATCHER')")
    public ResponseEntity<DeliveryDto> getDelivery(@PathVariable("id") String id){
        return ResponseEntity.ok(deliveryCrudService.getDelivery(id));
    }

    @GetMapping("{id}")
    @PreAuthorize("hasAuthority('CUSTOMER')")
    public ResponseEntity<String> getDeliveryById(@PathVariable("id") String id){
        DeliveryDto deliveryDto = deliveryCrudService.getDeliveryForCustomer(id);
        return ResponseEntity.ok(deliveryDto.getDeliveryStatus().name());
    }

    @GetMapping("/list/dispatcher/all")  // TODO: 25.01.2023 Distpacher
    @PreAuthorize("hasAuthority('DISPATCHER')")
    public ResponseEntity<List<DeliveryDto>> getDeliveries(){
        return ResponseEntity.ok(deliveryCrudService.getDeliveries());
    }

    @PostMapping("/delete/{id}")  // TODO: 25.01.2023 Distpacher
    @PreAuthorize("hasAuthority('DISPATCHER')")
    public ResponseEntity<DeleteDeliveryResponse> deleteDelivery(@PathVariable("id") String id){
        try{
            return ResponseEntity.ok(deliveryCrudService.deleteDelivery(id));
        }catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/update/{id}")  // TODO: 25.01.2023 Distpacher
    @PreAuthorize("hasAuthority('DISPATCHER')")
    public ResponseEntity<UpdateDeliveryResponse> updateDelivery(@PathVariable("id") String id, @RequestBody UpdateDeliveryRequest updateDeliveryRequest){
        try {
            return ResponseEntity.ok(deliveryCrudService.updateDelivery(id, updateDeliveryRequest));
        }catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("list/deliverer/{delivererId}")  // TODO: 25.01.2023 Delivere
    @PreAuthorize("hasAuthority('DELIVERER')")
    public ResponseEntity<List<GetDeliveriesResponse>> getDeliveriesByDeliverer(@PathVariable("delivererId") String delivererId){
        return ResponseEntity.ok(deliveryCrudService.getDeliveriesByDelivererId(delivererId));
    }

    @GetMapping("list/customer/all/{customerId}")  // TODO: 25.01.2023 Customer
    @PreAuthorize("hasAuthority('CUSTOMER')")
    public ResponseEntity<List<GetDeliveriesResponse>> getDeliveriesByCustomer(@PathVariable("customerId") String customerId){
        return ResponseEntity.ok(deliveryCrudService.getDeliveriesByCustomerId(customerId));
    }

    @GetMapping("list/customer/active/{customerId}")  // TODO: 25.01.2023 Customer
    @PreAuthorize("hasAuthority('CUSTOMER')")
    public ResponseEntity<List<DeliveryDto>> getActiveDeliveriesByCustomer(@PathVariable("customerId") String customerId){
        return ResponseEntity.ok(deliveryCrudService.getActiveDeliveriesByCustomerId(customerId));
    }

    @GetMapping("list/customer/past/{customerId}")  // TODO: 25.01.2023 Customer
    @PreAuthorize("hasAuthority('CUSTOMER')")
    public ResponseEntity<List<DeliveryDto>> getPastDeliveriesByCustomer(@PathVariable("customerId") String customerId){
        return ResponseEntity.ok(deliveryCrudService.getPastDeliveriesByCustomerId(customerId));
    }

    @PostMapping("/attempt/{id}")   // TODO: 25.01.2023 Deliverer
    @PreAuthorize("hasAuthority('DELIVERER')")
    public ResponseEntity<HttpStatus> attemptDelivery(@PathVariable("id") String id, @RequestBody AttemptDeliveryRequest attemptDeliveryRequest){
        try{
            deliveryCrudService.attemptDelivery(id, attemptDeliveryRequest);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (IllegalAccessException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


}
