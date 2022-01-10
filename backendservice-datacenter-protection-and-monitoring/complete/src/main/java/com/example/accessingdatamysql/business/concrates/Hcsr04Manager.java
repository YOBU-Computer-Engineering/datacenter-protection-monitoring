package com.example.accessingdatamysql.business.concrates;

import com.example.accessingdatamysql.dataAccess.abstracts.HcsrDao;
import com.example.accessingdatamysql.entity.concrate.sensor.Dht11;
import com.example.accessingdatamysql.entity.concrate.sensor.Hcsr04;
import org.springframework.stereotype.Component;

@Component
public class Hcsr04Manager {
    private HcsrDao _hcsrDao;

    public Hcsr04Manager(HcsrDao _hcsrDao){
        this._hcsrDao = _hcsrDao;
    }

    public Iterable<Hcsr04> getAll() {
        return  _hcsrDao.findAll();
    }
}
