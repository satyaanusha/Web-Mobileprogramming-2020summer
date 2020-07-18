package com.example.rohithkumar.cameramapsapplication;

import android.content.Context;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.*;

public class StorageActivity extends AppCompatActivity {
    EditText txt_content;
    EditText contenttoDisplay;
    String FILENAME = "MyAppStorage";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_storage);
        txt_content = (EditText) findViewById(R.id.id_txt_mycontent);
        contenttoDisplay = (EditText) findViewById(R.id.id_txt_display);
    }

    public void saveTofile(View v) throws IOException {

        // ICP Task4: Write the code to save the text
        String text = txt_content.getText().toString()+" ";
        try {

            FileOutputStream fOut = openFileOutput("file.txt",MODE_APPEND);
            fOut.write(text.getBytes());
            fOut.close();

            Toast.makeText(getBaseContext(), "file saved", Toast.LENGTH_SHORT).show();
        }
        catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

    }

    public void retrieveFromFile(View v) throws IOException {

        // ICP Task4: Write the code to display the above saved text
        try {

            FileInputStream fin = openFileInput("file.txt");
            int c;
            String temp="";

            while( (c = fin.read()) != -1){
                temp = temp + Character.toString((char)c);
            }
            contenttoDisplay.setText(temp);
            Toast.makeText(getBaseContext(), "file read", Toast.LENGTH_SHORT).show();
        } catch(Exception e){
        }
    }
}

