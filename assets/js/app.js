//Only two users can play at the same time.
//Both players pick either rock, paper or scissors. After the players make their selection, the game will tell them whether a tie occurred or if one player defeated the other.
//The game will track each player's wins and losses.
//Throw some chat functionality in there! No online multiplayer game is complete without having to endure endless taunts and insults from your jerk opponent.
//Styling and theme are completely up to you. Get Creative!
let wins = 0;
let losses = 0;
let Rock = ($("<img>",{'src': 'assets/images/rock.jpg'}));	
let Paper = ($("<img>",{'src': 'assets/images/paper.jpg'}));
let Scissors = ($("<img>",{'src': 'assets/images/scissors.jpg'}));
let computer = [Rock, Paper, Scissors];
let selected = [];
 var config = {
    apiKey: "AIzaSyBgtoDWAY-jA1EXLxBmf7rcdB8YPWItlCI",
    authDomain: "ryans-rps-game.firebaseapp.com",
    databaseURL: "https://ryans-rps-game.firebaseio.com",
    projectId: "ryans-rps-game",
    storageBucket: "ryans-rps-game.appspot.com",
    messagingSenderId: "130657508748"
 };
  firebase.initializeApp(config);

  let player1 = null;
  let player1name = " ";

  let player2 = null;
  let player2name = " ";
//----------On page load start game
$(function pageLoad(){
	$('#content').css({'visibility': 'hidden'});
	$('#winlose').css({'visibility': 'hidden'});
	$('#start').css({'visibility': 'hidden'});
	$('#welcomeStart').on('click', function(){
		initGame();
	});
    });

//---------Once game ends clear content and continue game
function endGame(){
	if (selected == "Vs Computer") {
	let newContent = $('<div id="All"><div class="wrapper"><div class="row"><div class="col-12"><h3 class="Choose1">Choose Who You Will Face!</h3></div></div><div id="versus"><div class="row" id="persOrcomp"><div class="col-3"></div><div class="col-3" id="person"><h3 class="pvp">Vs Person</h3></div><div class="col-3" id="computer"><h3 class="pvc">Vs Computer</h3></div><div class="col-3"></div></div></div><div class="row"><div class="col-12"><h3 class="Choose">Choose Your Weapon!</h3></div></div><div id="RPSchoice"><div class="row" id="ChoiceRow"><div class="col-3"></div><div class="col-2" id="scissors"><img src="assets/images/scissors.jpg"></div><div class="col-2" id="rock"><img src="assets/images/rock.jpg"></div><div class="col-2" id="paper"><img src="assets/images/paper.jpg"></div><div class="col-3"></div></div></div><div class="row"><div class="col-12" id="buttons"><button type="button" class="btn btn-secondary btn-lg" id="start">Battle!</button></div></div></div></div>');
	this.player1Choice = [];
	this.player2Choice = [];
	this.winner = [];
	// this.selected = [];
	this.computerChoice = [];
	$('#All').remove();
	$('#content').append(newContent);
	$('#persOrcomp').remove();
	$('#versus').append($("<div>", {'class': 'row', 'id': 'persOrcomp'}));
	$('#persOrcomp').append($("<div>",{'class': 'col-12', 'id': 'versusChoice'}));
    $('#versusChoice').append($("<h3>",{'id':'SelctPerson'}).text(selected));
	}
	else{
	let newContent = $('<div id="All"><div class="wrapper"><div class="row"><div class="col-12"><h3 class="Choose1">Choose Who You Will Face!</h3></div></div><div id="versus"><div class="row" id="persOrcomp"><div class="col-3"></div><div class="col-3" id="person"><h3 class="pvp">Vs Person</h3></div><div class="col-3" id="computer"><h3 class="pvc">Vs Computer</h3></div><div class="col-3"></div></div></div><div class="row"><div class="col-12"><h3 class="Choose">Choose Your Weapon!</h3></div></div><div id="RPSchoice"><div class="row" id="ChoiceRow"><div class="col-3"></div><div class="col-2" id="scissors"><img src="assets/images/scissors.jpg"></div><div class="col-2" id="rock"><img src="assets/images/rock.jpg"></div><div class="col-2" id="paper"><img src="assets/images/paper.jpg"></div><div class="col-3"></div></div></div><div class="row"><div class="col-12"><button type="button" class="btn btn-secondary btn-lg" id="start">Battle!</button></div></div></div></div>');
	this.player1Choice = [];
	this.player2Choice = [];
	this.winner = [];
	// this.selected = [];
	this.computerChoice = [];
	$('#All').remove();
	$('#content').append(newContent);
	}
};
function newOrReset(){
    endGame();
    initGame();
};

