package com.example.accessingdatamysql.business.concrates;

import com.example.accessingdatamysql.business.abstracts.Dht11Service;
import com.example.accessingdatamysql.dataAccess.abstracts.DhtDao;
import com.example.accessingdatamysql.entity.concrate.sensor.Dht11;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class Dht11Manager implements Dht11Service {
    private DhtDao _dhtDao;

    public Dht11Manager(DhtDao _dhtDao){
        this._dhtDao = _dhtDao;
    }

    @Override
    public List<Dht11> getAll() {
        return (List<Dht11>) _dhtDao.findAll();
    }
}
