package com.example.helloworld;

import java.util.Locale;
import java.util.ResourceBundle;

public class HelloWorld {
    public static void main(String[] args) {
        Locale.setDefault(new Locale("fr", "NG"));
        ResourceBundle myBundle = ResourceBundle.getBundle("locales", Locale.getDefault());

        System.out.println(myBundle.getString("hello.world"));
    }
}
