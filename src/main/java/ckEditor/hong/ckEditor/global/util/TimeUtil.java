package ckEditor.hong.ckEditor.global.util;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class TimeUtil {

    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    private static final LocalDateTime TODAY = LocalDateTime.now();

    public static String nowDate(){
        return TODAY.format(DATE_TIME_FORMATTER);
    }
}