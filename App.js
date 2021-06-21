import React, { Component } from 'react';
import { Accelerometer } from 'expo-sensors';
import { FontAwesomeIcon } from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, View, Button, text } from 'react-native';
import RNShake from 'react-native-shake';

//this is shake sensitivity - lowering this will give high sensitivity and increasing this will give lower sensitivity
const THRESHOLD = 150;
export class ShakeEventExpo {
  static addListener(handler) {
    let
      last_x,
      last_y,
      last_z;
    let lastUpdate = 0;
    Accelerometer.addListener(accelerometerData => {
      let { x, y, z } = accelerometerData;
      let currTime = Date.now();
      if ((currTime - lastUpdate) > 100) {
        let diffTime = (currTime - lastUpdate);
        lastUpdate = currTime;
        let speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;
        if (speed > THRESHOLD) {
          handler();
        }
        last_x = x;
        last_y = y;
        last_z = z;
      }
    });
  }
  static removeListener() {
    Accelerometer.removeAllListeners()
  }

  async componentWillMount() {
    ShakeEventExpo.addListener(() => {
      //add your code here
      console.log('Shake Shake Shake');
    });
  }

  componentWillUnmount() {
    ShakeEventExpo.removeListener();
  }
};

