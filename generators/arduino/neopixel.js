/**
 * @fileoverview Helper functions for generating Arduino blocks.
 * @author author@email.com (Name)
 */
'use strict';

//define blocks
if (!Blockly.Language) Blockly.Language = {};



Blockly.Arduino['neopixels_attach'] = function(block) {
  var text_neo_pixel_length = block.getFieldValue('NEO_PIXEL_LENGTH');
  var dropdown_pin = block.getFieldValue('PIN');
  
  Blockly.Arduino.definitions_['Adafruit_NeoPixel_imclude'] = "#include <Adafruit_NeoPixel.h>";
  
  Blockly.Arduino.definitions_['Adafruit_NeoPixel'] = "Adafruit_NeoPixel strip = Adafruit_NeoPixel("+text_neo_pixel_length+", "+dropdown_pin+", NEO_GRB + NEO_KHZ800);";
  
  
  // TODO: Assemble JavaScript into code variable.
  var code = "";
  return code;
};

function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^\'?#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})\'?$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : {r:0, g:0, b:0};
}



Blockly.Arduino['neopixel_set'] = function(block) {
  var text_pixel_number = block.getFieldValue('pixel_number');
  
  // tODO : if they aren't set
  /*  Blockly.Arduino.definitions_['Adafruit_NeoPixel_imclude'] = "#include <Adafruit_NeoPixel.h>";
  // TODO  :check the current lenght and if one being set is longer then extend the strip
  Blockly.Arduino.definitions_['Adafruit_NeoPixel'] = "Adafruit_NeoPixel strip = Adafruit_NeoPixel("+text_neo_pixel_length+", "+dropdown_pin+", NEO_GRB + NEO_KHZ800);";
  */
  
  var value_colour = Blockly.Arduino.valueToCode(block, 'COLOUR', Blockly.Arduino.ORDER_ATOMIC);
  var colour_array= hexToRgb(value_colour);
  
  // TODO: Assemble JavaScript into code variable.
  var code = "strip.setPixelColor("+text_pixel_number+","+colour_array.r+","+colour_array.g+","+colour_array.b+");\n";
  //var code = "strip.setPixelColor("+text_pixel_number+","+colour_array.r+","+colour_array.g+","+colour_array.b+");";
  
  return code;
};


Blockly.Arduino['neopixel_eye_set'] = function(block) {
  var text_pixel_number = block.getFieldValue('pixel_number');
  
  var value_colour = Blockly.Arduino.valueToCode(block, 'COLOUR', Blockly.Arduino.ORDER_ATOMIC);
  var colour_array= hexToRgb(value_colour);
  
  // TODO: Assemble JavaScript into code variable.
  var code = "strip.setPixelColor("+text_pixel_number+","+colour_array.r+","+colour_array.g+","+colour_array.b+");\n";
  //var code = "strip.setPixelColor("+text_pixel_number+","+colour_array.r+","+colour_array.g+","+colour_array.b+");";
  
  return code;
};



Blockly.Arduino['neopixels_set'] = function(block) {
  // tODO : if they aren't set
  /*  Blockly.Arduino.definitions_['Adafruit_NeoPixel_imclude'] = "#include <Adafruit_NeoPixel.h>";
  // TODO  :check the current lenght and if one being set is longer then extend the strip
  Blockly.Arduino.definitions_['Adafruit_NeoPixel'] = "Adafruit_NeoPixel strip = Adafruit_NeoPixel("+text_neo_pixel_length+", "+dropdown_pin+", NEO_GRB + NEO_KHZ800);";
  */
  
  var value_colour = Blockly.Arduino.valueToCode(block, 'COLOUR', Blockly.Arduino.ORDER_ATOMIC);
  var colour_array= hexToRgb(value_colour);
  
  // TODO: Assemble JavaScript into code variable.
  // TODO : fix
  var code = "strip.set("+colour_array.r+","+colour_array.g+","+colour_array.b+");\n";
  //var code = "strip.setPixelColor("+text_pixel_number+","+colour_array.r+","+colour_array.g+","+colour_array.b+");";
  
  return code;
};






