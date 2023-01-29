package com.ase.ase_box.service.box;

import com.ase.ase_box.data.dto.BoxDto;
import com.ase.ase_box.data.entity.Box;
import com.ase.ase_box.data.request.box.*;
import com.ase.ase_box.data.response.box.CreateBoxResponse;
import com.ase.ase_box.data.response.box.DeleteBoxResponse;
import com.ase.ase_box.data.response.box.UpdateBoxResponse;
import com.ase.ase_box.service.delivery.IDeliveryEntityService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.ase.ase_box.data.mapper.BoxMapper.BOX_MAPPER;

@Service
@RequiredArgsConstructor
public class BoxCrudService implements IBoxCrudService {

    private final IBoxEntityService boxEntityService;
    private final IDeliveryEntityService deliveryEntityService;

    @Override
    public CreateBoxResponse createBox(CreateBoxRequest createBoxRequest) throws Exception {
        boolean isValid = boxEntityService.isCreateBoxValid(createBoxRequest.getName());
        if(isValid){
            boxEntityService.createBox(BOX_MAPPER.createBox(createBoxRequest));
            return CreateBoxResponse
                    .builder()
                    .isSuccessful(isValid)
                    .build();
        }
        else throw new Exception();
    }

    public List<BoxDto> getAllBoxes() {
        return BOX_MAPPER.convertToBoxDtoList(boxEntityService.getAllBoxes());
    }

    public BoxDto getBoxById(String boxId) {
        return BOX_MAPPER.convertToBoxDto(
                boxEntityService.getBoxById(boxId)
                        .orElseThrow(IllegalArgumentException::new)
        );
    }

    @Override
    public DeleteBoxResponse deleteBox(String id) throws Exception {
        boolean isSuccessful = false;
        if(boxEntityService.isBoxExists(id)){
            boxEntityService.deleteBoxById(id);
            isSuccessful = true;
        }else{
            throw new Exception();
        }
        return DeleteBoxResponse
                .builder()
                .isSuccessful(isSuccessful)
                .build();
    }

    public List<BoxDto> getBoxesByDelivererEmail(String email) throws Exception {
        return BOX_MAPPER.convertToBoxDtoList(boxEntityService.getAllBoxesByDelivererEmail(email));
    }

    @Override
    public UpdateBoxResponse updateBox(String id, UpdateBoxRequest updateBoxRequest) throws Exception {
        boolean isValid = boxEntityService.isUpdateBoxValid(id, updateBoxRequest.getName());
        if(isValid){
            Box box = boxEntityService.getBoxById(id)
                    .orElseThrow(IllegalArgumentException::new);
            BOX_MAPPER.updateBox(box, updateBoxRequest);
            boxEntityService.updateBox(box);
        }else{
            throw new Exception();
        }
        return UpdateBoxResponse
                .builder()
                .isSuccessful(isValid)
                .build();
    }

    @Override
    public void unlockBox(String id, BoxRequest unlockBoxRequest) throws IllegalAccessException {
        boolean isAuthorized = deliveryEntityService.isBoxUnlockAuthorized(id, unlockBoxRequest.getRfid());
        if (!isAuthorized){
            throw new IllegalAccessException();
        }
    }

    @Override
    public void lockBox(String id, BoxRequest lockRequest) throws IllegalAccessException {
        deliveryEntityService.updateDeliveriesByLockRequest(id, lockRequest.getRfid());
    }
}
