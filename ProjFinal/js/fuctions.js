function updateWindowDimension() {
    dX  = window.innerWidth;
    dY  = 10000;
}

function loadBounds(){     
      const esp = 100
      var walls = [];

      for(var i=0; i<2; i++){
        bound.push(new boundRect (200, i));
        walls.push(bound[i].rect);
      }

      console.log(walls);
      World.add(engine.world, walls); 

}

function createBoings(){
    var boins = [];

    for(var i = 0; i < 1; i++){
        allBoings.push(new boing ([dX/2 , 300], 30, 60, 30, 10));
        boins.push(allBoings[i].corpoBoing);
    }

    console.log("aaiiiiii");
    console.log(boins, "aaiiiiii");
    World.add(engine.world, boins);

}


function calculateDistance(x1, y1, x2, y2) {
    const deltaX = x2 - x1;
    const deltaY = y2 - y1;

    const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

    return distance;
}





function loadEntradas(){
    //load svg 
    var arcSvg = document.querySelector("svg");
    var arcbox = arcSvg.getBBox();
    console.log(arcbox.x, arcbox);

    //variables aux 
    var perDist = 1./(paginasCont.src.length+1);
    var realDist =  dX*perDist;
    var perScale = 0.18;
    var perScaleR = 0.015;

    var arc = document.querySelector("svg path");

    for(var i=1; i<=4; i++){
        
        const body = Matter.Bodies.fromVertices(i*realDist, dY-100, Matter.Svg.pathToVertices(arc), {isStatic: true},true);
        console.log(body);
        Matter.Body.scale(body, (perScale*dX/arcbox.width),(perScale*dX/arcbox.height*0.33));
        World.add(engine.world, body);
        entr.push(new buraco( body, perScaleR*dX,i));
        console.log(entr);
    }
}

function removeBall(a){
    World.remove(engine.world,balls[a].bol);
    balls.splice(a,1);
    console.log(engine.world.bodies.length);
}

function loadPins(){
            //pins 
            var space = 60;
            var nColunaPins = 4;
            var desvioY = dY-600;
            var pinR = 8;
            var ajustXgrid = pinR+(space/4);
            var nLinhaPins = dX/space;
    //var margin = [0,0,400,350]; 

    for(var j=0; j<nColunaPins; j++){
        //iniciar Subway
        pins[j] = [];
        console.log(pinR); 
        for(var i=0; i<nLinhaPins; i++){
            var xPin = i*space+ajustXgrid;
            var yPin = j*space + desvioY;
            
                if(j%2==0){ 
                xPin+=space/2;
                }
                if(xPin + pinR < dX){
                    pins[j].push(Bodies.circle(xPin, yPin,pinR,{isStatic: true,render: {
                        fillStyle: '#3C3C40',
                        strokeStyle: '#3C3C40',
                        lineWidth: 0
                } }));
                    //console.log(xPin,dX);   
                }
        }
        World.add(engine.world, pins[j]);
    }
    
}

function UpdatePins(){

            //pins 
            var nColunaPins = 4;
            var space = 60;
            var pinR = 8;
            var ajustXgrid = pinR+(space/4);


    var compLinha = pins[1].length*space+ajustXgrid;
    var numAltera = 0; 
    var pinsAdd =[];

    console.log("compr : " + compLinha, dX);
    //console.log(compLinha<=dX);
    if(compLinha<=dX){
        //space * 2 para criar atras da area que irá abrir 
       numAltera = Math.round((dX+(space*2)-compLinha)/space);
    
       for(var j=0; j<nColunaPins; j++){
          pinsAdd[j] = []; 
        for(var i=0; i<numAltera; i++){ 
            var xPin = pins[j][pins[j].length-1].position.x + i * space;  //selecionar o x do ultimo do array pra fazer ajustes a grelha
            var yPin = pins[j][pins[j].length-1].position.y;

            if(xPin + pinR <= dX+(space*2)){
                //console.log("update");
                pinsAdd[j].push(Bodies.circle(xPin, yPin,pinR,{isStatic: true,render: {
                    fillStyle: '#3C3C40',
                    strokeStyle: '#3C3C40',
                    lineWidth: 0
                }}));
          }
        }
        World.add(engine.world, pinsAdd[j]);
        pins.concat(pinsAdd); 
        }
    }
}

var paginasCont = {src:["https://student.dei.uc.pt/~brunosimoes/LORAX/LORAX/","https://student.dei.uc.pt/~brunosimoes/Projeto_Meta_3/Site/HomePage.html","https://student.dei.uc.pt/~brunosimoes/The-Great-Automatic-Grammatizator-P3/","https://student.dei.uc.pt/~brunosimoes/Projeto1-CCDM-Grupo_Bruno_Gabriela_Francisca_/html/Inicio.html"] , placeOlder:["Lorax","Museu Ciencia UC","Gramatizator","CCDM"]};

function ButtonRedirect(num){
    window.open(paginasCont.src[num]);
}
