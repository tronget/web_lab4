package com.tronget.web4.util;

import com.tronget.web4.model.Dot;
import org.springframework.stereotype.Component;

@Component
public class DotValidator implements Validator<Dot> {

    @Override
    public boolean isValid(Dot dot) {
        Double x = dot.getX();
        Double y = dot.getY();
        Double r = dot.getR();

        return checkBounds(x, -3, 3) &&
                checkBounds(y, -3, 5) &&
                checkBounds(r, 1, 5);
    }

    private boolean checkBounds(double num, double left, double right) {
        return left <= num && num <= right;
    }
}
