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
 * @fileoverview Variable blocks for Arduino.
 * @author gasolin@gmail.com (Fred Lin)
 */
'use strict';


goog.provide('Blockly.Arduino.variables');

goog.require('Blockly.Arduino');


Blockly.Arduino['variables_get'] = function(block) {
  // Variable getter.
  var code = Blockly.Arduino.variableDB_.getName(block.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['variables_set'] = function(block) {
    //console.log("block =", block);
  // Variable setter.
  var argument0 = Blockly.Arduino.valueToCode(block, 'VALUE',
      Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var varName = Blockly.Arduino.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  
  console.log("varName =", varName);
  
  //console.log("argument0 =", argument0);
  //console.log("typeof argument0 =", typeof argument0);
  //console.log("typeof Blockly.Arduino.variableTypes_ =", typeof Blockly.Arduino.variableTypes_);
  /*    
  if (typeof Blockly.Arduino.variableTypes_ === "undefined")
  {
      Blockly.Arduino.variableTypes_ = {};
  }*/
  
  // TODO : This whole thing is better done by detecting the type of the value block but can't see how to do that.
  var varType = typeof argument0;
  var arduinoType = varType;
  
  if(varType === "string")
  {
      arduinoType = "String";
  }
  
  if(/^[0-9]+$/.test(argument0))
  {
      arduinoType = "int";
  }
  else if(/^[\.0-9]+$/.test(argument0))
  {
      arduinoType = "float";
  }
  else if(/^(true|false)$/.test(argument0))
  {
      arduinoType = "boolean";
  }
  else if(/^(HIGH|LOW)$/.test(argument0))
  {
      arduinoType = "pin_level";
  }

  if(typeof Blockly.Arduino.variableTypes_[varName] === "undefined")
  {
      Blockly.Arduino.variableTypes_[varName] = arduinoType;
  }
  
  console.log("Blockly.Arduino.variableTypes_ =", Blockly.Arduino.variableTypes_);
  // TODO : use Blockly.Arduino.variableTypes_[varName] to set the type check on other blocks setting this
  return varName + ' = ' + argument0 + ';\n';
};


/*
Blockly.Arduino.variables_declare = function() {
  // Variable setter.
  var dropdown_type = this.getFieldValue('TYPE');
  //TODO: settype to variable
  var argument0 = Blockly.Arduino.valueToCode(this, 'VALUE',
      Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var varName = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
  Blockly.Arduino.setups_['setup_var'+varName] = varName + ' = ' + argument0 + ';\n';
  return '';
};

Blockly.Arduino.variables_set = function() {
  // Variable setter.
  var argument0 = Blockly.Arduino.valueToCode(this, 'VALUE',
      Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var varName = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
  return varName + ' = ' + argument0 + ';\n';
};
*/
