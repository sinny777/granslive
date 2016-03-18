
*STEP1: Installing Ionic Framework* 
npm install -g cordova@5.3.3
npm install -g ionic

*For mac user don't forgot to add admin permission by :*

sudo npm install -g cordova@5.3.3
sudo npm install -g ionic

*Important Note :* 
Now the latest version of cordova is not stable. We recommend you to use cordova version 5.3.3 for avoiding plugin installation issue. If you have already installed the latest version of cordova on your computer, You have to uninstall it and install cordova version 5.3.3 by following step :

npm uninstall cordova -g
npm install -g cordova@5.3.3

*For mac user don't forgot to add admin permission by :*

sudo npm uninstall cordova -g
sudo npm install -g cordova@5.3.3

*STEP 2: Add Platform *
cd your_project_path/IonicMaterialDesign
ionic platform add ios <!-- To run project on IOS -->
ionic platform add android <!-- To run project on Android -->

*STEP 3: Add Ionic/Cordova Plugins *

Open a new cmd.exe for windows or Terminal for mac.

cd your_project_path/

SET 1:
ionic plugin add ionic-plugin-keyboard@1.0.8
ionic plugin add cordova-plugin-googleplayservices@19.0.3
ionic plugin add cordova-plugin-contacts@2.0.1
ionic plugin add cordova-plugin-camera@2.1.0
ionic plugin add cordova-plugin-vibration@2.1.0
ionic plugin add cordova-plugin-device@1.1.1
ionic plugin add cordova-plugin-console@1.0.2
ionic plugin add cordova-plugin-whitelist@1.2.1
ionic plugin add cordova-plugin-transport-security@0.1.1
ionic plugin add cordova-plugin-inappbrowser@1.3.0
ionic plugin add org.apache.cordova.splashscreen@1.0.0

SET 2:
ionic plugin add https://github.com/floatinghotpot/cordova-plugin-admob.git
ionic plugin add https://github.com/devgeeks/Canvas2ImagePlugin.git
ionic plugin add https://github.com/wymsee/cordova-imagePicker.git
ionic plugin add https://github.com/litehelpers/Cordova-sqlite-storage.git#0.7.14
ionic plugin add cordova-plugin-x-socialsharing@5.0.10
ionic plugin add de.appplant.cordova.plugin.email-composer@0.8.2
ionic plugin add https://github.com/EddyVerbruggen/Flashlight-PhoneGap-Plugin#3.0.0
ionic plugin add cordova-sms-plugin@0.1.6
ionic plugin add https://github.com/katzer/cordova-plugin-local-notifications#0.8.4

SOME MORE CORDOVA PLUGINS FOR REFERENCE LATER: 

cordova plugin add cordova-plugin-device
cordova plugin add cordova-plugin-statusbar
cordova plugin add cordova-plugin-network-information
cordova plugin add cordova-plugin-battery-status
cordova plugin add cordova-plugin-device-motion
cordova plugin add cordova-plugin-device-orientation
cordova plugin add cordova-plugin-geolocation
cordova plugin add cordova-plugin-camera
cordova plugin add cordova-plugin-media-capture
cordova plugin add cordova-plugin-media
cordova plugin add cordova-plugin-file
cordova plugin add cordova-plugin-file-transfer
cordova plugin add cordova-plugin-dialogs
cordova plugin add cordova-plugin-vibration
cordova plugin add cordova-plugin-contacts
cordova plugin add cordova-plugin-globalization
cordova plugin add org.apache.cordova.splashscreen
cordova plugin add org.apache.cordova.inappbrowser
cordova plugin add org.apache.cordova.console
cordova plugin add com.megster.cordova.bluetoothserial
cordova plugin add https://github.com/phonegap-build/PushPlugin
cordova plugin add de.appplant.cordova.plugin.local-notification
cordova plugin add de.appplant.cordova.plugin.background-mode@0.6.3

cordova plugin rm de.appplant.cordova.plugin.background-mode
cordova plugin add https://github.com/mayurloved/speechrecognizer.git
cordova plugin add com.google.android.gcm
cordova plugin add com.plugin.GCM

>>> android avd (For Installing Emulator)
cd C:\Users\gurvinder.singh\.android
keytool -list -v -keystore debug.keystore 

keytool -genkey -v -keystore debug.keystore -alias androiddebugkey
-storepass android -keypass android -keyalg RSA -validity 14000

keytool -exportcert -alias androiddebugkey -keystore /home/gurvinder/.android -list -v

-----------------------------

Quick fix is to modify the block starting at LocalNotification:492 with the following:

webView.getView().post(new Runnable(){
  public void run(){
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
      webView.sendJavascript(js);
    } else {
      webView.loadUrl("javascript:" + js);
    }
  }
});

*STEP 4: Install Crosswalk Browser*
ionic browser add crosswalk

ionic serve -l -c

Command-line flags/options for run and emulate
[--livereload|-l] .......  Live Reload app dev files from the device (beta)
[--consolelogs|-c] ......  Print app console logs to Ionic CLI (live reload req.)
[--serverlogs|-s] .......  Print dev server logs to Ionic CLI (live reload req.)
[--port|-p] .............  Dev server HTTP port (8100 default, live reload req.)
[--livereload-port|-i] ..  Live Reload port (35729 default, live reload req.)
[--debug|--release]

