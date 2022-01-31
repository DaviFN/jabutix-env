// some colors config for the blocks
Blockly.HSV_SATURATION = 0.8
Blockly.HSV_VALUE = 0.6

var demoWorkspace = Blockly.inject('blocklyDiv',
            {media: 'https://unpkg.com/blockly/media/',
             toolbox: document.getElementById('toolbox')});
        Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'),
                                   demoWorkspace);

function currentNumberOfBlocksInProgram() {
  return demoWorkspace.getAllBlocks(false).length;
}
    
var outputArea = document.getElementById('output');
var executeButton = document.getElementById('executeButton');
var stepCodeCheckbox = document.getElementById('stepCode');
var userWantsToStopExecution = false;
var myInterpreter = null;
var onExecuteCode = false;

function stepCodeCheckboxClicked() {
  var executeButton = document.getElementById('executeButton');
  if(stepCodeCheckbox.checked) {
    executeButton.innerText = "Executar bloco";
  }
  else {
    executeButton.innerText = "Executar programa";
  }
}

function printToOutputArea(text) {
  outputArea.value += text + '\n';
}

function initApi(interpreter, globalObject) {
  // Add an API function for the alert() block, generated for "text_print" blocks.
  interpreter.setProperty(globalObject, 'alert',
      interpreter.createNativeFunction(function(text) {
    text = arguments.length ? text : '';
    printToOutputArea(text);
  }));
  
  // Add an API function for the prompt() block.
  var wrapper = function(text) {
    return interpreter.createPrimitive(prompt(text));
  };
  interpreter.setProperty(globalObject, 'prompt',
      interpreter.createNativeFunction(wrapper));
  
  // Add an API function for highlighting blocks.
  var wrapper = function(id) {
    id = String(id || '');
    return interpreter.createPrimitive(highlightBlock(id));
  };
  interpreter.setProperty(globalObject, 'highlightBlock',
      interpreter.createNativeFunction(wrapper));

  // Add an API function for moving the Jabuti forward.
  var wrapper = function(callback) {
    return interpreter.createPrimitive(jabutiBlockCallback_moveForward(callback));
  };
  interpreter.setProperty(globalObject, 'jabutiBlockCallback_moveForward',
      interpreter.createAsyncFunction(wrapper));

  // Add an API function for moving the Jabuti to the left.
  var wrapper = function(callback) {
    return interpreter.createPrimitive(jabutiBlockCallback_moveLeft(callback));
  };
  interpreter.setProperty(globalObject, 'jabutiBlockCallback_moveLeft',
      interpreter.createAsyncFunction(wrapper));
  
  // Add an API function for moving the Jabuti to the right.
  var wrapper = function(callback) {
    return interpreter.createPrimitive(jabutiBlockCallback_moveRight(callback));
  };
  interpreter.setProperty(globalObject, 'jabutiBlockCallback_moveRight',
      interpreter.createAsyncFunction(wrapper));

      // Add an API function for waiting some time.
  var wrapper = function(timeInSeconds, callback) {
    return interpreter.createPrimitive(customblock_wait_callback(timeInSeconds, callback));
  };
  interpreter.setProperty(globalObject, 'customblock_wait_callback',
      interpreter.createAsyncFunction(wrapper));


  // adding function signatures for the function callbacks from sign verification blocks
  var wrapper = function(text) {
    return interpreter.createPrimitive(jabutiBlockCallback_jabuti_sees_left_sign_ahead());
  };
  interpreter.setProperty(globalObject, 'jabutiBlockCallback_jabuti_sees_left_sign_ahead',
  interpreter.createNativeFunction(wrapper));

  var wrapper = function(text) {
    return interpreter.createPrimitive(jabutiBlockCallback_jabuti_sees_right_sign_ahead());
  };
  interpreter.setProperty(globalObject, 'jabutiBlockCallback_jabuti_sees_right_sign_ahead',
  interpreter.createNativeFunction(wrapper));
  
}

var latestCode = '';

function customblock_wait_callback(timeInSeconds, callback) {
  //if(typeof timeInSeconds == "string" || timeInSeconds < 0) timeInSeconds = 0;
  //alert("on customblock_wait_callback")
  printToOutputArea("waiting for " + timeInSeconds + " seconds...\n");
  //callback();
  setTimeout(callback, timeInSeconds * 1000);
}

function highlightBlock(id) {
  demoWorkspace.highlightBlock(id);
  highlightPause = true;
}

function resetExecutionUi(clearOutput) {
  demoWorkspace.highlightBlock(null);
  highlightPause = false;

  if (clearOutput) {
    outputArea.value = '';
  }
}

