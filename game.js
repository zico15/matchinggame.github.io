
var game = { minutes: 0, seconds: 0, is_run: true, moves: 0, 
             level: 0, card_select: null, card_max: 0, matching: 0};

function creatingImageCard(baseCard, fileImage){
    var card = document.createElement("div");
    card.className = "card";
    var img = document.createElement("img");
    img.className = "card-img";
    img.src = fileImage;
    card.appendChild(img);
    baseCard.appendChild(card);
}


function creatingCard(board, id, fileImage, size){
    var baseCard = document.createElement("div");
    baseCard.id = id;
    baseCard.style.width =  size[0] + "px";
    baseCard.style.height = size[1] + "px";
    baseCard.className = "baseCard";
    creatingImageCard(baseCard, fileImage);
    board.appendChild(baseCard, fileImage);
} 

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function creatingBoard(level, board){
    game.card_max = level.img.length * 2;
    let result = new Array(size);
    var j = 0;
    for (i = 0; i < game.card_max; i++)
    {    
        result[i] = j++;
        if (j >= level.img.length)
            j = 0;
    }
    var size = [540 / level.width, 540 / level.height];
    for (i = 0; i < game.card_max; i++)
    {
        var index = getRandomInt(result.length);        
        creatingCard(board, "card_" + i, level.img[result[index]], size);
        result.splice(index, 1);
    }
}

function  initBoard(level){
    game.card_select = null;
    game.matching = 0;
    document.getElementById("title").textContent = level.title;
    document.getElementById("time").textContent = level.time; 
    document.getElementById("moves_count").textContent = level.moves;    
    game.minutes = level.time.minutes;
    game.seconds = level.time.seconds;
    setTextTime();
    var board = document.getElementById("board-view");
    board.innerHTML = "";
    creatingBoard(level, board);
}

initBoard(data[0]);

function start(){
    document.getElementById("questionPopUp").style.display = "none";
    document.getElementById("button_start").style.display = "none";
    document.getElementById("div_level").style.display = "block";
    game.level = 0;
    refresh();
}
function refresh()
{
    document.getElementById("questionPopUp").style.display = "none";
    if (game.is_run)
    { 
        initBoard(data[ game.level]);
        game.is_run = false;
        openCardsAll();       
        setTimeout(function(){          
            closeCardsAll();
            setTimeout(function(){        
                game.is_run = true;
                myTimer();                
            }, 2000);
        }, 2000);
    }  
}

function gameOver(){
    document.getElementById("msg_lost").style.display = "block";
    document.getElementById("questionPopUp").style.display = "block"; 
}

function nextLevel(){
    game.level++;
    refresh();
}

document.querySelector(".deck").addEventListener("click", function(event){
    let card = event.target;   
    if (card.parentNode.className != "card" || !game.is_run)
        return;
    if (game.card_select == null)
    {
        game.card_select = card;
        openCard(game.card_select);
    } else {

        if (game.card_select.src == card.src)
        {
            console.log("ok");
            game.matching += 2;
            pulseCard(game.card_select);
            pulseCard(card);
        }
        else
        {
            shakeCard(game.card_select);
            shakeCard(card);
        }
        game.card_select = null;
        if (game.card_max == game.matching)
            document.getElementById("questionPopUp").style.display = "block";
    }
    
});
