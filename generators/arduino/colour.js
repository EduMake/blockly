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
 * @fileoverview Generating Dart for colour blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Arduino.colour');

goog.require('Blockly.Arduino');

Blockly.Arduino.colour_picker = function() {
  // Colour picker.
  var code = '\'' + this.getFieldValue('COLOUR') + '\'';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.colour_rgb = function() {
  // Compose a colour from RGB components.
  var red = Blockly.Arduino.valueToCode(this, 'RED',
      Blockly.Arduino.ORDER_NONE) || 0;
  var green = Blockly.Arduino.valueToCode(this, 'GREEN',
      Blockly.Arduino.ORDER_NONE) || 0;
  var blue = Blockly.Arduino.valueToCode(this, 'BLUE',
      Blockly.Arduino.ORDER_NONE) || 0;

  if (!Blockly.Arduino.definitions_['colour_rgb']) {
    Blockly.Arduino.definitions_['import_dart_math'] =
        'import \'dart:math\' as Math;';
    var functionName = Blockly.Arduino.variableDB_.getDistinctName(
        'colour_rgb', Blockly.Generator.NAME_TYPE);
    Blockly.Arduino.colour_rgb.functionName = functionName;
    var func = [];
    func.push('String ' + functionName + '(r, g, b) {');
    func.push('  String rs = (Math.max(Math.min(r, 1), 0) * 255).round()' +
              '.toRadixString(16);');
    func.push('  String gs = (Math.max(Math.min(g, 1), 0) * 255).round()' +
              '.toRadixString(16);');
    func.push('  String bs = (Math.max(Math.min(b, 1), 0) * 255).round()' +
              '.toRadixString(16);');
    func.push('  rs = \'0$rs\';');
    func.push('  rs = rs.substring(rs.length - 2);');
    func.push('  gs = \'0$gs\';');
    func.push('  gs = gs.substring(gs.length - 2);');
    func.push('  bs = \'0$bs\';');
    func.push('  bs = bs.substring(bs.length - 2);');
    func.push('  return \'#$rs$gs$bs\';');
    func.push('}');
    Blockly.Arduino.definitions_['colour_rgb'] = func.join('\n');
  }
  var code = Blockly.Arduino.colour_rgb.functionName +
      '(' + red + ', ' + green + ', ' + blue + ')';
  return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
};

Blockly.Arduino.colour_blend = function() {
  // Blend two colours together.
  var c1 = Blockly.Arduino.valueToCode(this, 'COLOUR1',
      Blockly.Arduino.ORDER_NONE) || '\'#000000\'';
  var c2 = Blockly.Arduino.valueToCode(this, 'COLOUR2',
      Blockly.Arduino.ORDER_NONE) || '\'#000000\'';
  var ratio = Blockly.Arduino.valueToCode(this, 'RATIO',
      Blockly.Arduino.ORDER_NONE) || 0.5;

  if (!Blockly.Arduino.definitions_['colour_blend']) {
    Blockly.Arduino.definitions_['import_dart_math'] =
        'import \'dart:math\' as Math;';
    var functionName = Blockly.Arduino.variableDB_.getDistinctName(
        'colour_blend', Blockly.Generator.NAME_TYPE);
    Blockly.Arduino.colour_blend.functionName = functionName;
    var func = [];
    func.push('String ' + functionName + '(c1, c2, ratio) {');
    func.push('  ratio = Math.max(Math.min(ratio, 1), 0);');
    func.push('  int r1 = int.parse(\'0x${c1.substring(1, 3)}\');');
    func.push('  int g1 = int.parse(\'0x${c1.substring(3, 5)}\');');
    func.push('  int b1 = int.parse(\'0x${c1.substring(5, 7)}\');');
    func.push('  int r2 = int.parse(\'0x${c2.substring(1, 3)}\');');
    func.push('  int g2 = int.parse(\'0x${c2.substring(3, 5)}\');');
    func.push('  int b2 = int.parse(\'0x${c2.substring(5, 7)}\');');
    func.push('  String rs = (r1 * (1 - ratio) + r2 * ratio).round()' +
              '.toRadixString(16);');
    func.push('  String gs = (g1 * (1 - ratio) + g2 * ratio).round()' +
              '.toRadixString(16);');
    func.push('  String bs = (b1 * (1 - ratio) + b2 * ratio).round()' +
              '.toRadixString(16);');
    func.push('  rs = \'0$rs\';');
    func.push('  rs = rs.substring(rs.length - 2);');
    func.push('  gs = \'0$gs\';');
    func.push('  gs = gs.substring(gs.length - 2);');
    func.push('  bs = \'0$bs\';');
    func.push('  bs = bs.substring(bs.length - 2);');
    func.push('  return \'#$rs$gs$bs\';');
    func.push('}');
    Blockly.Arduino.definitions_['colour_blend'] = func.join('\n');
  }
  var code = Blockly.Arduino.colour_blend.functionName +
      '(' + c1 + ', ' + c2 + ', ' + ratio + ')';
  return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
};
