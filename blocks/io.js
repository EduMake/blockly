/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
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
 * @fileoverview Logic blocks for Blockly.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

goog.provide('Blockly.Blocks.io');

goog.require('Blockly.Blocks');


Blockly.Blocks['pin_level'] = {
   category: 'In/Out',
   helpUrl: 'http://arduino.cc/en/Reference/Constants',
   init: function() {
    this.setColour(65);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["HIGH", "HIGH"], ["LOW", "LOW"]]), "level");
    this.setInputsInline(true);
    this.setOutput(true, "pin_level");
    this.setTooltip('');
  }
};

Blockly.Blocks['pin_level_easy'] = {
   category: 'In/Out',
   helpUrl: 'http://arduino.cc/en/Reference/Constants',
   init: function() {
    this.setColour(65);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["ON", "HIGH"], ["OFF", "LOW"]]), "level");
    this.setInputsInline(true);
    this.setOutput(true, "pin_level");
    this.setTooltip('');
  }
};



Blockly.Blocks['pin_level_boolean'] = {
    category: 'In/Out',
   helpUrl: 'http://arduino.cc/en/Reference/Constants',
  init: function() {
    this.setColour(65);
    this.appendValueInput("level_boolean")
        .setCheck("Boolean");
    this.setInputsInline(true);
    this.setOutput(true, "pin_level");
    this.setTooltip('');
  }
};

Blockly.Blocks.inout_buildin_led = {
   category: 'In/Out',
   helpUrl: 'http://arduino.cc/en/Reference/DigitalWrite',
   init: function() {
     this.setColour(190);
     this.appendDummyInput("")
	       .appendField("Build-in LED Stat")
	       .appendField(new Blockly.FieldDropdown([["HIGH", "HIGH"], ["LOW", "LOW"]]), "STAT");
     this.setPreviousStatement(true, null);
     this.setNextStatement(true, null);
     this.setTooltip('light or off the build-in LED');
   }
};

Blockly.Blocks['inout_digital_write'] = {
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/DigitalWrite');
    this.setColour(230);
    this.appendDummyInput()
        .appendField("Set PIN#")
        .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN")
        .appendField("to");
    this.appendValueInput("STAT")
        .setCheck("pin_level");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Write digital value to a specific PIN');
  }
};


Blockly.Blocks.inout_digital_read = {
  category: 'In/Out',
  helpUrl: 'http://arduino.cc/en/Reference/DigitalRead',
  init: function() {
    this.setColour(230);
    this.appendDummyInput("")
	      .appendField("Value From PIN#")
	      .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN");
    this.setOutput(true, "pin_level");
    this.setTooltip('');
  }
};

/*
Blockly.Blocks.inout_analog_write = {
  category: 'In/Out',
  helpUrl: 'http://arduino.cc/en/Reference/AnalogWrite',
  init: function() {
    this.setColour(230);
    this.appendDummyInput("")
        .appendField("AnalogWrite PIN#")
        .appendField(new Blockly.FieldDropdown(profile.default.analog), "PIN");
    this.appendValueInput("NUM", Number)
        .appendField("value")
        .setCheck(Number);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Write analog value between 0 and 255 to a specific Port');
  }
};

Blockly.Blocks.inout_analog_read = {
  category: 'In/Out',
  helpUrl: 'http://arduino.cc/en/Reference/AnalogRead',
  init: function() {
    this.setColour(230);
    this.appendDummyInput("")
        .appendField("AnalogRead PIN#")
        .appendField(new Blockly.FieldDropdown(profile.default.analog), "PIN");
    this.setOutput(true, Number);
    this.setTooltip('Return value between 0 and 1024');
  }
};

Blockly.Blocks.inout_highlow = {
  category: 'In/Out',
  helpUrl: 'http://arduino.cc/en/Reference/Constants',
  init: function() {
    this.setColour(230);
    this.appendDummyInput("")
        .appendField(new Blockly.FieldDropdown([["HIGH", "HIGH"], ["LOW", "LOW"]]), 'BOOL');
    this.setOutput(true, Boolean);
    this.setTooltip(Blockly.LANG_LOGIC_BOOLEAN_TOOLTIP_1);
  }
};
*/
