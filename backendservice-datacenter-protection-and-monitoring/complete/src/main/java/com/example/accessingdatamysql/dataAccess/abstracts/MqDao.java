package com.example.accessingdatamysql.dataAccess.abstracts;

import com.example.accessingdatamysql.entity.concrate.sensor.Dht11;
import com.example.accessingdatamysql.entity.concrate.sensor.Mq135;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface MqDao extends JpaRepository<Mq135, Integer> {
    List<Mq135> findAllByDateLessThanEqualAndDateGreaterThanEqual(LocalDateTime d1, LocalDateTime d2);
}
