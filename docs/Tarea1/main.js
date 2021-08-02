/*

***** ***** ***** STATES DESCRIPTION ***** ***** ***** 

No.     A           B           Location    ACTION
0       DIRTY       DIRTY       A           LIMPIAR
1       DIRTY       DIRTY       B           LIMPIAR
2       DIRTY       CLEAN       A           LIMPIAR
3       DIRTY       CLEAN       B           MOVE TO A
4       CLEAN       DIRTY       A           MOVE TO B
5       CLEAN       DIRTY       B           LIMPIAR
6       CLEAN       CLEAN       A           MOVE TO B
7       CLEAN       CLEAN       B           MOVE TO A

*/
function printState(state, stateA, stateB, location, action){
    document.getElementById("log").innerHTML+="<br>***** *****  *****  ***** <br>Estado: ".concat(state);
    document.getElementById("log").innerHTML+="<br>Location: ".concat(location);
    document.getElementById("log").innerHTML+="<br>A: ".concat(stateA);
    document.getElementById("log").innerHTML+="<br>B: ".concat(stateB);
    document.getElementById("log").innerHTML+="<br>Action: ".concat(action);
}

function reflex_agent(location, stateA, stateB, visits){
    if (stateA=="DIRTY" && stateB=="DIRTY" && location == "A") {
        visits[0] += 1;
        printState(1, stateA, stateB, location, "Limpiar A");
        return "CLEAN";
    } else if (stateA=="DIRTY" && stateB=="DIRTY" && location == "B") {
        visits[1] += 1;
        printState(2, stateA, stateB, location, "Limpiar B");
        return "CLEAN";
    } else if (stateA=="DIRTY" && stateB=="CLEAN" && location == "A") {
        visits[2] += 1;
        printState(3, stateA, stateB, location, "Limpiar A");
        return "CLEAN";
    } else if (stateA=="DIRTY" && stateB=="CLEAN" && location == "B") {
        visits[3] += 1;
        printState(4, stateA, stateB, location, "Mover a A");
        return "LEFT";
    } else if (stateA=="CLEAN" && stateB=="DIRTY" && location == "A") {
        visits[4] += 1;
        printState(5, stateA, stateB, location, "Limpiar B");
        return "RIGHT";
    } else if (stateA=="CLEAN" && stateB=="DIRTY" && location == "B") {
        visits[5] += 1;
        printState(6, stateA, stateB, location, "Limpiar B");
        return "CLEAN";
    } else if (stateA=="CLEAN" && stateB=="CLEAN" && location == "A") {
        visits[6] += 1;
        printState(7, stateA, stateB, location, "Mover a B");
        return "RIGHT";
    } else if (stateA=="CLEAN" && stateB=="CLEAN" && location == "B") {
        visits[7] += 1;
        printState(8, stateA, stateB, location, "Mover a A");
        return "LEFT";
    }
}

function printVisits(visits){
    document.getElementById("log").innerHTML += "<br>";
    for(let i = 0 ; i< visits.length ; i++){
        let visita = "<br>Estado " + (i+1) + " : " + visits[i] + " veces.";
        document.getElementById("log").innerHTML += visita;
    }
    document.getElementById("log").innerHTML += "<br>";
}

function ensuciar(states){
    let aleatorioA = Math.random() * 10;
    let aleatorioB = Math.random() * 10;
    let probability = 3.5;
    if(aleatorioA <= probability) states[1] = "DIRTY";
    if (aleatorioB <= probability ) states[2] = "DIRTY";
}

function test(states, visits){
    
    var location = states[0];		
    var state = states[0] == "A" ? states[1] : states[2];
    var action_result = reflex_agent(location, states[1], states[2], visits);
    if (action_result == "CLEAN"){
      if (location == "A") states[1] = "CLEAN";
       else if (location == "B") states[2] = "CLEAN";
    }
    else if (action_result == "RIGHT") states[0] = "B";
    else if (action_result == "LEFT") states[0] = "A";

    printVisits(visits);

    //simulacion del ciclo
    setTimeout(
        function(){ 
            let bandera = false;
            for(let i = 0; i < visits.length; i++){
                if (visits[i] < 2) {
                    bandera = true;
                }
            }
            if (bandera) {
                test(states, visits); 
                ensuciar(states);
            } else {
                document.getElementById("log").innerHTML += "<br> SE VISITÓ CADA ESTADO AL MENOS 2 VECES";
            }
        }, 
        500
    );
}

var states = ["A","DIRTY","DIRTY"];
var visits = [0,0,0,0,0,0,0,0];
test(states, visits);