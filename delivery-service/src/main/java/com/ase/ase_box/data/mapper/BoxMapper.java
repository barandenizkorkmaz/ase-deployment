package com.ase.ase_box.data.mapper;

import com.ase.ase_box.data.dto.BoxDto;
import com.ase.ase_box.data.entity.Box;
import com.ase.ase_box.data.request.box.CreateBoxRequest;
import com.ase.ase_box.data.request.box.UpdateBoxRequest;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface BoxMapper {

    BoxMapper BOX_MAPPER = Mappers.getMapper(BoxMapper.class);

    Box createBox(CreateBoxRequest createBoxRequest);

    BoxDto convertToBoxDto(Box box);

    List<BoxDto> convertToBoxDtoList(List<Box> boxes);

    void updateBox(@MappingTarget Box box, UpdateBoxRequest updateBoxRequest);
}