Blockly.Arduino['neopixels_wipe'] = function(block) {
  var text_wipe_time = block.getFieldValue('wipe_time');
  
  // tODO : if they aren't set
  /*  Blockly.Arduino.definitions_['Adafruit_NeoPixel_imclude'] = "#include <Adafruit_NeoPixel.h>";
  // TODO  :check the current lenght and if one being set is longer then extend the strip
  Blockly.Arduino.definitions_['Adafruit_NeoPixel'] = "Adafruit_NeoPixel strip = Adafruit_NeoPixel("+text_neo_pixel_length+", "+dropdown_pin+", NEO_GRB + NEO_KHZ800);";
  */
  
  var value_colour = Blockly.Arduino.valueToCode(block, 'COLOUR', Blockly.Arduino.ORDER_ATOMIC);
  var colour_array= hexToRgb(value_colour);
  
  // TODO: Assemble JavaScript into code variable.
  var code = "strip.wipe("+colour_array.r+","+colour_array.g+","+colour_array.b+","+text_wipe_time+");\n";
  //var code = "strip.setPixelColor("+text_pixel_number+","+colour_array.r+","+colour_array.g+","+colour_array.b+");";
  
  return code;
};




/*
//define read block
Blockly.Language.neopixel_read = {
  category: 'Neopixel',
  helpUrl: '',
  init: function() {
    this.setColour(230);
	this.appendDummyInput("")
	    .appendTitle("NeopixelRead PIN#")
	    .appendTitle(new Blockly.FieldDropdown(profile.default.digital), "PIN");
    this.setOutput(true, Boolean);
    this.setTooltip('input block');
  }
};

Blockly.Language.neopixel_write = {
  category: 'NeoPixel',
  helpUrl: 'http://www.seeedstudio.com/wiki/index.php?title=Twig_-_Chainable_RGB_LED',
  init: function() {
    this.setColour(190);
    this.appendDummyInput("")
  .appendTitle("NeoPixel RGB LED")
        .appendTitle(new Blockly.FieldImage("http://www.seeedstudio.com/depot/images/product/chanbalelednb1.jpg", 64, 64))
  .appendTitle("PIN#")
        .appendTitle(new Blockly.FieldDropdown(profile.default.digital), "PIN")
    this.appendDummyInput("COLOR0")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle("Color 1")
        .appendTitle(new Blockly.FieldColour("#00ff00"), "RGB0");
    this.setMutator(new Blockly.Mutator(['neopixel_item']));
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('256 color LED, currently Chainable feature is not support');
    this.itemCount_ = 1;
  },
  mutationToDom: function() {
    var container = document.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    for (var x = 0; x < this.itemCount_; x++) {
      var colour_rgb = this.getFieldValue('RGB0');
      //alert(colour_rgb);
      container.setAttribute('RGB' + x, colour_rgb);
    }
    return container;
  },
  domToMutation: function(xmlElement) {
    for (var x = 0; x < this.itemCount_; x++) {
      this.removeInput('COLOR' + x);
    }
    this.itemCount_ = window.parseInt(xmlElement.getAttribute('items'), 10);
    for (var x = 0; x < this.itemCount_; x++) {
      var color = window.parseInt(xmlElement.getAttribute('RGB'+x), "#00ff00");
      var input = this.appendDummyInput('COLOR' + x);
      //if (x == 0) {
        input.setAlign(Blockly.ALIGN_RIGHT)
             .appendTitle("Color "+(x+1))
             .appendTitle(new Blockly.FieldColour(color), "RGB" + x);
      //}
    }
    if (this.itemCount_ == 0) {
      this.appendDummyInput('COLOR0')
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendTitle("Color 1")
          .appendTitle(new Blockly.FieldColour("#00ff00"), "RGB0");
    }
  },
  decompose: function(workspace) {
    var containerBlock = new Blockly.Block(workspace,
                                           'neopixel_container');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var x = 0; x < this.itemCount_; x++) {
      var itemBlock = new Blockly.Block(workspace, 'neopixel_item');
      itemBlock.initSvg();
      connection.connect(itemBlock.previousConnection);
      connection = itemBlock.nextConnection;
    }
    return containerBlock;
  },
  compose: function(containerBlock) {
    // Disconnect all input blocks and remove all inputs.
    if (this.itemCount_ == 0) {
      this.removeInput('COLOR0');
    } else {
      for (var x = this.itemCount_ - 1; x >= 0; x--) {
        //console.log("cnt:"+x);
        this.removeInput('COLOR' + x);
      }
    }

    this.itemCount_ = 0;
    // Rebuild the block's inputs.
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    while (itemBlock) {
      var colour_rgb = this.getFieldValue('RGB' + this.itemCount_);
      if(colour_rgb==null){
          colour_rgb = "00ff00";
      }
      //console.log("blk:"+this.itemCount_);
      //if(top>this.itemCount_){
      //  this.removeInput('COLOR' + this.itemCount_);
      //}
      var input = this.appendDummyInput('COLOR' + this.itemCount_);
      //if (this.itemCount_ == 0) {
        input.setAlign(Blockly.ALIGN_RIGHT)
             .appendTitle("Color " + (this.itemCount_+1))
             .appendTitle(new Blockly.FieldColour(colour_rgb), "RGB" + this.itemCount_);
      //}
      // Reconnect any child blocks.
      if (itemBlock.valueConnection_) {
        input.connection.connect(itemBlock.valueConnection_);
      }
      this.itemCount_++;
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
    if (this.itemCount_ == 0) {
      this.appendDummyInput('COLOR0')
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendTitle("Color 1")
          .appendTitle(new Blockly.FieldColour("#00ff00"), "RGB0");
    }
  },
  //saveConnections: function(containerBlock) {
    // Store a pointer to any connected child blocks.
  //  var itemBlock = containerBlock.getInputTargetBlock('STACK');
  //  var x = 0;
  //  while (itemBlock) {
  //    var input = this.getInput('COLOR' + x);
  //   itemBlock.valueConnection_ = input && input.connection.targetConnection;
  //    x++;
  //    itemBlock = itemBlock.nextConnection &&
  //        itemBlock.nextConnection.targetBlock();
  //  }
  }
};

Blockly.Language.neopixel_container = {
  // Container.
  init: function() {
    this.setColour(190);
    this.appendDummyInput()
        .appendTitle("Container");
    this.appendStatementInput('STACK');
    this.setTooltip("Add, remove items to reconfigure this chain");
    this.contextMenu = false;
  }
};

Blockly.Language.neopixel_item = {
  // Add items.
  init: function() {
    this.setColour(190);
    this.appendDummyInput()
        .appendTitle("Item");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("Add an item to the chain");
    this.contextMenu = false;
  }
};
*/

