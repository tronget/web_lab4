package com.tronget.web4.model.dto;

import com.tronget.web4.model.Dot;
import lombok.Data;


@Data
public class DotResponseDto {
    private Long id;
    private Double x;
    private Double y;
    private Double r;
    private Boolean isHit;
    public DotResponseDto(Dot dot) {
        this.id = dot.getId();
        this.x = dot.getX();
        this.y = dot.getY();
        this.r = dot.getR();
        this.isHit = dot.isHit();
    }
}