//-------------Start game 
function initGame(){
	$('#welcome').remove();
	$('#welcomeStart').remove();
	$('#content').css({'visibility': 'visible'});
	$('#winlose').css({'visibility': 'visible'});
		let database = firebase.database();
		let player1Choice = [];
		let player2Choice = [];
		let turn = 1;
		let winner = [];
		console.log(selected);
		let rand = Math.floor(Math.random() * computer.length);
		let computerChoice = computer[rand];
		console.log(computerChoice);
//----------Select If vs person or computer
		$('#person').on('click', function(){
			selected.push('Vs Person');
			$('#start').css({'visibility': 'visible'});
			$('#persOrcomp').remove();
			$('#versus').append($("<div>", {'class': 'row', 'id': 'persOrcomp'}));
			$('#persOrcomp').append($("<div>",{'class': 'col-12', 'id': 'versusChoice'}));
			$('#versusChoice').append($("<h3>",{'id':'SelctPerson'}).text(selected));
			database.ref("/players/").on("value", function(snapshot) {
						// Check for existence of player 1 in the database
						if (snapshot.child("player1").exists()) {
							console.log("Player 1 exists");
							// Record player1 data
							player1 = snapshot.val().player1;
							player1Name = player1.name;
							// Update player1 display
							$("#pvp").text(player1Name);
						} else {
							alert('Unable To Find Player');
							player1 = null;
							player1Name = "";
							setTimeout(function(){
							location.reload();	 

							}, 2000); 
						}
						if (snapshot.child("player2").exists()) {
							console.log("Player 2 exists");

							// Record player2 data
							player2 = snapshot.val().player2;
							player2Name = player2.name;

							// Update player2 display
							$("#playerTwoName").text(player2Name);
							$("#player2Stats").html("Win: " + player2.win + ", Loss: " + player2.loss + ", Tie: " + player2.tie);
						} else {
							alert("Unable To Find Player");

							player2 = null;
							player2Name = "";

							// Update player2 display
							setTimeout(function(){
							location.reload();	 

							}, 2000);
						}


				        
				    })
		});
		$('#computer').on('click', function(){
			selected.push('Vs Computer');
			$('#persOrcomp').remove();
			$('#versus').append($("<div>", {'class': 'row', 'id': 'persOrcomp'}));
			$('#persOrcomp').append($("<div>",{'class': 'col-12', 'id': 'versusChoice'}));
			$('#versusChoice').append($("<h3>",{'id':'SelctPerson'}).text(selected));
			$('#start').css({'visibility': 'visible'});
		});
		//---selected option is pushed to selected array
		$('#rock').on('click', function(){
			player1Choice.push('Rock');
			$('#ChoiceRow').remove();
			$('#RPSchoice').append($("<div>", {'class': 'row', 'id': 'Playerschoice'}));
			$('#Playerschoice').append($("<div>", {'class': 'col-12', 'id': 'player'}));
			$('#player').append($("<img>", {'src': 'assets/images/rock.jpg'}));

		});
		$('#scissors').on('click', function(){
			player1Choice.push('Scissors');
			$('#ChoiceRow').remove();
			$('#RPSchoice').append($("<div>", {'class': 'row', 'id': 'Playerschoice'}));
			$('#Playerschoice').append($("<div>", {'class': 'col-12', 'id': 'player'}));
			$('#player').append($("<img>", {'src': 'assets/images/scissors.jpg'}));
		});
		$('#paper').on('click', function(){
			player1Choice.push('Paper');
			$('#ChoiceRow').remove();
			$('#RPSchoice').append($("<div>", {'class': 'row', 'id': 'Playerschoice'}));
			$('#Playerschoice').append($("<div>", {'class': 'col-12', 'id': 'player'}));
			$('#player').append($("<img>", {'src': 'assets/images/paper.jpg'}));
		});
		$('button').on('click',function(){
		   if (selected == "Vs Computer") {
				$('#RPSchoice').append($("<div>", {'class': 'row', 'id': 'computerchoice'}));
				$('#computerchoice').append($("<div>", {'class': 'col-12', 'id': 'computer'}));
				$('#computer').append(computerChoice);
				 setTimeout(function() {
				if (computerChoice == Rock) {
					if (player1Choice == 'Rock') {
						alert('You Both Picked Rock Its A Tie!');
					}
					if (player1Choice == 'Paper') {
						alert('Paper Beats Rock! You Win!');
						winner.push('Player');
						wins++;
						$('#winCount').text(wins);
					}
					if (player1Choice == 'Scissors'){
						alert('Rock Beats Scissors! You Lose')
						winner.push('Computer');
						losses++;
						$('#lossCount').text(losses);
					}
				}
				if (computerChoice == Paper){
					if (player1Choice == 'Paper') {
						alert('You Both Picked Paper Its A Tie!');
					}
					if (player1Choice == 'Rock') {
						alert('Paper Beats Rock! You Lose!');
						winner.push('Computer');
						losses++;
						$('#lossCount').text(losses);
					}
					if (player1Choice == 'Scissors'){
						alert('Scissors Beats Paper! You Win!')
						winner.push('Player');
						wins++;
						$('#winCount').text(wins);
					}
					
				}
				if (computerChoice == Scissors) {
					if (player1Choice == 'Scissors') {
						alert('You Both Picked Scissors Its A Tie!');
					}
					if (player1Choice == 'Rock') {
						alert('Rock Beats Scissors You Win!');
						winner.push('Player');
						wins++;
						$('#winCount').text(wins);
					}
					if (player1Choice == 'Paper') {
						alert('Scissors Beats Paper You Lose!');
						winner.push('Computer');
						losses++;
						$('#lossCount').text(losses);
					}
				}
			 }, 2000);}



				 //---------------------If person is Selected
				 if (selected == 'Vs Person') {
			
			     };
				  setTimeout(function() {
				  	if (wins <= 5) {
		        	newOrReset();
		        }
		        	else{
		        		alert('Your The Champion! Want To Play Again!? Press The Restart Button!');
		        		$('#start').remove();
		        		$('#buttons').append($('<button type="button" class="btn btn-secondary btn-lg" id="restart">RESTART</button>'));
		        		$('#restart').css({'visibility': 'visible'});
		        		$('#restart').on('click', function(){
		        			location.reload();
		        		});
		        	}
		        	if (losses >= 5){
		        		alert('Tough Luck! Play Agian By Pressing The Restart Button!');
		        		$('#start').remove();
		        		$('#buttons').append($('<button type="button" class="btn btn-secondary btn-lg" id="restart">RESTART</button>'));
		        		$('#restart').css({'visibility': 'visible'});
		        		$('#restart').on('click', function(){
		        			location.reload();
		        		});
		        	}
		        }, 3000);
		});
};