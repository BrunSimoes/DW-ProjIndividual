///////////////////////////////////////CLASS COM MUITA PINTA
/////////////////CLASS DA BOLADA 
class bolas{
    constructor(bol){
        this.bol=bol;
        this.x = this.bol.position.x;
        this.y = this.bol.position.y;
    }

    outOfBounds(){
      //Ativated when OUT SIDE
      var x1 =this.bol.position.x;
      var y1 =this.bol.position.y;
      var r = this.bol.circleRadius;

      return (x1+r<=0 || x1-r>dX || y1+r<=0 || y1-r>dY);
    }

    update(scale1){
        //console.log(scale1);
        Matter.Body.scale(this.bol ,scale1,scale1);

        const newX = this.bol.position.x * scale1;
        const newY = this.bol.position.y * scale1;

        Matter.Body.setPosition(this.bol, { x: newX, y: newY });
        this.x=this.bol.position.x;
        this.y=this.bol.position.y;
    }
}

class boing{
    constructor(pos,r,rM,rm,rV){

        this.x=pos[0];
        this.y=pos[1];
        this.r=r;
        this.rM = rM;
        this.rm = rm;
        this.rV = rV;
        this.status = -1;

         this.corpoBoing =  Bodies.circle( this.x, this.y, this.r,{isStatic: true, restitution: 1 , render: {
            fillStyle: '#CC2936',
            strokeStyle: '#CC2936',
            lineWidth: 0
            } });

        //this.corpoBoing.restitution(1);
    }

    update(scale1){
        //console.log(scale1);
        Matter.Body.scale(this.corpoBoing ,scale1,scale1);

        const newX = this.corpoBoing.position.x * scale1;
        const newY = this.corpoBoing.position.y * scale1;

        Matter.Body.setPosition(this.corpoBoing, { x: newX, y: newY });
        this.x=this.corpoBoing.position.x;
        this.y=this.corpoBoing.position.y;
    }

    debug(pos1){
        //console.log(calculateDistance(this.x,this.y,pos1[0], pos1[1]));
    }

    hit(pos1){
        //return se da hit a um objeto ou nao 
        //console.log(calculateDistance(this.x,this.y,pos1[0], pos1[1])<=this.rM, calculateDistance(this.x,this.y,pos1[0], pos1[1]),this.rM);
        return (calculateDistance(this.x,this.y,pos1[0], pos1[1])<=this.rM);
    }

    setAction(hit){
        if(this.status===-1){
         this.status = 0;
        }
    }

    getBig(){
        if(this.status!==-1){
            var raux = this.r;
            if(this.r + this.rV <= this.rM && this.status===0){
                this.r += this.rV;
            }else if(this.r + this.rV >= this.rm && this.status===0){
                this.status=1;
                this.rV*=-1;
                //console.log(this.rV,this.r,this.rM);
            }else if(this.r + this.rV >= this.rm && this.status===1){
                console.log(this.rm , this.r);
                this.r += this.rV;
            }else if(this.r <= this.rm && this.status===1){
                this.status=-1;
                this.rV*=-1;
            }

            this.scale = this.r/raux; //antiga com a atualz
            //console.log(this.r,"isto e o raio do boing");

            Matter.Body.scale(this.corpoBoing ,this.scale,this.scale);
            console.log(this.rV,this.r,this.rM,this.status);
         }
        }


}

/////////////////CLASS DE BURACO

class buraco{
    constructor(arc,r,id){
        this.arc=arc;
        this.id=id;
        this.x = this.arc.position.x;
        this.y = this.arc.position.y;
        this.r = r; 
        this.time= 0;
    }

    hitHole(bX,bY){
        //Dist. Euclad. Formul.
        var dist = Math.sqrt(Math.pow((bX - this.x),2) + Math.pow((bY - (this.y)),2));
        //ACTIVATED WHEN IN SIDE
        //return true quando dentro da area 
        //return (dist<=this.r && dist>=0);    
        if(dist<=this.r && dist>=0){
           this.time++;
        }else{
           this.time=0;
        }

        if(this.time>=1){
            this.time=0;
            if(this.id===0){
              points+=750;
            }else if(this.id===1){
              points+=2000;
            }else if(this.id===2){
              points+=5000;
            }else if(this.id===3){
              points+=9500;
            }else{
              points+=500;
            }

            console.log(points);
            if(hightPoints<=points){
                hightPoints=points;
                caixaHight.innerText=hightPoints;
            }
            return true;
        }
    }

