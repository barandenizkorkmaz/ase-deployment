package com.ase.ase_box.data.mapper;

import com.ase.ase_box.data.dto.BoxDto;
import com.ase.ase_box.data.entity.Box;
import com.ase.ase_box.data.request.box.CreateBoxRequest;
import com.ase.ase_box.data.request.box.UpdateBoxRequest;
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
public class BoxMapperImpl implements BoxMapper {

    @Override
    public Box createBox(CreateBoxRequest createBoxRequest) {
        if ( createBoxRequest == null ) {
            return null;
        }

        Box box = new Box();

        box.setAddress( createBoxRequest.getAddress() );
        box.setRaspberryId( createBoxRequest.getRaspberryId() );
        box.setName( createBoxRequest.getName() );

        return box;
    }

    @Override
    public BoxDto convertToBoxDto(Box box) {
        if ( box == null ) {
            return null;
        }

        BoxDto boxDto = new BoxDto();

        boxDto.setId( box.getId() );
        boxDto.setAddress( box.getAddress() );
        boxDto.setRaspberryId( box.getRaspberryId() );
        boxDto.setName( box.getName() );

        return boxDto;
    }

    @Override
    public List<BoxDto> convertToBoxDtoList(List<Box> boxes) {
        if ( boxes == null ) {
            return null;
        }

        List<BoxDto> list = new ArrayList<BoxDto>( boxes.size() );
        for ( Box box : boxes ) {
            list.add( convertToBoxDto( box ) );
        }

        return list;
    }

    @Override
    public void updateBox(Box box, UpdateBoxRequest updateBoxRequest) {
        if ( updateBoxRequest == null ) {
            return;
        }

        box.setAddress( updateBoxRequest.getAddress() );
        box.setRaspberryId( updateBoxRequest.getRaspberryId() );
        box.setName( updateBoxRequest.getName() );
    }
}
