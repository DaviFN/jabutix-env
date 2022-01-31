Blockly.Blocks['functions_wait'] = {
  init: function() {
    this.appendValueInput('VALUE')
    .setCheck('Number')
    .appendField("aguardar");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(0);
    this.setTooltip('Aguarda algum tempo (em segundos)');
  }
};

Blockly.JavaScript['functions_wait'] = function(block) {
  var argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE',
      Blockly.JavaScript.ORDER_FUNCTION_CALL) || '\'\'';
  //return [argument0 + '.length', Blockly.JavaScript.ORDER_MEMBER];
  return 'customblock_wait_callback(' + argument0 + ');\n';
};

Blockly.Blocks['jabuti_move_forward'] = {
    init: function() {
        this.appendDummyInput().appendField("mover à frente");
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour(0);
      this.setTooltip('Move o Jabuti à frente');
    }
};

Blockly.Blocks['jabuti_move_left'] = {
    init: function() {
        this.appendDummyInput().appendField("mover à esquerda");
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour(0);
      this.setTooltip('Move o Jabuti à esquerda');
    }
};

Blockly.Blocks['jabuti_move_right'] = {
    init: function() {
        this.appendDummyInput().appendField("mover à direita");
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour(0);
      this.setTooltip('Move o Jabuti à direita');
    }
};

Blockly.JavaScript['jabuti_move_forward'] = function(block) {
    return 'jabutiBlockCallback_moveForward();\n';
  };

Blockly.JavaScript['jabuti_move_left'] = function(block) {
  return 'jabutiBlockCallback_moveLeft();\n';
};

Blockly.JavaScript['jabuti_move_right'] = function(block) {
    return 'jabutiBlockCallback_moveRight();\n';
};

Blockly.Blocks['jabuti_sees_left_sign_ahead'] = {
  init: function() {
    this.appendDummyInput().appendField("vê placa indicando à esquerda");
    this.setOutput(true, 'Boolean');
    this.setColour(0);
    this.setTooltip('Retorna verdadeiro se o jabuti vê uma placa indicando à esquerda (no piso à sua frente)');
  }
};

Blockly.Blocks['jabuti_sees_right_sign_ahead'] = {
  init: function() {
    this.appendDummyInput().appendField("vê placa indicando à direita");
    this.setOutput(true, 'Boolean');
    this.setColour(0);
    this.setTooltip('Retorna verdadeiro se o jabuti vê uma placa indicando à direita (no piso à sua frente)');
  }
};

Blockly.JavaScript['jabuti_sees_left_sign_ahead'] = function(block) {
  return["jabutiBlockCallback_jabuti_sees_left_sign_ahead()", Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['jabuti_sees_right_sign_ahead'] = function(block) {
  return["jabutiBlockCallback_jabuti_sees_right_sign_ahead()", Blockly.JavaScript.ORDER_ATOMIC];
};