//DOM
//botoes
var btoesRed;
var btoesRedCont = ["https://student.dei.uc.pt/~brunosimoes/The-Great-Automatic-Grammatizator-P3/",
"https://student.dei.uc.pt/~brunosimoes/LORAX/LORAX/",
"https://student.dei.uc.pt/~brunosimoes/Projeto1-CCDM-Grupo_Bruno_Gabriela_Francisca_/html/Inicio.html"];

//minimizar
var minBt;
var footeR;
var headeR;

//up
var up;
var upStatus;

var restart;

var achivesBt;

var allContents;


window.addEventListener("load",function(){
    console.log("window File loaded");

    allContents=document.querySelectorAll(".scoreNeed");
    containerContent1 = document.querySelectorAll(".contentAbout ");

    allContents.forEach(contentor=>{
        contentor.addEventListener("click",function(e){
            var element  = contentor;

             for(var i=0; i<allContents.length; i++){
                if(i===0 && hightPoints>=0 ||i===1 && hightPoints>=1000 || i===2 && hightPoints>=2000 || i===3 && hightPoints>=5000|| i===4 && hightPoints>=10000 ){
                        console.log(e.target ,allContents[i] );
                    if(element === allContents[i]){
                        console.log("aaaaa");
                        if(containerContent1[i].classList.contains("ocultarCont")){
                            containerContent1[i].classList.remove("ocultarCont"); 
                        }
                    }else{
                        if(!containerContent1[i].classList.contains("ocultarCont")){
                            containerContent1[i].classList.add("ocultarCont");  
                        }
                    }
                }
             }
     
         });

    })
    

    //Botões do Score 
    btoesRed = document.querySelectorAll(".bts");

    //associar cada botao a um "src"
       btoesRed[0].addEventListener("click",function(){
            window.location.replace(btoesRedCont[0]);
       })
       btoesRed[1].addEventListener("click",function(){
        window.location.replace(btoesRedCont[1]);
        })

        btoesRed[2].addEventListener("click",function(){
            window.location.replace(btoesRedCont[2]);
            })



    minBt = document.querySelector("#mins");
    footeR = document.querySelector("footer");
    headeR = document.querySelector("header");

    minBt.addEventListener("click",function(){
       footeR.classList.toggle("minimize");
       headeR.classList.toggle("minimizaH");
    })

    up= this.document.querySelector("#up");
    up.addEventListener("click",function(){
        window.scrollTo(0, 0);
    });

    achivesBt = document.querySelector("#achives");
    achivesBt.addEventListener("click",function(){
        window.location.hash = "#archives";
    });

    restart = document.querySelector("#reniciar");
    restart.addEventListener("click",function(){
            for(var i = balls.length-1; i>=0; i--){      
              World.remove(engine.world,balls[i].bol);
              balls.splice(i,1);
            }

            points=0;
    });


});