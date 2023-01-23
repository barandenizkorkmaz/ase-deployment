package com.ase.ase_box.config;

import java.util.ArrayList;

public class StaticString {

    public static String mailContent = "Dear User,\n {1} \n Best Regards";

    public static String replaceString(String s1,String s2){
        return s1.replace("{1}",s2);
    }

    public static String replaceAll(String s1,String... args){
        int index = 0;
        String newStr = new String(s1);
        for (String argIndex :
                args) {
            newStr = newStr.replace(String.format("{%s}",String.valueOf(index)),argIndex);
        }
        return newStr;
    }
}
