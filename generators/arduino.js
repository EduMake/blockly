/**
 * @license
 * Visual Blocks Language
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
 * @fileoverview Helper functions for generating Arduino for blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Arduino');

goog.require('Blockly.Generator');


/**
 * Arduino code generator.
 * @type !Blockly.Generator
 */
Blockly.Arduino = new Blockly.Generator('Arduino');

/**
 * List of illegal variable names.
 * This is not intended to be a security feature.  Blockly is 100% client-side,
 * so bypassing this list is trivial.  This is intended to prevent users from
 * accidentally clobbering a built-in object or function.
 * @private
 */
Blockly.Arduino.addReservedWords(
    'setup,loop,if,else,for,switch,case,while,do,break,continue,return,goto,define,include,HIGH,LOW,INPUT,OUTPUT,INPUT_PULLUP,true,false,interger, constants,floating,point,void,bookean,char,unsigned,byte,int,word,long,float,double,string,String,array,static, volatile,const,sizeof,pinMode,digitalWrite,digitalRead,analogReference,analogRead,analogWrite,tone,noTone,shiftOut,shitIn,pulseIn,millis,micros,delay,delayMicroseconds,min,max,abs,constrain,map,pow,sqrt,sin,cos,tan,randomSeed,random,lowByte,highByte,bitRead,bitWrite,bitSet,bitClear,bit,attachInterrupt,detachInterrupt,interrupts,noInterrupts'
    );

/**
 * Order of operation ENUMs.
 * https://developer.mozilla.org/en/Arduino/Reference/Operators/Operator_Precedence
 */
Blockly.Arduino.ORDER_ATOMIC = 0;         // 0 "" ...
Blockly.Arduino.ORDER_MEMBER = 1;         // . []
Blockly.Arduino.ORDER_NEW = 1;            // new
Blockly.Arduino.ORDER_FUNCTION_CALL = 2;  // ()
Blockly.Arduino.ORDER_INCREMENT = 3;      // ++
Blockly.Arduino.ORDER_DECREMENT = 3;      // --
Blockly.Arduino.ORDER_LOGICAL_NOT = 4;    // !
Blockly.Arduino.ORDER_BITWISE_NOT = 4;    // ~
Blockly.Arduino.ORDER_UNARY_PLUS = 4;     // +
Blockly.Arduino.ORDER_UNARY_NEGATION = 4; // -
Blockly.Arduino.ORDER_TYPEOF = 4;         // typeof
Blockly.Arduino.ORDER_VOID = 4;           // void
Blockly.Arduino.ORDER_DELETE = 4;         // delete
Blockly.Arduino.ORDER_MULTIPLICATION = 5; // *
Blockly.Arduino.ORDER_DIVISION = 5;       // /
Blockly.Arduino.ORDER_MODULUS = 5;        // %
Blockly.Arduino.ORDER_ADDITION = 6;       // +
Blockly.Arduino.ORDER_SUBTRACTION = 6;    // -
Blockly.Arduino.ORDER_BITWISE_SHIFT = 7;  // << >> >>>
Blockly.Arduino.ORDER_RELATIONAL = 8;     // < <= > >=
Blockly.Arduino.ORDER_IN = 8;             // in
Blockly.Arduino.ORDER_INSTANCEOF = 8;     // instanceof
Blockly.Arduino.ORDER_EQUALITY = 9;       // == != === !==
Blockly.Arduino.ORDER_BITWISE_AND = 10;   // &
Blockly.Arduino.ORDER_BITWISE_XOR = 11;   // ^
Blockly.Arduino.ORDER_BITWISE_OR = 12;    // |
Blockly.Arduino.ORDER_LOGICAL_AND = 13;   // &&
Blockly.Arduino.ORDER_LOGICAL_OR = 14;    // ||
Blockly.Arduino.ORDER_CONDITIONAL = 15;   // ?:
Blockly.Arduino.ORDER_ASSIGNMENT = 16;    // = += -= *= /= %= <<= >>= ...
Blockly.Arduino.ORDER_COMMA = 17;         // ,
Blockly.Arduino.ORDER_NONE = 99;          // (...)


/*
 * Arduino Board profiles
 *
 */
