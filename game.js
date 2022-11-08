
var game = { minutes: 0, seconds: 0, is_run: true, matching: 0,
             level: 0, level_max: 0, card_select: null, card_max: 0,
             scores: null, clock: null, time_tester: 0.0, count: 5,
             time_count: 0.0, stars: null
            };

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
    baseCard.style.width = "calc("+size[0]+"%)";
    baseCard.style.height = "calc("+size[1]+"%)";;
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
    var size = [100 / level.width, 100 / level.height];
    for (i = 0; i < game.card_max; i++)
    {
        var index = getRandomInt(result.length);        
        creatingCard(board, "card_" + i, level.img[result[index]], size);
        result.splice(index, 1);
    }
}

function  initBoard(level){
    for (let index = 0; index < 5; index++)
        document.getElementById(('fa-start_'+index)).style = "";
    game.card_select = null;
    game.count = 5;
    game.time_count = 0.0;
    game.matching = 0;
    game.time_tester = parseFloat( `${game.minutes}.${game.seconds}`) / 5.0;
    console.log("time: "+ game.time_tester);
    document.getElementById("title").textContent = level.title;
    document.getElementById("time").textContent = level.time; 
    document.getElementById("scores_count").textContent = 0;    
    game.minutes = level.time.minutes;
    game.seconds = level.time.seconds;
    setTextTime();
    var board = document.getElementById("board-view");
    board.innerHTML = "";
    creatingBoard(level, board);
}

initBoard(data[0]);

function start(){
    game.level_max = data.length;
    game.level = 0;
    game.is_run = true;
    game.scores = new Array(game.level_max).fill(0);
    game.stars = new Array(game.level_max).fill(5);
    refresh();
}
function refresh()
{   
    document.getElementById("questionPopUp").style.display = "none";
    document.getElementById("msg_won").style.display = "none";
    document.getElementById("div_game_wow").style.display = "none";    
    document.getElementById("button_start").style.display = "none";
    document.getElementById("div_level").style.display = "block";
    if (game.is_run)
    { 
        initBoard(data[game.level]);
        game.is_run = false;
        openCardsAll();       
        setTimeout(function(){          
            closeCardsAll();
            setTimeout(function(){        
                game.is_run = true;
                myTimer();                
            }, 100);
        }, 2000);
    }  
}

function gameOver(){
    document.getElementById("msg_lost").style.display = "block";
    document.getElementById("questionPopUp").style.display = "block";
}

function gameWon(){
    var score = 0, media = 0;
    game.scores.forEach(s => { score += s; });
    game.stars.forEach(s => { media += s; });
    media = (media / 2) - 1;
    if (media < 0 )
        media = 0;
    for (let index = 0; index < 5; index++)
        document.getElementById(('fa-start_won_'+index)).style.color = index <= media  ? "#f5cc27" : "rgb(195 186 186)";
    console.log("media: " + media);
    document.getElementById("scores_count_all").textContent = score.toFixed(0); 
    document.getElementById("div_level").style.display = "none";
    document.getElementById("button_start").style.display = "none";
    document.getElementById("msg_lost").style.display = "none";
    document.getElementById("msg_won").style.display = "block";
    document.getElementById("div_game_wow").style.display = "block";
    document.getElementById("questionPopUp").style.display = "block";
    game.is_run = false;
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
            //score
            var score = `${game.minutes}.${game.seconds}`;
            game.scores[game.level] += parseFloat(score) * (game.level + 1) * 15;
            document.getElementById("scores_count").textContent = game.scores[game.level].toFixed(0); 
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
        {   
            if (game.level == game.level_max - 1)
                gameWon();
            else
                document.getElementById("questionPopUp").style.display = "block";
        }
    }
    
});
