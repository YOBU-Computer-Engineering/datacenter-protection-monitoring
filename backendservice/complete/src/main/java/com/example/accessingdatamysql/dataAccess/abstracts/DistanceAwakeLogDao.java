package com.example.accessingdatamysql.dataAccess.abstracts;

import com.example.accessingdatamysql.entity.concrate.sensor.Hcsr04;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DistanceAwakeLogDao extends JpaRepository<Hcsr04, Integer> {

}
