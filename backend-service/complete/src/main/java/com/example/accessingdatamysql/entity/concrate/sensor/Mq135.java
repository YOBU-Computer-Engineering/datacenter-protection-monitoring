package com.example.accessingdatamysql.entity.concrate.sensor;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name="Mq135")
public class Mq135 {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String airQualityValue;

    @NotNull
    @Column
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime date;

    @ManyToOne
    @JoinColumn(name="device_id", nullable=false)
    private Device device;

    Mq135(Long id, String airQualityValue){
        this.airQualityValue = airQualityValue;
        this.id = id;
    }

}
