package com.ase.ase_box.data.mapper;

import com.ase.ase_box.data.dto.DeliveryDto;
import com.ase.ase_box.data.entity.Box;
import com.ase.ase_box.data.entity.Delivery;
import com.ase.ase_box.data.request.box.UpdateBoxRequest;
import com.ase.ase_box.data.request.delivery.CreateDeliveryRequest;
import com.ase.ase_box.data.request.delivery.UpdateDeliveryRequest;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface DeliveryMapper {

    DeliveryMapper DELIVERY_MAPPER = Mappers.getMapper(DeliveryMapper.class);

    Delivery createDelivery(CreateDeliveryRequest createDeliveryRequest);

    Delivery createDelivery(UpdateDeliveryRequest updateDeliveryRequest);

    DeliveryDto convertToDeliveryDto(Delivery delivery);

    List<DeliveryDto> convertToDeliveryDtoList(List<Delivery> deliveries);

    void updateDelivery(@MappingTarget Delivery delivery, UpdateDeliveryRequest updateDeliveryRequest);
}
