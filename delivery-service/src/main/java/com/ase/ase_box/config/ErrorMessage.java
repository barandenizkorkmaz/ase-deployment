package com.ase.ase_box.config;

public enum ErrorMessage {

    WrongContent("Wrong type of content",1001);

    private final String errorMessage;
    private final Integer errorCode;

    ErrorMessage(String errorMessage, Integer errorCode) {
        this.errorMessage = errorMessage;
        this.errorCode = errorCode;
    }
}
