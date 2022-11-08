
function openCardsAll(){
	const cards = document.getElementsByClassName("card-img");
	
	for (let i = 0; i < cards.length; i++)
		openCard(cards[i]);
}

function openCard(card){
	card.parentNode.className = "open";
	card.parentNode.parentNode.className = "baseCard animated flipInY";
}


function closeCardsAll(){
	const cards = document.getElementsByClassName("card-img");
	
	for (let i = 0; i < cards.length; i++)
		closeCard(cards[i]);
}

function closeCard(card){       
	card.parentNode.className = "card";
	card.parentNode.parentNode.className = "baseCard";
}

function flipCard(card){
	setTimeout(function(){
		card.parentNode.parentNode.className = "baseCard animated flipOutY";
	},800);
}

function shakeCard(card){
	       
	card.parentNode.className = "notMatch";
	card.parentNode.parentNode.className = "baseCard animated shake";
	setTimeout(function(){ closeCard(card); }, 1800);
};

function pulseCard(card){
	card.parentNode.className = "match";   
	card.parentNode.parentNode.className = "baseCard animated pulse";
}

let timeCounter = document.getElementById('time');

/*
const clock = setInterval(function () { console.log("Hello"); clearInterval(a) }, 1000);
*/
function myTimer() {
	if (!game.is_run)
		return;
	if (game.seconds == 0)
	{	
		game.minutes--;
		game.seconds = 59;
	}
	else
		game.seconds--;
	game.time_count += 0.02;
	if (game.time_count >= game.time_tester && game.count > 1)
	{
		game.time_count = 0.0;
		game.count--;
		game.stars[game.level] = game.count;
		document.getElementById(('fa-start_'+game.count)).style.color = "#fff";
		console.log("count: "+game.count);
	}
	setTextTime();
	if (game.minutes == 0 && game.seconds == 0)
		gameOver();
	else
   		setTimeout(myTimer, 1000);
}


function setTextTime(){
	timeCounter.textContent =  `${game.minutes > 9 ? game.minutes : "0" + game.minutes} : ${game.seconds > 9 ? game.seconds : "0" + game.seconds}`;
}
