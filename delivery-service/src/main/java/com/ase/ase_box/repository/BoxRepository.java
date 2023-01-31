package com.ase.ase_box.repository;

import com.ase.ase_box.data.entity.Box;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface BoxRepository extends MongoRepository<Box, String> {

    List<Box> findAllByName(String name);

    List<Box> findAllByIdIsNotAndName(String id, String name);

    //@Query("{'id': {'$ne' : ?0},'$or':[ {'name':?1}, {'raspberryId':?2} ]}")
    //List<Box> customFindAllByNameOrRaspberryIdAndNoMatchingId(String id, String name, String raspberryId);



}
