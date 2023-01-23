package com.ase.ase_box.data.mapper;

import com.ase.ase_box.data.dto.DeliveryDto;
import com.ase.ase_box.data.entity.Delivery;
import com.ase.ase_box.data.request.delivery.CreateDeliveryRequest;
import com.ase.ase_box.data.request.delivery.UpdateDeliveryRequest;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-01-23T22:39:01+0100",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 17.0.1 (Oracle Corporation)"
)
@Component
public class DeliveryMapperImpl implements DeliveryMapper {

    @Override
    public Delivery createDelivery(CreateDeliveryRequest createDeliveryRequest) {
        if ( createDeliveryRequest == null ) {
            return null;
        }

        Delivery delivery = new Delivery();

        delivery.setBoxId( createDeliveryRequest.getBoxId() );
        delivery.setDelivererId( createDeliveryRequest.getDelivererId() );
        delivery.setCustomerId( createDeliveryRequest.getCustomerId() );

        return delivery;
    }

    @Override
    public Delivery createDelivery(UpdateDeliveryRequest updateDeliveryRequest) {
        if ( updateDeliveryRequest == null ) {
            return null;
        }

        Delivery delivery = new Delivery();

        delivery.setBoxId( updateDeliveryRequest.getBoxId() );
        delivery.setDelivererId( updateDeliveryRequest.getDelivererId() );
        delivery.setCustomerId( updateDeliveryRequest.getCustomerId() );
        delivery.setDeliveryStatus( updateDeliveryRequest.getDeliveryStatus() );

        return delivery;
    }

    @Override
    public DeliveryDto convertToDeliveryDto(Delivery delivery) {
        if ( delivery == null ) {
            return null;
        }

        DeliveryDto deliveryDto = new DeliveryDto();

        deliveryDto.setId( delivery.getId() );
        deliveryDto.setBoxId( delivery.getBoxId() );
        deliveryDto.setDelivererId( delivery.getDelivererId() );
        deliveryDto.setCustomerId( delivery.getCustomerId() );
        deliveryDto.setDeliveryStatus( delivery.getDeliveryStatus() );

        return deliveryDto;
    }

    @Override
    public List<DeliveryDto> convertToDeliveryDtoList(List<Delivery> deliveries) {
        if ( deliveries == null ) {
            return null;
        }

        List<DeliveryDto> list = new ArrayList<DeliveryDto>( deliveries.size() );
        for ( Delivery delivery : deliveries ) {
            list.add( convertToDeliveryDto( delivery ) );
        }

        return list;
    }

    @Override
    public void updateDelivery(Delivery delivery, UpdateDeliveryRequest updateDeliveryRequest) {
        if ( updateDeliveryRequest == null ) {
            return;
        }

        delivery.setBoxId( updateDeliveryRequest.getBoxId() );
        delivery.setDelivererId( updateDeliveryRequest.getDelivererId() );
        delivery.setCustomerId( updateDeliveryRequest.getCustomerId() );
        delivery.setDeliveryStatus( updateDeliveryRequest.getDeliveryStatus() );
    }
}
