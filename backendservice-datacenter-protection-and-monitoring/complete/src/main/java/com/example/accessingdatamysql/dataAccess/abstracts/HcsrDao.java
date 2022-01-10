package com.example.accessingdatamysql.dataAccess.abstracts;

import com.example.accessingdatamysql.entity.concrate.sensor.Hcsr04;
import org.springframework.data.repository.CrudRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface HcsrDao extends CrudRepository<Hcsr04, Integer> {
    List<Hcsr04> findAllByTriggeredDateLessThanEqualAndTriggeredDateGreaterThanEqual(LocalDateTime d1, LocalDateTime d2);

}