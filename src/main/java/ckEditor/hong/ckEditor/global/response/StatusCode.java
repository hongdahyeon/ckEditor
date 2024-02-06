package ckEditor.hong.ckEditor.global.response;

import org.springframework.http.HttpStatus;

public enum StatusCode {

    // 200
    OK(HttpStatus.OK.value(), HttpStatus.OK.getReasonPhrase()),

    // 201
    CREATED(HttpStatus.CREATED.value(), HttpStatus.CREATED.getReasonPhrase()),

    // 204
    NO_CONTENT(HttpStatus.NO_CONTENT.value(), HttpStatus.NO_CONTENT.getReasonPhrase()),

    // 400
    BAD_REQUEST(HttpStatus.BAD_REQUEST.value(), HttpStatus.BAD_REQUEST.getReasonPhrase()),

    // 403
    FORBIDDEN(HttpStatus.FORBIDDEN.value(), HttpStatus.FORBIDDEN.getReasonPhrase()),

    // 404
    NOT_FOUND(HttpStatus.NOT_FOUND.value(), HttpStatus.NOT_FOUND.getReasonPhrase());

    final Integer value;
    final String reason;

    StatusCode(Integer value, String reason){
        this.value = value;
        this.reason = reason;
    }
}
