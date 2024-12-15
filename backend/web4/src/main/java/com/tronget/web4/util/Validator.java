package com.tronget.web4.util;

public interface Validator<T> {
    boolean isValid(T obj);
}
