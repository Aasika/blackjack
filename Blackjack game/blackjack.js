//New selection style. like, getbyid and getbytag
//inside queryselector give the ID, inside event listener, give (the action to be performed, funtion to be run)

// let x = prompt("Your good name, mate?");
// document.querySelector('#name').textContent=x;

let bjgame={
    'user':{'scorespan':'#userscore', 'div':'#user', 'score':0},
    'bot':{'scorespan':'#botscore', 'div':'#bot', 'score':0},
    'cards':['2','3','4','5','6','7','8','9','10','11','12','13','1'],
    'cardnval':{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'11':10,'12':10,'13':10, '1':1},
    'wins':0, 'losses':0, 'draws':0,
    'isstand':false, 'turnsovr':false, //has stand been used and is all the turns over yet?
    //hit works only if stand hasnt been used up yet.

};

// these can be used to easily access
const user=bjgame['user']
const bot=bjgame['bot']
const cards=bjgame['cards']
const val=bjgame['cardnval']

console.log(user['div'])

//This is how we add sound
const hitsound=new Audio('./sounds/swoosh.mp3'); 
const dealsound = new Audio("./sounds/cash.mp3"); 
const winsound = new Audio("./sounds/success.mp3"); 
const losesound = new Audio("./sounds/aww.mp3"); 

//fancy way of calling the function to be executed when button is clicked
//document.querySelector('#hold').addEventListener('click',botlogic);

function randomcard(){
    let x=Math.floor(Math.random()*13);
    let f=cards[x]
    return f;
}


//displaying cards in the div is done here. part of hit
//player is whomever is currently playing: bot/user
function showcard(card,player){
    //only if score is less than or equal to 21 the cards come up
    if(player['score']<=21){
      let cardimage = document.createElement("img");
      // either do this to pick random or in bjgame add one more proper as 'cards':[2,3,4,5,6,'a','k'] etc and use the index as random or refer the randomcard()

      cardimage.src = `./images/${card}.png`;

      //for queryselector inp is given as '#user'
      //for getelementbyid inp is given as 'user'
      document.querySelector(player['div']).appendChild(cardimage);
      hitsound.play();}
}




function deal(){ //fn to remove cards
    //all the img ele from #user are chosen
    // let winner=declarewinner();
    // displayresult(winner)
    if(bjgame['turnsovr']==true){
    dealsound.play()
    //displayresult()
    bjgame['isstand']=false; 
    let userimages=document.querySelector('#user').querySelectorAll('img'); 
    let botimages = document.querySelector("#bot").querySelectorAll("img"); 

    // prev statement creates an arr of images.
    for(let i=0;i<userimages.length;i++){
        userimages[i].remove();
    }
     for (let i = 0; i < botimages.length; i++) {
       botimages[i].remove();
     }
     user['score']=0
     bot['score']=0;
     document.querySelector(user['scorespan']).textContent=0
     document.querySelector(bot['scorespan']).textContent = 0;
     document.querySelector(user["scorespan"]).style.color = "white";
    document.querySelector(bot["scorespan"]).style.color = "white";
     document.querySelector("#message").textContent = "Game on!";
    document.querySelector("#message").style.color="white";
     bjgame["turnsovr"] = false;

}}

function updatescore(card,player){
  //for ace, if adding 11 gives score below or equals 21 then add. else add 1.
    // if(card=='1'){
    //     if((player['score']+=11) <=21){
    //         player['score']+=11;
    //     }
    //     else{
    //         player['score']+=1;
    //     }
    // }
    // else{
  player["score"] += val[card];
    //}
  
}

function hit() {
  if(bjgame['isstand']===false){  
  document.querySelector("#message").textContent = "Game on!";
  document.querySelector("#message").style.color="white";
  let card = randomcard();
  showcard(card, user);
  updatescore(card, user);
  //   let x=declarewinner();
  showscore(user);}

}

function showscore(player){
    //when score exceeds 21, it stopes showing score
    if(player['score']>21){
        document.querySelector(player['scorespan']).textContent='BUST!!';
        document.querySelector(player["scorespan"]).style.color ='red';

    
    }
    else{
    document.querySelector(player['scorespan']).textContent=player['score'];
    }
}

//second player creation who will later be turned to bot

async function botlogic(){

bjgame['isstand']=true;
while(bot['score']<16){
let card=randomcard();
showcard(card,bot)
updatescore(card,bot)
showscore(bot)
await sleep(1000);}

// let us assume the bot gets careful after 15 and thinks to hit after that
if(bot['score']>15){
    let winner=declarewinner();
    bjgame['turnsovr']=true;
    displayresult(winner);
}
}

function sleep(ms){
    return new Promise(resolve  => setTimeout(resolve,ms)); 
        
    }


async function hold(){
botlogic();
}

function declarewinner(){

    //declares winners and updates the table
    let winner;
    if(user['score']<=21){
        //The foll are the possible conditions
        //When u have higher score than dealer or when dealer busts and u r 21 or lower
        if(user['score']>bot['score'] || bot['score']>21){
            console.log('You wonn!');
            winner=user;
            bjgame['wins']++;
        }
        else if(user['score']<bot['score']){
            console.log('You lost!');
            winner=bot;
            bjgame['losses']++;
        }
        else if(user['score']===bot['score']){
            console.log('You drew! Deal again?');
            bjgame['draws']++;
        }}
        else if(user['score']>21 && bot['score']<=21){
            console.log('You lost!');
            winner=bot;
            bjgame['losses']++;
        }
        else if(user['score']>21 && bot['score']>21){
            console.log('Drawwww');
            bjgame['draws']++;
            
        }
        
    console.log(bjgame);
    return winner;

}

function displayresult(winner){
    let message, messagecolor;
    if(winner===user){
        document.querySelector('#wins').textContent=bjgame['wins'];
        message= 'You wonnn!';
        messagecolor='green';
        winsound.play();

   // document.querySelector('#message').textContent='You wonn!';
    }
    else if(winner===bot){
        document.querySelector("#losses").textContent = bjgame["losses"];
        message='You lost!';
        messagecolor='red';
        losesound.play();
    }
    else{
        document.querySelector("#draws").textContent = bjgame["draws"];

        message='Drawww';
        messagecolor='orange'
    }
    document.querySelector('#message').textContent=message;
    document.querySelector('#message').style.color=messagecolor;
}

// few rules
//first hit, then stand. after stand cant come back to hit. go to deal.

