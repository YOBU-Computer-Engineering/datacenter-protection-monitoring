package com.example.accessingdatamysql.entity.concrate.sensor;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.sun.istack.NotNull;
import lombok.*;

import javax.persistence.*;
import java.util.Set;

@Data
@AllArgsConstructor
@Entity
@NoArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer","handler","hcsr04s","dht11s", "mq135s"})

public class Device {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)    private Long id;

    @NotNull
    private String name;

    @NotNull
    @Column(length = 48)
    private String mac_adres;


    @OneToMany(mappedBy="device")
    private Set<Dht11> dht11s;

    @OneToMany(mappedBy="device")
    private Set<Hcsr04> hcsr04s;

    @OneToMany(mappedBy="device")
    private Set<Mq135> mq135s;
}
