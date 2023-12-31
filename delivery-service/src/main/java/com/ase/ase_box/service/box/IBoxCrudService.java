package com.ase.ase_box.service.box;

import com.ase.ase_box.data.dto.BoxDto;
import com.ase.ase_box.data.request.box.BoxRequest;
import com.ase.ase_box.data.request.box.CreateBoxRequest;
import com.ase.ase_box.data.request.box.UpdateBoxRequest;
import com.ase.ase_box.data.response.box.CreateBoxResponse;
import com.ase.ase_box.data.response.box.DeleteBoxResponse;
import com.ase.ase_box.data.response.box.UpdateBoxResponse;

import java.util.List;

public interface IBoxCrudService {

    CreateBoxResponse createBox(CreateBoxRequest createBoxRequest) throws Exception;

    UpdateBoxResponse updateBox(String id, UpdateBoxRequest updateBoxRequest) throws Exception;

    DeleteBoxResponse deleteBox(String id) throws Exception;

    BoxDto getBoxById(String boxId);

    List<BoxDto> getAllBoxes();

    List<BoxDto> getBoxesByDelivererEmail(String email) throws Exception;

    void unlockBox(String id, BoxRequest unlockBoxRequest) throws IllegalAccessException;

    void lockBox(String id, BoxRequest lockRequest) throws IllegalAccessException;
}
