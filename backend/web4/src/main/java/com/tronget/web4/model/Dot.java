package com.tronget.web4.model;

import com.tronget.web4.model.dto.DotRequestDto;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Dot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "app_user_id", nullable = false)
    private AppUser appUser;

    @NonNull
    private Double x;

    @NonNull
    private Double y;

    @NonNull
    private Double r;

    private boolean isHit;

    public Dot() {

    }

    public Dot(DotRequestDto dotRequestDto) {
        this.x = dotRequestDto.getX();
        this.y = dotRequestDto.getY();
        this.r = dotRequestDto.getR();
    }
}
