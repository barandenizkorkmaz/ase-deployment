package com.ase.ase_box.repository;

import com.ase.ase_box.data.entity.Content;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ContentChannelRepository extends MongoRepository<Content,String> {

}