    update(scale1){
        //console.log(scale1);
        Matter.Body.scale(this.arc ,scale1,scale1);

        const newX = this.arc.position.x * scale1;
        const newY = this.arc.position.y * scale1;

        Matter.Body.setPosition(this.arc, { x: newX, y: this.arc.position.y });
        this.x=this.arc.position.x;
        //this.y=this.arc.position.y;

        this.r=this.r*scale1;
    }

}

class boundRect{
    constructor(esp,nRect){
        this.nRect = nRect; //rect/bound id

        if(nRect===0){
            this.rect = Bodies.rectangle(-esp/2, dY / 2, esp, dY, wallOptions); // Esquerda
        }else if(nRect===1){
            this.rect = Bodies.rectangle(window.innerWidth+esp/2, dY / 2, esp, dY, wallOptions); // Direita
        }

    } 

    updtateDimensionW(scale1){
            Matter.Body.scale(this.rect,scale1,1);

            const newX = this.rect.position.x * scale1;
            const newY = this.rect.position.y * scale1;

            Matter.Body.setPosition(this.rect, { x: newX, y: this.rect.position.y });
            this.x=this.rect.position.x;
    }

    
}


class linhaPins{
    constructor(nLinhas, space, posasd, raio){
        this.barlePins=[];
        this.PinsAdd=[];
       
        this.nLinhas=dX/space;
        this.ncolunas=nLinhas;
        this.pos=posasd;
        this.raio=raio;
        this.space=space;

        this.ajustXgrid = this.raio+(this.space/4);
        
           for(var j=0; j<this.ncolunas; j++){
               this.barlePins[j] = [];
               this.PinsAdd[j] = [];
               for(var i=0; i<this.nLinhas; i++){
                   var xPin = i*this.space + this.pos[0] + this.ajustXgrid;
                   console.log(xPin);
                   var yPin = j*this.space + this.pos[1];
                   
                       if(j%2==0){ 
                         xPin+=this.space/2;
                       }
                       if(xPin + this.raio < dX){
                           this.barlePins[j].push(Bodies.circle(xPin, yPin,this.raio,{isStatic: true,render: {
                            fillStyle: '#3C3C40',
                            strokeStyle: '#3C3C40',
                            lineWidth: 0} }));
                       }
               }
               World.add(engine.world, this.barlePins[j]);
          }
   }

   updateGrid(){
       var compLinha = this.barleBoings[0].length*this.space+this.ajustXgrid;
       var numAltera = 0; 
       this.boingAdd = [];

       console.log("compr : " + compLinha, dX);
       //console.log(compLinha<=dX);
       if(compLinha<=dX){
           //space * 2 para criar atras da area que irá abrir 
          numAltera = Math.round((dX+(this.space*2)-compLinha)/this.space);
       
          for(var j=0; j<this.ncolunas; j++){
           this.boingAdd[j] = []; 
           for(var i=0; i<numAltera; i++){ 

               console.log()
               var xPin = this.barlePins[j][this.barlePins[j].length-1].position.x + i * this.space;  //selecionar o x do ultimo do array pra fazer ajustes a grelha
               var yPin = this.barlePins[j][this.barlePins[j].length-1].position.y;
   
               if(xPin + this.raio <= dX+(this.space*2)){
                   this.boingAdd[j].push(Bodies.circle(xPin, yPin,this.raio,{isStatic: true,render: {
                    fillStyle: '#3C3C40',
                    strokeStyle: '#3C3C40',
                    lineWidth: 0} }));
             }
           }
           for(var i=0; i<numAltera; i++){ 
               console.log(this.boingAdd[j]);
              World.add(engine.world, this.boingAdd[j][i]);
           }
           this.barlePins[j].concat(this.boingAdd[j]); 
           console.log(this.barlePins[j].length); 
           }
       }
   }
}


