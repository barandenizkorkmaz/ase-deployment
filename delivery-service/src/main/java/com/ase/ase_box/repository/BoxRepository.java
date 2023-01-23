package com.ase.ase_box.repository;

import com.ase.ase_box.data.entity.Box;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface BoxRepository extends MongoRepository<Box, String> {

    List<Box> findAllByNameOrRaspberryId(String name, String raspberryId);

    @Query("{'id': {'$ne' : ?0},'$or':[ {'name':?1}, {'raspberryId':?2} ]}")
    List<Box> customFindAllByNameOrRaspberryIdAndNoMatchingId(String id, String name, String raspberryId);


}
