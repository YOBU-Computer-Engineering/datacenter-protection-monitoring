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
@Table(name="hcsr04_awake_log")
public class Hcsr04 {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime triggeredDate;

    @ManyToOne
    @JoinColumn(name="device_id", nullable=false)
    private Device device;

    Hcsr04(Long id, LocalDateTime triggeredDate){
        this.triggeredDate=triggeredDate;
        this.id = id;
    }

}