class linhaBoings{
    constructor(nLinhas, space, posasd, raio){
         this.barleBoings=[];
         this.boindAdd=[];

         this.boingAdd =[];
         this.boingsNew = [];
        
         this.nLinhas=dX/space;
         this.ncolunas=nLinhas;
         this.pos=posasd;
         this.raio=raio;
         this.space=space;
         
            for(var j=0; j<this.ncolunas; j++){
                this.barleBoings[j] = [];
                this.boindAdd[j] = [];
                for(var i=0; i<this.nLinhas; i++){
                    var xPin = i*this.space + this.pos[0];
                    console.log(xPin);
                    var yPin = j*this.space + this.pos[1];
                    
                        if(j%2!=0){ 
                        xPin+=this.space/2;
                        }
                        if(xPin + this.raio < dX){
                            this.barleBoings[j].push(new boing ([xPin , yPin], this.raio, this.raio*2, this.raio, this.raio/3));
                            console.log(this.barleBoings[j][i]);
                            this.boindAdd[j].push(this.barleBoings[j][i].corpoBoing);  
                        }
                }
                World.add(engine.world, this.boindAdd[j]);
           }
    }

    moveBoings(){
        for(var j=0; j<this.ncolunas; j++){
            for(var i=0; i<this.barleBoings[j].length; i++){
                if(this.barleBoings[j][i].status !=-1){
                    console.log(this.barleBoings[j][i]);
                    this.barleBoings[j][i].getBig();
                }
        }
      } 
    }

    setMoveBoings(){
        if(balls.length>0){
            for(var k=balls.length-1; k>=0; k--){
                
                for(var j=0; j<this.ncolunas; j++){
                    for(var i=0; i<this.barleBoings[j].length; i++){
                        if(this.barleBoings[j][i].hit([balls[k].bol.position.x, balls[k].bol.position.y])){
                            this.barleBoings[j][i].setAction(true);
                            points+=50;
                        }
                    }
                }
            }
     }
    }

    updateGrid(){
        var ajustXgrid = this.raio+(this.space/4); //ajuste para que objeto seja criado fora da area da janela para quando for visivel
        var compLinha = this.barleBoings[0].length*this.space+ajustXgrid;
        var numAltera = 0; 
        this.boingAdd = [];

        console.log("compr : " + compLinha, dX);
        //console.log(compLinha<=dX);
        if(compLinha<=dX){
            //space * 2 para criar atras da area que irá abrir 
           numAltera = Math.round((dX+(this.space*2)-compLinha)/this.space);
        
           for(var j=0; j<this.ncolunas; j++){
            this.boingAdd[j] = []; 
            this.boingsNew[j] = [];
            for(var i=0; i<numAltera; i++){ 

                console.log()
                var xPin = this.barleBoings[j][this.barleBoings[j].length-1].corpoBoing.position.x + i * this.space;  //selecionar o x do ultimo do array pra fazer ajustes a grelha
                var yPin = this.barleBoings[j][this.barleBoings[j].length-1].corpoBoing.position.y;
    
                if(xPin + this.raio <= dX+(this.space*2)){
                    this.boingAdd[j].push(new boing ([xPin , yPin], this.raio, this.raio*2, this.raio, this.raio/3));
              }
            }
            for(var i=0; i<numAltera; i++){ 
                console.log(this.boingAdd[j]);
               World.add(engine.world, this.boingAdd[j][i].corpoBoing);
            }
            this.barleBoings[j].concat(this.boingAdd[j]); 
            console.log(this.barleBoings[j].length); 
            }
        }else if(compLinha>dX+ajustXgrid){ //remove boings sempre que estiverem fora da janela para diminuir processamento
            for(var j=this.ncolunas-1; j>0; j++){
                for(var i=this.barleBoings[j].length-1; i>0; i++){
                   if(this.barleBoings[j][i].pos[0]>dX){
                    console.log("remove");
                    World.remove(engine.world,this.barleBoings[j][i].corpoBoing);
                    this.barleBoings[j].splice(i,1);
                    console.log(engine.world.bodies.length);
                   }
            }
            }
        }
    }
}

class button{
    constructor(id,src){
        this.id = id;
        this.src=src
    }

    setPage(){
        window.location.replace(this.src);
    }
}