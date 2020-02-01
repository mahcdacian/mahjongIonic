# Mahjong Scanner Application

To run the project you need to clone the repo. and edit environment.ts, app.module.ts and add firebaseconfig to it. 

To build and promote the code to firebase hosting webserver
switch to the repo folder $ cd mahjong-scanner 
1) config the firebase with firebase login, firebase init (select www as a public repo.)
2) ionic cordova platform add browser
3) ionic cordova build browser --prod --release
4) firebase deploy
