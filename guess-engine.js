'use strict';

//Guess Engine

/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.

/*var playersGuess,
    winningNumber
*/


/* **** Guessing Game Functions **** */



// Generate the Winning Number

function generateWinningNumber(){
	// add code here
	
	let winningNum = {}
	winningNum.val = Math.floor(Math.random()*100);
	return winningNum;

};


function guessCounter(){
	let guessCounter = {
		val: 0,
		max: 5,
		opp(){return Number(this.max - this.val)},
		increment(winningNumber){
			this.val++
			if(this.val>this.max-1){
				lose(winningNumber);
			};
		}
	};

	return guessCounter;
};

// Fetch the Players Guess

function playersGuessSubmission(){
	// add code here
}

// Determine if the next guess should be a lower or higher number

function lowerOrHigher(guess, winningNumber){
	// add code here
	let guessMessage = 'Your guess was ' + guess;
	if(guess == winningNumber){
		guessMessage += ". You got it! "
	} else if (guess < winningNumber) {
		guessMessage += ". Go Higher. "
	} else {
		guessMessage += ". Go Lower. "
	}
	return guessMessage;
}

// Check if the Player's Guess is the winning number 

function checkGuess(guess, winningNumber, guessCounter){
	console.log(guess == winningNumber);
	// add code here
	let response = {}
	response.check = guess == winningNumber ? true : false;
	response.check === true ? 
		(response.message = 'You Win.') : 
		(response.message = lowerOrHigher(guess,winningNumber) + " Remaining guesses: " + (guessCounter.opp()-1));
	return response;
}

// Create a provide hint button that provides additional clues to the "Player"

function provideHint(guess, winningNumber, hintsLeft){
	// add code here
	let hint = Math.round(Math.abs(guess-winningNumber)/10)*10;
	let hotOrCold = hint < 25 ? "hot" : "cold";
	let message = "<p>Getting "+hotOrCold+".</p><p> You're about "+hint+" away.</p><p> Hints remaining: "+hintsLeft+". </p>";
	return message;
};

function win(winningNumber, tries){
	$('.overlay').removeClass('lose');
	$('.overlay').addClass('win');
	let message = `<p>Congratulations, you've done well.</p>
	<p>You correctly guessed your Life Number of ${winningNumber}.</p>
	<p>Your life number can change a life.</p>
	<p><a href="https://www.gofundme.com/helphanklett/donate" target="_blank">Donate $${winningNumber}</a> to help an amazing kid win the fight of his life.</p>`
	sendPlayerMessage(message);
};

function lose(winningNumber){
	$('.overlay').removeClass('win');
	$('.overlay').addClass('lose');
	let message = `<p>Sorry, you didn't win this time.</p>
	<p>The correct Life Number was ${winningNumber}.</p>
	<p>Your life number can change someone's life.</p>
	<p><a href="https://www.gofundme.com/helphanklett/donate" target="_blank">Donate $${winningNumber}</a> to help an amazing kid win the fight of his life.</p>
	<p>...then come back and play again.`
	sendPlayerMessage(message);
	//resetGame();
};

function sendPlayerMessage(message) {
	console.log(message);
	$('#messageContent').html(message);
	$('#messageOverlay').trigger('message');	
};

function resetMessageBox() {
	$('.overlay').removeClass('win');
	$('.overlay').removeClass('lose');
}

function validateForm(element, compareArray) {
	element = '#guessInput';
	let testValue = Number(getFormData(element));
	compareArray = Array.from(compareArray);
	let elementInArray = $.inArray( testValue, compareArray);
	console.log(elementInArray);

	for(var i=0; i<compareArray.length; i++){
		if(compareArray[i] == testValue){
			$(element).addClass('has-error')
				.delay(2000)
				.queue(function(){
					$(this).removeClass('has-error'); });
			console.log('invalid', testValue, compareArray);
			return false;
		}
	}

	return true;

}


function emptyForm() {
	$('#guessInput').val();
};

