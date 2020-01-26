package com.zerulus.app;

import java.util.HashMap;

public class FinDictionary {

	public String word;
    public String defintion;
    public HashMap<String, String> lang;
    public FinDictionary(String word, String definition) {
        this.word = word;
        this.defintion = definition;
        this.lang = new HashMap<String,String>();
    }

    public void addOtherWord(String otherWord, String lang) {
        this.lang.put(lang, otherWord);
    }
}