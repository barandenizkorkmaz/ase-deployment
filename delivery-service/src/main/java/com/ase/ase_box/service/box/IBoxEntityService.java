package com.ase.ase_box.service.box;

import com.ase.ase_box.data.entity.Box;
import com.ase.ase_box.data.request.box.IsCreateBoxValidRequest;
import com.ase.ase_box.data.request.box.IsUpdateBoxValidRequest;

import java.util.List;
import java.util.Optional;

public interface IBoxEntityService {

    Box createBox(Box box);

    void deleteBoxById(String boxId);

    Box updateBox(Box box);

    Optional<Box> getBoxById(String boxId);

    List<Box> getAllBoxes();

    boolean isBoxExists(String id);

    boolean isCreateBoxValid(IsCreateBoxValidRequest isCreateBoxValidRequest);

    boolean isUpdateBoxValid(String id, IsUpdateBoxValidRequest isUpdateBoxValidRequest);

}
