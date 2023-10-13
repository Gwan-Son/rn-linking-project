package com.yourapp;

import android.content.pm.PackageManager;
import android.Manifest;
import android.database.Cursor;
import android.net.Uri;
import android.os.Build;
import androidx.annotation.NonNull;
import androidx.core.app.ActivityCompat;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class SMSReaderModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    public SMSReaderModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "SMSReader";
    }

    @ReactMethod
    public void readSMS(final Promise promise) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M &&
            ActivityCompat.checkSelfPermission(reactContext, Manifest.permission.READ_SMS) != PackageManager.PERMISSION_GRANTED) {
            promise.reject("PERMISSION_DENIED", "Read SMS permission not granted");
        } else {
            Uri uri = Uri.parse("content://sms/inbox");
            Cursor cursor = reactContext.getContentResolver().query(uri, null, null, null, null);
            StringBuilder smsList = new StringBuilder();

            if (cursor != null && cursor.moveToFirst()) {
                do {
                    String sender = cursor.getString(cursor.getColumnIndex("address"));
                    String message = cursor.getString(cursor.getColumnIndexOrThrow("body"));
                    smsList.append("Sender: ").append(sender).append(", Message: ").append(message).append("\n");
                } while (cursor.moveToNext());

                cursor.close();
                promise.resolve(smsList.toString());
            } else {
                promise.reject("NO_SMS", "No SMS messages found");
            }
        }
    }
}
