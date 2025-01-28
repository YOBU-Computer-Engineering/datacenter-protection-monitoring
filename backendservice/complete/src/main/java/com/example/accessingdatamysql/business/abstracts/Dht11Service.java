package com.example.accessingdatamysql.business.abstracts;

import com.example.accessingdatamysql.entity.concrate.sensor.Dht11;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface Dht11Service {
    List<Dht11> getAll();
}
