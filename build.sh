#!/bin/bash
# this is a simple script that builds tuchequera movil app.

# COMMANDS
# readd: removes current android/ios platform packages and re-downloads them.
# android: builds project for the android environment.
# ios: builds project for the ios environment.
# clean: removes all node modules and re-installs them.
# device: runs project on connected device.

# shellscript color variables
red=`tput setaf 1`
green=`tput setaf 2`
white=`tput setaf 7`

# user input
uinput=$1

# validate input
if [ "$uinput" != "readd" ] && [ "$uinput" != "android" ] && [ "$uinput" != "ios" ] && [ "$uinput" != "clean" ] && [ "$uinput" != "device" ] && [ "$uinput" != "help" ] && [ "$uinput" != "cap" ] && [ "$uinput" != "icap" ] && [ "$uinput" != "prod" ] && [ "$uinput" != "iprod" ]
then
    echo ""
    echo "${red}Invalid parameters. ${white}How to correctly run this script: "
    echo ""
    echo "${green} ./build.sh readd <platform> ${white} to remove & add platform"
    echo ""
    echo "${green} ./build.sh <platform> ${white} to build project"
    echo ""
    echo "${green} ./build.sh clean ${white} to remove and readd all npm packages"
    echo ""
    exit
fi

if [ $uinput = "help" ]
then
    platform=$2
    echo ""
    echo "How to build and/or run TuChequera Móvil. <platform> can either be Android or iOS."
    echo ""
    echo "${green} ./build.sh readd <platform> ${white} to remove & add platform."
    echo ""
    echo "${green} ./build.sh cap ${white} to build ionic project for dev-Android."
    echo ""
    echo "${green} ./build.sh icap ${white} to build ionic projec for dev-iOS."
    echo ""
    echo "${green} ./build.sh prod ${white} to build ionic project for prod-Android."
       echo ""
    echo "${green} ./build.sh iprod ${white} to build ionic project for prod-iOS."
    echo ""
    echo "${green} ./build.sh <platform> ${white} to build project"
    echo ""
    echo "${green} ./build.sh clean ${white} to remove and readd all npm packages"
    echo ""
    echo "${green} ./build.sh device <platform> ${white} to remove and readd all npm packages"
    echo ""
    exit
fi



if [ $uinput = "readd" ]
then
    platform=$2
    echo ""
    echo "${green}REMOVING "$platform" PLATFORM"
    echo ""
    ionic cordova platform remove $platform;
    echo ""
    echo "${green}ADDING "$platform" PLATFORM"
    echo ""
    ionic cordova platform add $platform;
    echo ""
    echo "${green}Done!"
    echo ""
    exit
fi


if [ $uinput = "cap" ]
then
    platform=$2
    echo ""
    echo "${green}BUILDING PROJECT FOR ANDROID.N"
    echo ""
    npm run build && npx cap sync android;
    echo ""
    echo "DONE! 🔥"
    echo ""
    exit
fi

if [ $uinput = "icap" ]
then
    platform=$2
    echo ""
    echo "${green}BUILDS PROJECT, SETS APP ICONS, SYNCS WITH iOS"
    echo ""
    npm run build && cordova-res ios --skip-config --copy && npx cap sync ios
    echo ""
    echo "DONE!🔥"
    echo ""
    exit
fi

if [ $uinput = "prod" ]
then
    platform=$2
    echo ""
    echo "${green}BUILDS PROJECT FOR PROD-Android, SETS APP ICONS, SYNCS WITH ANDROID & JETIFIES"
    echo ""
    ng build --configuration production
    echo ""
    echo "DONE!🔥"
    echo ""
    exit
fi

if [ $uinput = "iprod" ]
then
    platform=$2
    echo ""
    echo "${green}BUILDS PROJECT FOR PROD-iOS, SETS APP ICONS, SYNCS WITH ANDROID & JETIFIES"
    echo ""
    ng build --configuration production && cordova-res ios --skip-config --copy && npx cap sync android
    echo ""
    echo "DONE!🔥"
    echo ""
    exit
fi

if [ $uinput = "clean" ]
then
    platform=$2
    echo ""
    echo "${green}REMOVING ALL NODE MODULES"
    echo ""

    # spin='-\|/'
    # i=0
    # j=0
    rm -rf node_modules
    # while
    # do
    #   i=$(( (i+1) %4 ))
    #   printf "\r${spin:$i:1}"
    # done
    echo ""
    echo "RE-INSTALLING ALL NODE MODULES"
    echo ""
     npm i --legacy-peer-deps
    # while
    # do
    #   j=$(( (j+1) %4 ))
    #   printf "\r${spin:$j:1}"
    # done
    echo ""
    echo "${green}Done!"
    echo ""
    exit
fi

if [ $uinput = "device" ]
then
    platform=$2
    echo ""
    echo "${green}RUNNING PROJECT ON "$platform" DEVICE"
    echo ""

    ionic cordova run $platform --device

    echo ""
    echo "${green}Done!"
    echo ""
    exit
fi

platform=$uinput

if [ $platform == 'android' ]
then
    echo ""
    echo "${green}ADDING CORDOVA PLUGIN cordova-android-support-gradle-release"
    echo ""
    ionic cordova plugin add cordova-android-support-gradle-release;
fi

echo ""
echo "${green}PREPARING PLATFORM FOR BUILD PROCESS"
echo ""
ionic cordova prepare $platform;
echo ""
echo "${green}BUILDING "$platform" PROJECT"
echo ""
ionic cordova build $platform;
echo ""
echo "Build done! If build was successful, run ${green}ionic serve ${white}to view your app in-browser or ${green}ionic cordova run android/ios ${white}to view in-device."
