package com.zerulus.app;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;

import com.fasterxml.jackson.databind.ObjectMapper;

public class TxtToJson {


    private ArrayList<FinDictionary> english;
    private ArrayList<FinDictionary> spanish;

    private int engCount = 0;
    private int spnCount = 0;

    public TxtToJson(String path) {

        english = new ArrayList<FinDictionary>();
        spanish = new ArrayList<FinDictionary>();
        
        readingTextFile(path);
        writingJSONFile("english.json", english);
        writingJSONFile("spanish.json", spanish);
        System.out.println("Total English Words: " + engCount);
        System.out.println("Total Spanish Words: " + spnCount);

        System.out.println("Done!");
    }

    private void writingJSONFile(String path, ArrayList<FinDictionary> lang) {

        ObjectMapper mapper = new ObjectMapper();

        try {
            mapper.writeValue(new File(path), lang);
        } catch(IOException e) {
            e.printStackTrace();
        }
    }

    private void readingTextFile(String path) {
        String line = null;

        int breakLang = 0;
        int nextLang = 0;

        String engWord = null;
        String snpWord = null;
        String engDefinition = null;
        String snpDefinition = null;
        String restOfLine = null;

        try {
            FileInputStream fileReader = new FileInputStream(path);
            InputStreamReader inputReader = new InputStreamReader(fileReader, "UTF-8");
            BufferedReader bufferedReader = new BufferedReader(inputReader);

            while((line = bufferedReader.readLine()) != null) {
                if(!line.contains("*")) {
                    breakLang = line.indexOf(" - ");
                    if(breakLang != -1) {
                        engWord = line.substring(0,breakLang);
                        restOfLine = line.substring(breakLang + 4);
                    } else {
                        breakLang = line.indexOf(":");
                        engWord = line.substring(0,breakLang);
                        restOfLine = line.substring(breakLang + 1);
                    }

                    nextLang = restOfLine.indexOf("):");
                    if(nextLang != -1) {
                        snpWord = restOfLine.substring(0, nextLang);
                        restOfLine = restOfLine.substring(nextLang + 3);
                    } else {
                        snpWord = "!";
                        nextLang = breakLang;
                    }
                    
                    nextLang = restOfLine.indexOf("/");
                    if(nextLang != -1) {
                        snpDefinition = restOfLine.substring(0, nextLang);
                    } else {
                        snpDefinition = "!";
                        nextLang++;
                    }
                    
                    restOfLine = restOfLine.substring(nextLang + 1);
                    engDefinition = restOfLine;
                    if(restOfLine.length() < 3) {
                        engDefinition = "!";
                    }
                    
                    if(engWord != null && !engWord.contains("!")) {
                        FinDictionary eng = new FinDictionary(engWord, engDefinition);
                        eng.addOtherWord(snpWord, "Spanish");
                        english.add(eng);
                        engCount++;
                    }
                    
                    if(snpWord != null && !snpWord.contains("!")) {
                        FinDictionary spn = new FinDictionary(snpWord, snpDefinition);
                        spn.addOtherWord(engWord, "English");
                        spanish.add(spn);
                        spnCount++;

                        if(snpDefinition.contains("!")) {
                            System.out.println(snpWord);
                        }
                    }
                    
                }
            }

            bufferedReader.close();

        } catch(Exception e) {
            e.printStackTrace();
        }
    }


    public static void main(String[] args) {
        new TxtToJson(args[0]);
    }
}