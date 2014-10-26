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
 * @fileoverview Math blocks for Blockly.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

goog.provide('Blockly.Blocks.neopixel');

goog.require('Blockly.Blocks');

Blockly.Blocks['neopixels_attach'] = {
  init: function() {
    this.setHelpUrl('https://github.com/adafruit/Adafruit_NeoPixel');
    this.setColour(120);
    this.appendDummyInput()
        .appendField("Attach")
        .appendField(new Blockly.FieldTextInput("16"), "NEO_PIXEL_LENGTH")
        .appendField("NeoPixels to Output")
        // TODO : Get the list from the profile
        .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN");
//        .appendField(new Blockly.FieldDropdown([["1", "1"], ["2", "2"], ["3", "3"]]), "PIN");
    this.setInputsInline(true);
    this.setPreviousStatement(true, "null");
    this.setNextStatement(true, "null");
    this.setTooltip('');
  }
};


Blockly.Blocks['neopixel_set'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(120);
    this.appendDummyInput()
        .appendField("Set Pixel")
        .appendField(new Blockly.FieldTextInput("0"), "pixel_number");
    this.appendDummyInput()
        .appendField("to");
    this.appendValueInput("COLOUR")
        .setCheck("Colour");
    this.setInputsInline(true);
    this.setPreviousStatement(true, "null");
    this.setNextStatement(true, "null");
    this.setTooltip('');
  }
};


Blockly.Blocks['neopixel_eye_set'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(120);
    this.appendDummyInput()
        .appendField("Set")
        .appendField(new Blockly.FieldDropdown([["LEFT", "0"], ["RIGHT", "1"]]), "pixel_number");
    this.appendDummyInput()
        .appendField("eye to");
    this.appendValueInput("COLOUR")
        .setCheck("Colour");
    this.setInputsInline(true);
    this.setPreviousStatement(true, "null");
    this.setNextStatement(true, "null");
    this.setTooltip('');
  }
};


Blockly.Blocks['neopixels_set'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(120);
    this.appendDummyInput()
        .appendField("Set Strip to");
    this.appendValueInput("COLOUR")
        .setCheck("Colour");
    this.setInputsInline(true);
    this.setPreviousStatement(true, "null");
    this.setNextStatement(true, "null");
    this.setTooltip('');
  }
};


Blockly.Blocks['neopixels_wipe'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(120);
    this.appendDummyInput()
        .appendField("Wipe to");
    this.appendValueInput("COLOUR")
        .setCheck("Colour");
    this.appendDummyInput()
        .appendField("over")
        .appendField(new Blockly.FieldTextInput("0"), "wipe_time")
        .appendField("milliseconds");
    this.setInputsInline(true);
    this.setPreviousStatement(true, "null");
    this.setNextStatement(true, "null");
    this.setTooltip('');
  }
};

