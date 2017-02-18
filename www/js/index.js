/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var game;
var deviceIsiPad = false;
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {

        // set to portrait
        screen.lockOrientation('landscape');

        // the device model comes from phonegap plugin, e.g. iPad6,3
        // determine if this is running as a native app an iPad
        if (!(typeof device === 'undefined')) {
            deviceIsiPad = (device.model.indexOf("iPad") !== -1);
        }

        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {

        console.log('Received Event: ' + id);


        app.initializeGame();

    },
    initializeGame: function() {
        // *window.devicePixelRatio
        // let's set a target device iphone 5
        // aspect 9:16
        // 640 x 1136 resolution twice 320 x 568 logical


        // let's set a target device iphone 6&7
        // aspect 9:16
        // 750 x 1334
        var targetDeviceWidth = 1334;
        var targetDeviceHeight = 730;

        // let's do something special for native app on ipads, as we love them
        // consider the iPad2
        // aspect 3:4
        // 1536 x 2048 resolution
        // 768 x 1024 logical
        // let's just adjust the device width only, to achieve the 3:4 aspect
        // and let phasers scale manager scale it up.

        if (deviceIsiPad) {
            targetDeviceWidth = 852;
        }

        game = new Phaser.Game(targetDeviceWidth, targetDeviceHeight, Phaser.AUTO, '');

        game.levels = new levels();

        game.state.add('Boot', angryMaths.Boot);
        game.state.add('Preloader', angryMaths.Preload);
        game.state.add('MainMenu', angryMaths.MainMenu);
        game.state.add("LevelSelect", angryMaths.LevelSelect);
        game.state.add("PlayLevel", angryMaths.PlayLevel);
        game.state.add("LevelOver", angryMaths.LevelOver);
        game.state.add("LevelStart", angryMaths.LevelStart);
        game.state.add("Settings", angryMaths.Settings);

        game.state.start('Boot');

        // hide the splash screen
        // Cordova function
        navigator.splashscreen.hide()
    }
};
