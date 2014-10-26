/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * http://blockly.googlecode.com/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Generating Arduino for logic blocks.
 * @author gasolin@gmail.com  (Fred Lin)
 */
'use strict';
goog.provide('Blockly.Arduino.io');

goog.require('Blockly.Arduino');


Blockly.Arduino.addSetup = function(target, code, force) {
    if(force === null)
    {
        force = false;
    }
    
    if(typeof Blockly.Arduino.setups_[target] === "undefined" || force) {
            Blockly.Arduino.setups_[target] = code;
    }
}

Blockly.Arduino['pin_level'] = function(block) {
  //var dropdown_level = block.getFieldValue('level');
  var dropdown_level = this.getFieldValue('level');
  // TODO: Assemble Arduino into code variable.
  var code = dropdown_level;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Arduino.ORDER_NONE];
};


Blockly.Arduino['pin_level_easy'] = function(block) {
  //var dropdown_level = block.getFieldValue('level');
  var dropdown_level = this.getFieldValue('level');
  // TODO: Assemble Arduino into code variable.
  var code = dropdown_level;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Arduino.ORDER_NONE];
};


Blockly.Arduino['pin_level_boolean'] = function(block) {
  var level = Blockly.Arduino.valueToCode(this, 'level_boolean',
      Blockly.Arduino.ORDER_NONE);
  var code = level+'?HIGH:LOW';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Arduino.ORDER_NONE];
};

Blockly.Arduino.inout_buildin_led = function() {
  var dropdown_stat = this.getFieldValue('STAT');
  //Blockly.Arduino.setups_['setup_output_13'] = 'pinMode(13, OUTPUT);';
  Blockly.Arduino.addSetup('setup_output_13',  'pinMode(13, OUTPUT);');
  
  var code = 'digitalWrite(13,'+dropdown_stat+');\n'
  return code;
};

Blockly.Arduino.inout_digital_write = function() {
  var dropdown_pin = this.getFieldValue('PIN')
  var dropdown_stat = Blockly.Arduino.valueToCode(this, 'STAT', Blockly.Arduino.ORDER_NONE);
  
  //Blockly.Arduino.setups_['setup_output_'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
  Blockly.Arduino.addSetup('setup_output_'+dropdown_pin,  'pinMode('+dropdown_pin+', OUTPUT);');
  
  var code = 'digitalWrite('+dropdown_pin+','+dropdown_stat+');\n'
  return code;
};

Blockly.Arduino.inout_digital_read = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  //Blockly.Arduino.setups_['setup_input_'+dropdown_pin] = 'pinMode('+dropdown_pin+', INPUT);';
  Blockly.Arduino.addSetup('setup_input_'+dropdown_pin,  'pinMode('+dropdown_pin+', INPUT);');
  
  var code = 'digitalRead('+dropdown_pin+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.inout_analog_write = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  //var dropdown_stat = this.getFieldValue('STAT');
  var value_num = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_ATOMIC);
  //Blockly.Arduino.setups_['setup_output'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
  
  //Blockly.Arduino.addSetup('setup_output_'+dropdown_pin,  'pinMode('+dropdown_pin+', OUTPUT);');
  
  var code = 'analogWrite('+dropdown_pin+','+value_num+');\n';
  return code;
};

Blockly.Arduino.inout_analog_read = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  //Blockly.Arduino.setups_['setup_input_'+dropdown_pin] = 'pinMode('+dropdown_pin+', INPUT);';
  
  Blockly.Arduino.addSetup('setup_input_'+dropdown_pin,  'pinMode('+dropdown_pin+', INPUT);');
  
  var code = 'analogRead('+dropdown_pin+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.inout_highlow = function() {
  // Boolean values HIGH and LOW.
  var code = (this.getFieldValue('BOOL') == 'HIGH') ? 'HIGH' : 'LOW';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

