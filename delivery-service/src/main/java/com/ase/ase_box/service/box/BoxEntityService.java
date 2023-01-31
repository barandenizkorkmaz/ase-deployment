package com.ase.ase_box.service.box;

import com.ase.ase_box.data.entity.Box;
import com.ase.ase_box.data.entity.Delivery;
import com.ase.ase_box.repository.BoxRepository;
import com.ase.ase_box.repository.DeliveryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BoxEntityService implements IBoxEntityService {

    private final BoxRepository boxRepository;
    private final DeliveryRepository deliveryRepository;

    public Box createBox(Box box) {
        return boxRepository.save(box);
    }

    public void deleteBoxById(String boxId) {
        boxRepository.deleteById(boxId);
    }

    public Box updateBox(Box box) {
        return boxRepository.save(box);
    }

    public Optional<Box> getBoxById(String boxId) {
        return boxRepository.findById(boxId);
    }

    public List<Box> getAllBoxes() {
        return boxRepository.findAll();
    }

    public boolean isBoxExists(String id) {
        return boxRepository.findById(id).isPresent();
    }

    @Transactional
    public List<Box> getAllBoxesByDelivererEmail(String email) throws Exception {
        List<String> boxIds = deliveryRepository.findAllByDelivererEmail(email).stream().map(Delivery::getBoxId).toList();
        List<Box> boxes = new ArrayList<>();
        for (String boxId: boxIds) {
            boxes.add(boxRepository.findById(boxId)
                    .orElseThrow(Exception::new));
        }
        return boxes;
    }

    @Override
    public boolean isCreateBoxValid(String name) {
        return boxRepository.findAllByName(name).isEmpty();
    }

    @Override
    public boolean isUpdateBoxValid(String id, String name) {
        return boxRepository.findAllByIdIsNotAndName(id, name).isEmpty();

    }
}
