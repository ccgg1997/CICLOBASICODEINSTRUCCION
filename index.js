const prompt = require('prompt-sync')({ sigint: true });
const fs = require('fs');


var programCounter = 0;
var ACC = null; //ACUMULADOR
var ICR = null; //ICR
var MAR = null; //MAR
var MDR = null; //MDR
var UC = null; //UNIDAD DE CONTROL
var memory = new Map();
const instructionFile = 'input.txt';


function main() {
    // console.log("Running");
    let instructionSet = readInscructionsFromFile();
    let instructionSize = instructionSet.length;
    let instruction = "";
    while (instruction != "END" && programCounter < instructionSize){
        let instructionLine = instructionSet.shift();
        let instructionBlock = instructionLine.split(' ');
        instruction = instructionBlock.shift();
        programCounter++;
        // console.log("Comando ->", instruction)
        executeCommand(instruction, instructionBlock);
    }
    return;
}

function executeCommand(instruction, params) {
    ICR = instruction + ' ' + params[0];
    UC = ICR;
    switch (instruction) {
        case 'SET':
            MAR = params[0];
            MDR = params[1];
            memory.set(MAR, Number(MDR));
            break;
        case 'ADD':            
            addImplement((params));
            break;
        case 'SUB':            
            subImplement((params));
            break;
        case 'MUL':            
            mulImplement((params));
            break;
        case 'DIV':            
            divImplement((params));
            break;
        case 'INC':
            MAR = params[0];
            ACC = memory.get(MAR)+1;
            MAR = params[0];
            MDR = memory.get(MAR);
            memory.set(MAR, ACC);
            break;
        case 'DEC':       
            MAR = params[0];
            ACC= memory.get(MAR)-1;
            MAR = params[0];
            MDR = memory.get(MAR);
            memory.set(MAR, ACC);
            break;
        case 'MOV':
            MDR = memory.get(params[0]);
            MAR = params[1];
            memory.set(MAR, MDR);
            memory.delete(MDR);
            MDR =memory.get(MAR);
            break;
        case 'STR':
            MAR = params[0];
            memory.set(MAR, ACC);
            MDR = memory.get(MAR);
            break;
        case 'LDR':
            MAR = params[0];
            ACC = memory.get(MAR);
            MDR = memory.get(MAR);
            break;
        case 'SHW':
            MAR = params[0];
            MDR = shwImplement(MAR);
            console.log(MDR);
            break;
        case 'END':
            break;
    }
}

function isInstruction(input) {
    return isNaN(Number(input));
}

function addImplement(params){
  if(params[2] != 'NULL'){
            MAR = params[0];
            ACC = memory.get(MAR);
            MAR = params[1];
            ACC = ACC +memory.get(MAR)
            MDR = ACC;
            MAR = params[2];
            memory.set(MAR, MDR);
  }else if(params[1] != 'NULL'){
            MAR = params[0];
            ACC = memory.get(MAR) ;
            MAR = params[1]
            ACC = ACC + memory.get(MAR)
            
            MDR = memory.get(MAR);
  } else {
            MAR = params[0];
            ACC = memory.get(MAR) + ACC;
            MAR = params[1];
            MDR = memory.get(MAR);
  }
}

function subImplement(params){
  if(params[2] != 'NULL'){
            MAR = params[0];
            ACC = memory.get(MAR);
            MAR = params[1];
            ACC = ACC - memory.get(MAR)
            MDR = ACC;
            MAR = params[2];
            memory.set(MAR, MDR);
  }else if(params[1] != 'NULL'){
            MAR = params[0];
            ACC = memory.get(MAR) ;
            MAR = params[1]
            ACC = ACC - memory.get(MAR)
            
            MDR = memory.get(MAR);
  } else {
            MAR = params[0];
            ACC = memory.get(MAR) - ACC;
            MAR = params[1];
            MDR = memory.get(MAR);
  }
}

function mulImplement(params){
  if(params[2] != 'NULL'){
            MAR = params[0];
            ACC = memory.get(MAR);
            MAR = params[1];
            ACC = ACC * memory.get(MAR)
            MDR = ACC;
            MAR = params[2];
            memory.set(MAR, MDR);
  }else if(params[1] != 'NULL'){
            MAR = params[0];
            ACC = memory.get(MAR) ;
            MAR = params[1]
            ACC = ACC * memory.get(MAR)
            
            MDR = memory.get(MAR);
  } else {
            MAR = params[0];
            ACC = memory.get(MAR) * ACC;
            MAR = params[1];
            MDR = memory.get(MAR);
  }
}

function divImplement(params){
  if(params[2] != 'NULL'){
            MAR = params[0];
            ACC = memory.get(MAR);
            MAR = params[1];
            ACC = ACC / memory.get(MAR)
            MDR = ACC;
            MAR = params[2];
            memory.set(MAR, MDR);
  }else if(params[1] != 'NULL'){
            MAR = params[0];
            ACC = memory.get(MAR) ;
            MAR = params[1]
            ACC = ACC / memory.get(MAR)
            
            MDR = memory.get(MAR);
  } else {
            MAR = params[0];
            ACC = memory.get(MAR) / ACC;
            MAR = params[1];
            MDR = memory.get(MAR);
  }
}

function shwImplement(type) {
    let valueToShow;
    switch (type) {
        case 'ACC':
            valueToShow = ACC;
            break;
        case 'ICR':
            valueToShow = ICR;
            break;
        case 'MAR':
            valueToShow = MAR;
            break;
        case 'MDR':
            valueToShow = MDR;
            break;
        case 'UC':
            valueToShow = UC;
            break;
        default:
            valueToShow = memory.get(type);
            break;
    }
    return valueToShow;
}

function readInscructionsFromFile(){
  try {
    const data = fs.readFileSync(instructionFile, 'utf8');
    return stringToStrunctionSet(data);
  } catch (err) {
    console.error(err);
  }
}

function stringToStrunctionSet(text){
  try {
    return text.split("\n");
  } catch (err) {
    console.error(err);
  }
}


main();