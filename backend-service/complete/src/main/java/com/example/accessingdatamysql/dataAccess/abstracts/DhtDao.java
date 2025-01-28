package com.example.accessingdatamysql.dataAccess.abstracts;
import com.example.accessingdatamysql.entity.concrate.sensor.Dht11;
import org.springframework.data.repository.CrudRepository;
import java.time.LocalDateTime;
import java.util.List;

public interface DhtDao extends CrudRepository<Dht11, Integer> {
        List<Dht11> findAllByDateLessThanEqualAndDateGreaterThanEqual(LocalDateTime d1, LocalDateTime d2);
}