/*
//define write block
Blockly.Language.neopixel_write = {
  category: 'Neopixel',
  helpUrl: '',
  init: function() {
    this.setColour(230);
	this.appendDummyInput("")
	    .appendTitle("NeopixelWrite PIN#")
	    .appendTitle(new Blockly.FieldImage("http://www.seeedstudio.com/wiki/images/thumb/e/e0/LED1.jpg/400px-LED1.jpg", 64, 64))
	    .appendTitle(new Blockly.FieldDropdown(profile.default.analog), "PIN")
	    .appendTitle("value");
	this.appendValueInput("NUM", Number);
	this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Output block');
  }
};



// define generators
Blockly.Arduino.neopixel_write = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  var value_num = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_ATOMIC);

  var code = 'analogWrite('+dropdown_pin+','+value_num+');\n';
  return code;
};

Blockly.Arduino.neopixel_read = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  
  // Blockly.Arduino.definitions_['define_neopixel_read'] = '#include &lt;Servo.h&gt;\n';
  // Blockly.Arduino.definitions_['var_neopixel_read'+dropdown_pin] = 'Servo servo_'+dropdown_pin+';\n';
  // Blockly.Arduino.setups_['setup_neopixel_read_'+dropdown_pin] = 'servo_'+dropdown_pin+'.attach('+dropdown_pin+');\n';
  
  var code = 'analogRead('+dropdown_pin+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


*/
