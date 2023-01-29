package com.ase.ase_box.service.box;

import com.ase.ase_box.data.entity.Box;

import java.util.List;
import java.util.Optional;

public interface IBoxEntityService {

    Box createBox(Box box);

    void deleteBoxById(String boxId);

    Box updateBox(Box box);

    Optional<Box> getBoxById(String boxId);

    List<Box> getAllBoxes();

    List<Box> getAllBoxesByDelivererEmail(String email)  throws Exception ;

    boolean isBoxExists(String id);

    boolean isCreateBoxValid(String name);

    boolean isUpdateBoxValid(String id, String name);

}
