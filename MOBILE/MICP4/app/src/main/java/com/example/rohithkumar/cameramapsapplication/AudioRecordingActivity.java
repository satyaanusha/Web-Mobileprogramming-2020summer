package com.example.rohithkumar.cameramapsapplication;

import android.content.Context;
import android.media.MediaPlayer;
import android.media.MediaRecorder;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.v4.app.ActivityCompat;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.AppCompatButton;
import android.util.Log;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.LinearLayout;
import android.widget.LinearLayout.LayoutParams;
import java.io.IOException;

public class AudioRecordingActivity extends AppCompatActivity {
    private static final String LOG_TAG = "AudioRecordTest";
    private static final int REQUEST_RECORD_AUDIO_PERMISSION = 200;
    private static String mFileName = null;
    private AudioRecordingActivity.RecordButton mRecordButton = null;
    private MediaRecorder mRecorder = null;
    private AudioRecordingActivity.PlayButton mPlayButton = null;
    private MediaPlayer mPlayer = null;
    private boolean permissionToRecordAccepted = false;
    private String[] permissions = new String[]{"android.permission.RECORD_AUDIO"};



    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        switch(requestCode) {
            case 200:
                this.permissionToRecordAccepted = grantResults[0] == 0;
            default:
                if (!this.permissionToRecordAccepted) {
                    this.finish();
                }

        }
    }

    private void onRecord(boolean start) {
        if (start) {
            this.startRecording();
        } else {
            this.stopRecording();
        }

    }

    private void onPlay(boolean start) {
        if (start) {
            this.startPlaying();
        } else {
            this.stopPlaying();
        }

    }

    private void startPlaying() {
        this.mPlayer = new MediaPlayer();

        try {
            this.mPlayer.setDataSource(mFileName);
            this.mPlayer.prepare();
            this.mPlayer.start();
        } catch (IOException var2) {
            Log.e("AudioRecordTest", "prepare() failed");
        }

    }

    private void stopPlaying() {
        this.mPlayer.release();
        this.mPlayer = null;
    }
//task3 start recording code
    private void startRecording() {
        this.mRecorder = new MediaRecorder();
        this.mRecorder.setAudioSource(MediaRecorder.AudioSource.MIC);
        this.mRecorder.setOutputFormat(MediaRecorder.OutputFormat.THREE_GPP);
        this.mRecorder.setOutputFile(mFileName);
        this.mRecorder.setAudioEncoder(MediaRecorder.AudioEncoder.AMR_NB);

        try {
            this.mRecorder.prepare();
        } catch (IOException var2) {
            Log.e("AudioRecordTest", "prepare() failed");
        }

        this.mRecorder.start();
    }

    private void stopRecording() {
        this.mRecorder.stop();
        this.mRecorder.release();
        this.mRecorder = null;
    }

    public void onCreate(Bundle icicle) {
        super.onCreate(icicle);
        mFileName = this.getExternalCacheDir().getAbsolutePath();
        mFileName = mFileName + "/audiorecordtest.3gp";
        ActivityCompat.requestPermissions(this, this.permissions, 200);
        LinearLayout ll = new LinearLayout(this);
        this.mRecordButton = new AudioRecordingActivity.RecordButton(this);
        ll.addView(this.mRecordButton, new LayoutParams(-2, -2, 0.0F));
        this.mPlayButton = new AudioRecordingActivity.PlayButton(this);
        ll.addView(this.mPlayButton, new LayoutParams(-2, -2, 0.0F));
        this.setContentView(ll);
    }

    public void onStop() {
        super.onStop();
        if (this.mRecorder != null) {
            this.mRecorder.release();
            this.mRecorder = null;
        }

        if (this.mPlayer != null) {
            this.mPlayer.release();
            this.mPlayer = null;
        }

    }

    class PlayButton extends AppCompatButton {
        boolean mStartPlaying = true;
        OnClickListener clicker = new OnClickListener() {
            public void onClick(View v) {
                AudioRecordingActivity.this.onPlay(PlayButton.this.mStartPlaying);
                if (PlayButton.this.mStartPlaying) {
                    PlayButton.this.setText("Stop playing");
                } else {
                    PlayButton.this.setText("Start playing");
                }

                PlayButton.this.mStartPlaying = !PlayButton.this.mStartPlaying;
            }
        };

        public PlayButton(Context ctx) {
            super(ctx);
            this.setText("Start playing");
            this.setOnClickListener(this.clicker);
        }
    }

    class RecordButton extends AppCompatButton {
        boolean mStartRecording = true;
        OnClickListener clicker = new OnClickListener() {
            public void onClick(View v) {
                AudioRecordingActivity.this.onRecord(RecordButton.this.mStartRecording);
                if (RecordButton.this.mStartRecording) {
                    RecordButton.this.setText("Stop recording");
                } else {
                    RecordButton.this.setText("Start recording");
                }

                RecordButton.this.mStartRecording = !RecordButton.this.mStartRecording;
            }
        };

        public RecordButton(Context ctx) {
            super(ctx);
            this.setText("Start recording");
            this.setOnClickListener(this.clicker);
        }
    }
}