function unbindHints() {
	$('#hintButton').off();
}

// Allow the "Player" to Play

function play(){

	$('#hintButton').hide();

	$('#get_started').on(
		'startGame',
		{
			winningNum: generateWinningNumber(),
			guessCounter: new guessCounter()
		},
		function (startEvent){	
			let hintsLeft = 2;
			let guessHistory = new Array;

			//console.log(startEvent.data.winningNum);
			resetMessageBox();


			$('#get_started').trigger('newNumber', startEvent.data.winningNum);
			$('#guessInput').keypress(function(event){
					if(event.which == 13){
						$('#guessForm').submit(function(event){event.preventDefault();});
					};
				});


				$('#guessForm').submit(
				{
					winningNum: startEvent.data.winningNum.val			
				},
				function(submitEvent){
					let playerGuess = getFormData('#guessInput');
					let winningNum = submitEvent.data.winningNum;
					let checkAnswer = checkGuess(playerGuess, submitEvent.data.winningNum, startEvent.data.guessCounter);
					let formIsValid = validateForm(playerGuess, guessHistory);
					unbindHints();

					$('#hintButton').click(
						function(hintEvent){
							hintsLeft--
							let hint = hintsLeft>=0 ? provideHint(playerGuess, winningNum, hintsLeft) : "Sorry friend. You have no Hints Left";
							sendPlayerMessage(hint);
						});

					if(formIsValid === false) {
						sendPlayerMessage("<p>You're repeating yourself.</p><p>Don't do that.</p>")
					}
					if(formIsValid === true) {
						submitEvent.preventDefault();
						$('#hintButton').fadeIn();
						guessHistory.push(Number(playerGuess));
						if(checkAnswer.check === true) {
							win(playerGuess, startEvent.data.guessCounter.val);
						} else {
							startEvent.data.guessCounter.increment(winningNum);
							$('.guessesRemaining').text(startEvent.data.guessCounter.opp());
							let p = $("<p></p>");
							p.append(checkAnswer.message);
							$('#playerGuess').prepend(p);	
						}

					}

				});	
		});

};

function resetGame () {
	$("#get_started").off('startGame');
	$("#guessForm, #guessInput, #playerGuess, #hintButton").off();
	$("#playerGuess").empty();
	$("#guessing-game").collapse('hide');
	sendPlayerMessage("Game Reset. You can Play Again.");
	emptyForm();
	play();
}
/* **** Event Listeners/Handlers ****  */

// ===== MY EVENTS ===== // 


let myEvents = {};

function reduceEvents(initVal, cur, index) {
	let key = cur;
	let eventString = cur.toString();
	let val = new Event(eventString);
	initVal[key] = val;
	return initVal;
}

let eventList = new Array(
		'startGame',
		'newNumber',
		'playerGuess',
		'lose',
		'win',
		'gameOver',
		'iterate',
		'newMsg',
		'pressEnter',
		'resetGame'
	);

myEvents = eventList.reduce(reduceEvents, {});
console.log(typeof myEvents.startGame);


function getFormData(element) {
	return $(element).val();
};

//start jquery
$(function () {

	play();
	

		//toggle tooltip on hover.
	  $('[data-toggle="tooltip"]').tooltip();

	$('#get_started').on(	
		'click',
		null,
		function (event){
			$('#get_started').trigger('startGame');
		});


	$('#get_started').on(
		'newNumber',
		null,
		function (event){
			
		});

	$('#guessing-game').on({})

	




	$('#resetButton').on(
		'click',
		null,
		function(event){
			resetGame();
		});








}); //end jquery


// test //

function jasmineWorking() {return true};




// custom event Polyfill //


(function () {

  if ( typeof window.CustomEvent === "function" ) return false;

  function CustomEvent ( event, params ) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent( 'CustomEvent' );
    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
    return evt;
   }

  CustomEvent.prototype = window.Event.prototype;

  window.CustomEvent = CustomEvent;
})();