function generateCodeAndLoadIntoInterpreter() {
  // Generate JavaScript code and parse it.
  Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
  Blockly.JavaScript.addReservedWords('highlightBlock');
  latestCode = Blockly.JavaScript.workspaceToCode(demoWorkspace);
  resetExecutionUi(true);
}

function executeButtonCallback() {
  if(gamification.canExecuteCodeCheck()) {
    executeCode();
  }

}

function executeCode() {

  onExecuteCode = true;

  if (!myInterpreter) {
    // First statement of this code.
    // Clear the program output.
    resetExecutionUi(true);
    userWantsToStopExecution = false;
    myInterpreter = new Interpreter(latestCode, initApi);

    // And then show generated code in an alert.
    // In a timeout to allow the outputArea.value to reset first.
    setTimeout(function() {
      alert('Prestes a interpretar o código JavaScript gerado:\n' +
        '===================================\n' + latestCode);
      highlightPause = true;
      executeCode();
    }, 1);
    return;
  }
  highlightPause = false;
  runner = function() {
    //alert("on runner")
    //do {
      try {
        var hasMoreCode = myInterpreter.step();
      } finally {
        if (!hasMoreCode) {
          // Program complete, no more code to execute.
          //alert("!hasMoreCode")
          outputArea.value += '\n<< Programa executado >>';

          finishExecution();

          // Cool down, to discourage accidentally restarting the program.
          executeButton.disabled = 'disabled';
          setTimeout(function() {
            executeButton.disabled = '';
          }, 2000);

          return;
        }
      }
      // Keep executing in certain conditions
    //}
    //while (!userWantsToStopExecution && hasMoreCode && (!stepCodeCheckbox.checked || !highlightPause));
    if (!userWantsToStopExecution && hasMoreCode && (!stepCodeCheckbox.checked || !highlightPause)) {
      setTimeout(runner, 0);
    }
  }
  runner();


  //if(userWantsToStopExecution) {
  //  outputArea.value += '\n<< Execução encerrada pelo usuário >>';
  //  finishExecution();
  //}

  onExecuteCode = false;

}

function stopCodeExecution() {
  userWantsToStopExecution = true;
  if(!onExecuteCode) {
    outputArea.value += '\n<< Execução encerrada pelo usuário >>';
    finishExecution();
  }
}

function finishExecution() {
  if(gamification.loopChallengeGoingOn) {
    if(gamification.wasLoopChallengePassed()) {
      alert("Parabéns! Você completou o desafio do loop!")
      gamification.endAllGamifications();
      simulation.resetToNormal();
    }
    else {
      alert("Infelizmente essa não é uma solução correta para o desafio do loop... tente novamente!")
      gamification.resetLoopChallenge();
    }
  }
  else if(gamification.conditionalsChallengeGoingOn){
    if(gamification.whichConditionalsChallengeMapIsItIn == 0) {
      // first map
      if(gamification.wasFirstMapOfConditionalsChallengePassed()) {
        alert("Parabéns! Essa é uma solução para o mapa 1.\nPara que seu programa seja solução do desafio das condicionais, contudo, ele também precisa ser solução do mapa 2.\nSua solução irá agora rodar no mapa 2...")
        gamification.whichConditionalsChallengeMapIsItIn = 1;
        gamification.setToSecondMap();
        myInterpreter = null;
        resetExecutionUi(false);
        setTimeout(executeButtonCallback(), 0);
        return;
      }
      else {
        alert("Infelizmente essa não é uma solução correta para o desafio das condicionais... tente novamente!")
        gamification.resetConditionalsChallenge();
      }
    }
    else {
      // second map
      if(gamification.wasSecondMapOfConditionalsChallengePassed()) {
        alert("Parabéns!! Você completou o desafio das condicionais!!")
        gamification.endAllGamifications();
        simulation.resetToNormal();
      }
      else {
        alert("Infelizmente essa não é uma solução correta para o desafio das condicionais... tente novamente!")
        gamification.resetConditionalsChallenge();
      }
    }
  }
  else if(gamification.levelGoingOn) {
      if(gamification.wasLevelPassed()) {
        alert("Parabéns!! Você completou a fase!")
        gamification.initializeLevelChallenge(gamification.levelDifficulty);
      }
      else {
        alert("Game over! Tente outra vez!")
        gamification.resetLevelChallenge();
      }
  }

  myInterpreter = null;
  resetExecutionUi(false);
}


    
// Load the interpreter now, and upon future changes.
generateCodeAndLoadIntoInterpreter();
demoWorkspace.addChangeListener(function(event) {
  if (!event.isUiEvent) {
    // Something changed. Parser needs to be reloaded.
    generateCodeAndLoadIntoInterpreter();
  }
});