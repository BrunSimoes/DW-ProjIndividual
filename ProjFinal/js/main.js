    var dX ,dY ,dXOld ,dYOld;
    
    //canvas
    var canvas;
    let points=0;
    var canvasCont;
    var canvasInfo;
    var escala=20;
    var width = 800,
        height = 800;
    
    var setInterva;

    var scaleX,scaleY;

    var dasLinhaBoings;

    var hightPoints = 0;

    var hightScore;
      
    
    //Objectos 
    //bolas
    var balls = [];
    var pins = [];
    var ballOptions={
            restitution: 1 ,
            render: {
                fillStyle: '#25AEAE',
                strokeStyle: '#25AEAE',
                lineWidth: 0
            }
        };
    //entradas
    var entr = [];
    //var SUB
    var all=[];

    //Bounds
    const wallOptions = {
        isStatic: true,
        restitution: 1,
        render: {
            fillStyle: '#3C3C40',
            strokeStyle: '#3C3C40',
            lineWidth: 0
        }
      };

    var bound = [];
    var allBoings = [];


//MATTER.js
    var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Bodies = Matter.Bodies,
        World = Matter.World,
        Composite = Matter.Composite;

    // create runner
    var runner;
    var engine;
    var render;
    var world;

    var allPins = [];

    var textPoints = [];
    var containerContent;






window.addEventListener("load", (e)=>{
   console.log("tudo logado");

   canvas = document.getElementById('canvasMain');
   canvasCont = canvas.getContext('2d');

   //window dim
   dX  = window.innerWidth;
   dY  = 10000;
   //dY = 2400;
   dXOld  = dX;
   dYOld  = dY;

   //Create Engine
     engine = Engine.create();
     
   //Set Gravity 
    engine.world.gravity.x = 0;
    engine.world.gravity.y = 0.5;


    render = Render.create({
        canvas: document.getElementById('canvasMain'),
        engine: engine,
        options: {
        background:'transparent',
        width: dX,
        height: dY,
        wireframes: false,
        showPositions: false,
        showAxes: false,
        hasBounds: false,
        showDebug: false
        }
    });

    Render.run(render);
    runner = Runner.create();
    Runner.run(runner, engine);

    textPoints = document.querySelector('h5');

    caixaHight = document.querySelector('#caixaHight');
    containerContent = document.querySelectorAll(".backers");

    loadBounds();


    //Load Entradas 
    loadEntradas();

    //load Pins 
    //loadPins();

    //load Boings 
    //createBoings();
    allPins = [(new linhaPins (3,60,[0,window.innerHeight],8)),(new linhaPins (3,60,[0,2000],8)),(new linhaPins (3,60,[0,2500],8)),(new linhaPins (5,60,[0,3500],8)),(new linhaPins (3,60,[0,6000],8)),(new linhaPins (10,60,[0,6500],8)),(new linhaPins (5,60,[0,9200],8))];
    dasLinhaBoings=[(new linhaBoings (1,200,[0,3000],30)),(new linhaBoings (1,150,[0,5000],30)),(new linhaBoings (1,130,[0,8000],30)),(new linhaBoings (1,130,[0,9000],30))];



    setInterva = setInterval (() => {

        dasLinhaBoings.forEach(segBoing=>{
            segBoing.setMoveBoings();
        });

        dasLinhaBoings.forEach(segBoing=>{
            segBoing.moveBoings();
        });

        textPoints.innerText=points;



        if(balls.length>0){
          for(var i=balls.length-1; i>=0; i--){
               if(balls[i].outOfBounds()){
                removeBall(i);
                hightPoints=points;
                caixaHight.innerText=hightPoints;
               }
               window.scrollTo(0, balls[i].bol.position.y - (window.innerHeight/2));
               //console.log(balls[i].bol.position.y);
            }
        }

      if(entr.length>0){
        for(var i=entr.length-1; i>=0; i--){
            for(var j=balls.length-1; j>=0; j--){
                if(entr[i].hitHole(balls[j].bol.position.x, balls[j].bol.position.y)){

                   //window.open(entr[i].src);
                   removeBall(j);
                   hightPoints=points;
                   caixaHight.innerText=hightPoints;
                }
             }
        }  
      }
        
      if(hightPoints>=0 && !containerContent[0].classList.contains("backEffect")){
        containerContent[0].classList.add("backEffect");
      }else if(hightPoints>=1000 && !containerContent[1].classList.contains("backEffect")){
        containerContent[1].classList.add("backEffect");
      }else if(hightPoints>=2000 && !containerContent[2].classList.contains("backEffect")){
        containerContent[2].classList.add("backEffect");
      }else if(hightPoints>=5000 && !containerContent[3].classList.contains("backEffect")){
        containerContent[3].classList.add("backEffect");
      }else if(hightPoints>=10000 &&  !containerContent[4].classList.contains("backEffect")){
        containerContent[4].classList.add("backEffect");
      }

        Engine.update(engine);
    }, 10);

        window.addEventListener("mousedown", (e)=>{

                canvasInfo=canvas.getBoundingClientRect();
                console.log(canvasInfo);
                
                let hd = e.clientY-canvasInfo.top

                if( hd <= 400 && hd>=0 ){ //verifica as coordenadas do mouse em relação a canvas
                    var auxball = Bodies.circle(e.clientX, e.clientY, 0.0055*dX, ballOptions);
                    //Matter.Body.scale(auxball,scaleX,scaleX);
                    balls.push(new bolas(auxball));
                    World.add(engine.world, balls[balls.length-1].bol);

                    points=0;

                    if(balls.length>1){
                        for(var i = balls.length-1; i>0; i--){      
                          World.remove(engine.world,balls[i].bol);
                          balls.splice(i,1);
                        }
                    }
                }
        })
});

window.addEventListener("resize", (e)=>{
    console.log("deste resize a pagina");
    updateWindowDimension();   
    //console.log(dX,dY);
    
    //CANVAS
    var vasdad = document.getElementById('canvasMain');
    vasdad.width=dX;
    vasdad.height=dY;

    scaleX = dX / dXOld;
    scaleY = dY / dYOld;

    //console.log(scaleX,scaleY);

    UpdatePins();
    //Objs 
    for(var i=0; i<entr.length; i++){
       entr[i].update(scaleX);
    }

    for(var i=0; i<balls.length; i++){
       balls[i].update(scaleX);
    }

    bound.forEach(b=>{
       b.updtateDimensionW(scaleX);
    });

    dasLinhaBoings.forEach(segBoing=>{
        segBoing.updateGrid();
    });

    /*allBoings.forEach(bound=>{
        bound.update(scaleX);
    });*/

    dXOld=dX;
    dYOld=dY;
});
// Inicie a animação