var profile = {
	arduino: {
		description: "Arduino standard-compatible board",
		digital : [["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"]],
		analog : [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"]],
        serial : 9600,
	},
	arduino_mega:{
		description: "Arduino Mega-compatible board",
		//53 digital
		//15 analog
	},
}
//set default profile to arduino standard-compatible board
profile["default"] = profile["arduino"];
//alert(profile.default.digital[0]);



/**
 * Initialise the database of variable names.
 */
Blockly.Arduino.init = function() {
  // Create a dictionary of definitions to be printed before the code.
  Blockly.Arduino.definitions_ = Object.create(null);
  // Create a dictionary of setups to be printed before the code.
  Blockly.Arduino.setups_ = Object.create(null);
  // Create a dictionary mapping desired function names in definitions_
  // to actual function names (to avoid collisions with user functions).
  Blockly.Arduino.functionNames_ = Object.create(null);
  
  Blockly.Arduino.variableTypes_ = {};
  
  if (!Blockly.Arduino.variableDB_) {
    Blockly.Arduino.variableDB_ =
        new Blockly.Names(Blockly.Arduino.RESERVED_WORDS_);
  } else {
    Blockly.Arduino.variableDB_.reset();
  }
};

/**
 * Prepend the generated code with the variable definitions.
 * @param {string} code Generated code.
 * @return {string} Completed code.
 */
Blockly.Arduino.finish = function(code) {

  
  var defvars = [];
  var variables = Blockly.Variables.allVariables();
  for (var x = 0; x < variables.length; x++) {
    var varName = Blockly.Arduino.variableDB_.getName(variables[x],
        Blockly.Variables.NAME_TYPE);
  
  console.log("finish Blockly.Arduino.variableTypes_ =", Blockly.Arduino.variableTypes_);
    
    var varType = "int";
    if(typeof Blockly.Arduino.variableTypes_ !== "undefined" && Blockly.Arduino.variableTypes_[varName])
    {
        varType = Blockly.Arduino.variableTypes_[varName];
    }
    
    defvars[x] = varType + ' ' + varName + ';';
  }
  Blockly.Arduino.definitions_['variables'] = defvars.join('\n');
  
    
  // Indent every line.
  code = '  ' + code.replace(/\n/g, '\n  ');
  code = code.replace(/\n\s+$/, '\n');
  code = 'void loop() \n{\n' + code + '\n}';

    
  
  // Convert the definitions dictionary into a list.
  var imports = [];
  var definitions = [];
  for (var name in Blockly.Arduino.definitions_) {
    var def = Blockly.Arduino.definitions_[name];
    if (def.match(/^#include/)) {
      imports.push(def);
    } else {
      definitions.push(def);
    }
  }
  
  // Convert the setups dictionary into a list.
  var setups = [];
  for (var name in Blockly.Arduino.setups_) {
    setups.push(Blockly.Arduino.setups_[name]);
  }
  
  var allDefs = imports.join('\n') + '\n' + definitions.join('\n') + '\nvoid setup() \n{\n  '+setups.join('\n  ') + '\n}';//+ '\n';
  return allDefs.replace(/\n\n+/g, '\n\n').replace(/\n*$/, '\n\n\n') + code;
};


/**
 * Naked values are top-level blocks with outputs that aren't plugged into
 * anything.  A trailing semicolon is needed to make this legal.
 * @param {string} line Line of generated code.
 * @return {string} Legal line of code.
 */
Blockly.Arduino.scrubNakedValue = function(line) {
  return line + ';\n';
};

/**
 * Encode a string as a properly escaped Arduino string, complete with
 * quotes.
 * @param {string} string Text to encode.
 * @return {string} Arduino string.
 * @private
 */
Blockly.Arduino.quote_ = function(string) {
  // TODO: This is a quick hack.  Replace with goog.string.quote
  string = string.replace(/\\/g, '\\\\')
                 .replace(/\n/g, '\\\n')
                 .replace(/'/g, '\\\'');
  return '\'' + string + '\'';
};

/**
 * Common tasks for generating Arduino from blocks.
 * Handles comments for the specified block and any connected value blocks.
 * Calls any statements following this block.
 * @param {!Blockly.Block} block The current block.
 * @param {string} code The Arduino code created for this block.
 * @return {string} Arduino code with comments and subsequent blocks added.
 * @private
 */
Blockly.Arduino.scrub_ = function(block, code) {
  var commentCode = '';
  // Only collect comments for blocks that aren't inline.
  if (!block.outputConnection || !block.outputConnection.targetConnection) {
    // Collect comment for this block.
    var comment = block.getCommentText();
    if (comment) {
      commentCode += Blockly.Arduino.prefixLines(comment, '// ') + '\n';
    }
    // Collect comments for all value arguments.
    // Don't collect comments for nested statements.
    for (var x = 0; x < block.inputList.length; x++) {
      if (block.inputList[x].type == Blockly.INPUT_VALUE) {
        var childBlock = block.inputList[x].connection.targetBlock();
        if (childBlock) {
          var comment = Blockly.Arduino.allNestedComments(childBlock);
          if (comment) {
            commentCode += Blockly.Arduino.prefixLines(comment, '// ');
          }
        }
      }
    }
  }
  var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  var nextCode = Blockly.Arduino.blockToCode(nextBlock);
  return commentCode + code + nextCode;
};
