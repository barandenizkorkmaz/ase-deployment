package com.ase.ase_box.controller;

import com.ase.ase_box.data.dto.BoxDto;
import com.ase.ase_box.data.enums.UserType;
import com.ase.ase_box.data.request.box.BoxRequest;
import com.ase.ase_box.data.request.box.CreateBoxRequest;
import com.ase.ase_box.data.request.box.UpdateBoxRequest;
import com.ase.ase_box.data.response.box.CreateBoxResponse;
import com.ase.ase_box.data.response.box.DeleteBoxResponse;
import com.ase.ase_box.data.response.box.UpdateBoxResponse;
import com.ase.ase_box.service.box.IBoxCrudService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("box")
public class BoxController {
    // TODO: 30.12.2022 The functions can only be called by dispatcher.

    private final IBoxCrudService boxCrudService;

    @GetMapping("")
    public ResponseEntity<HttpStatus> startSession(){
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/create") // TODO: 25.01.2023 Distpacher
    @PreAuthorize("hasAuthority('DISPATCHER')")
    public ResponseEntity<CreateBoxResponse> createBox(@RequestBody CreateBoxRequest createBoxRequest) {
        try {
            return ResponseEntity.ok(boxCrudService.createBox(createBoxRequest));
        }
        catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("list/{id}")   // TODO: 25.01.2023 Distpacher
    @PreAuthorize("hasAuthority('DISPATCHER')")
    public ResponseEntity<BoxDto> getBoxById(@PathVariable("id") String id) {
        return ResponseEntity.ok(boxCrudService.getBoxById(id));
    }

    @GetMapping("list/all") // TODO: 25.01.2023 Distpacher
    @PreAuthorize("hasAuthority('DISPATCHER')")
    public ResponseEntity<List<BoxDto>> getAllBoxes() {
        return ResponseEntity.ok(boxCrudService.getAllBoxes());
    }

    @PutMapping("update/{id}") // TODO: 25.01.2023 Distpacher
    @PreAuthorize("hasAuthority('DISPATCHER')")
    public ResponseEntity<UpdateBoxResponse> updateBox(@PathVariable("id") String id, @RequestBody UpdateBoxRequest updateBoxRequest) {
        try {
            return ResponseEntity.ok(boxCrudService.updateBox(id, updateBoxRequest));
        }catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("delete/{id}") // TODO: 25.01.2023 Distpacher
    @PreAuthorize("hasAuthority('DISPATCHER')")
    public ResponseEntity<DeleteBoxResponse> deleteBox(@PathVariable("id") String id) {
        try {
            return ResponseEntity.ok(boxCrudService.deleteBox(id));
        }catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/deliverer/{email}") // TODO: 25.01.2023 Deliverer
    @PreAuthorize("hasAuthority('DELIVERER')")
    public ResponseEntity<List<BoxDto>> getBoxesByDelivererEmail(@PathVariable("email") String email){
        try {
            return ResponseEntity.ok(boxCrudService.getBoxesByDelivererEmail(email));
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/unlock/{id}")
    public ResponseEntity<HttpStatus> unlockBox(@PathVariable("id") String id, @RequestBody BoxRequest unlockBoxRequest) {
        try{
            boxCrudService.unlockBox(id, unlockBoxRequest);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (IllegalAccessException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/lock/{id}")
    public ResponseEntity<HttpStatus> lockBox(@PathVariable("id") String id, @RequestBody BoxRequest lockRequest){
        try{
            boxCrudService.lockBox(id, lockRequest);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (IllegalAccessException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

}
