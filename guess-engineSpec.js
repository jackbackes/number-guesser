'use strict';


//import fixtures and modules
jasmine.getFixtures().fixturesPath = "";
let fixture = loadFixtures('index.html');

console.log('getting started...');

// == MAKE SURE TEST IS TAKING FUNCTIONS == //

describe("Guessing Game Test", function(){
	//before
	beforeEach(function() {
		jasmine.getFixtures().fixturesPath = "";
		loadFixtures('index.html');
		this.testFixture = loadFixtures('index.html');
		console.log('Jasmine');
		this.context = new Context([jasmineTest]);
	});
	//assertions
	it("should work.", function(){
		expect(this.context.jasmineTest).toBe(true);
	});
	it("fixtures are loaded.", function(){
		expect(this.testFixture.find('#motivity')).toBe()
	});
});






// == CLICK GET STARTED NOW BUTTON == //

	describe("\nClicking the Get Started Now Button", function(){

		//before
		beforeEach(function(){
			this.context = new Context([globalContext, getStartedContext]);
			this.winningNumber = this.context.spies.generateWinningNumber;
			this.getStartedButton = $('#get_started').eq(0);
			this.getStartedSpy = spyOnEvent('#get_started', 'click');
			this.getStartedButton.click();

			//== fixtures ==//


		});

		//assertions
		it("should fire click event.", function(){
			expect('click').toHaveBeenTriggeredOn(this.getStartedButton);
		});
		it("should run generateWinningNumber", function(){
			expect(this.context.spies.generateWinningNumber).toHaveBeenCalled();
		});
		it("test winning Number should be 35", function(){
			expect(generateWinningNumber()).toEqual(35);
		});

		it("should generate a guess counter.", function(){
			expect(this.context.winningNumber.counter).toEqual(0);
		});
		it("should generate a Number.", function(){
			expect(this.context.spies.generateWinningNumber).toHaveBeenCalled();
			expect(this.context.spies.generateWinningNumber).toEqual(jasmine.any(Number));
		});
		it("should generate an integer less than or equal to 100 and more than 0", function(){
			expect(Number.isInteger(this.context.winningNumber)).toBeTruthy();
			expect(this.context.winningNumber<=100).toBeTruthy();
			expect(this.context.winningNumber>0).toBeTruthy();;
		});
		it("should toggle the tooltip to reveal the 'Guess your Life Number' form field.", function(){
			expect($('#guessing-game')).not.toHaveClass('collapse');
		});
		it("should empty the 'Guess your Life Number' form field.", function(){
			expect($('#guessInput')).toHaveValue('');
		});
	});






// == THE SUBMIT YOUR ANSWER BUTTON == //
	describe("\nThe Submit Your Answer Button", function(){
		beforeEach(function(){
			this.context = new Context([globalContext, submitAnswerContext]);

		});

		// == BUTTON BEHAVIOR
		it("can be triggered with 'enter'", function(){
			expect('submit').toHaveBeenTriggeredOn('#guessInput');
		});
		it("runs the playersGuessSubmission function", function(){
			expect(this.context.spies.playersGuessSubmission).toHaveBeenCalled();
		});
		it("should only receive numbers between 1 and 100.", function(){
			expect(checkGuess(this.context.testNums.winningNumber, this.context.testNums.decimal)).toThrow();
			expect(checkGuess(this.context.testNums.winningNumber, this.context.testNums.negativeGuess)).toThrow();
			expect(checkGuess(this.context.testNums.winningNumber, this.context.testNums.overHundred)).toThrow();
			expect(checkGuess(this.context.testNums.winningNumber, this.context.testNums.tooHigh)).not.toThrow();
			expect(checkGuess(this.context.testNums.winningNumber, this.context.testNums.tooLow)).not.toThrow();
		});

		// == INCORRECT GUESS (CORRECT IS TESTED BELOW) == //
		describe("if his guess is incorrect", function(){

			it("the win function should be called", function(){
				checkGuess(this.context.testNums.winningNumber, this.context.testNums.correct);
				expect(this.context.spies.win).toHaveBeenTriggered();
			});

			// == HOT OR COLD == //

			it("...return 'hot if he is close", function(){
				expect(this.context.spies.sendPlayerMessage).toHaveBeenCalledWith('hot');
			});
			it("...return 'cold' if he is not close", function(){
				expect(this.context.spies.sendPlayerMessage).toHaveBeenCalledWith('cold');
			});
		});

		// == THE GUESSES COUNTER == //
		it("iterates the 'guesses' counter", function(){
			expect(this.context.winningNumber.counter).toEqual(1);
		});
		it("can only be triggered up to five times", function(){
				checkGuess(this.context.testNums.winningNumber, 1);
				checkGuess(this.context.testNums.winningNumber, 2);
				checkGuess(this.context.testNums.winningNumber, 3);
				checkGuess(this.context.testNums.winningNumber, 4);
				expect(this.context.spies.lose).not.toHaveBeenTriggered();
				checkGuess(this.context.testNums.winningNumber, 5);
				expect(this.context.spies.lose).toHaveBeenTriggered();
		});
	});






// == CLICK THE HINT BUTTON == //
	describe("\nClicking the Hint Button", function(){
		beforeEach(function(){
			this.context = new Context([globalContext, hintButtonContext]);
		})
		it("fires a click event.", function () {
			expect('click').toHaveBeenTriggeredOn('#hintButton');
		});
		it("runs provideHint function", function() {
			expect(this.context.spies.provideHint).toHaveBeenCalled();
		})
		describe("tells the user about how far off he is, using an absolute value.", function(){
			expect(this.context.spies.sendPlayerMessage).toHaveBeenCalled();
			expect().toBe();
		});
	});






// == CLICK RESET BUTTON == //
	describe("\nClicking the Reset Button", function(){
		beforeEach(function(){
			this.context = new Context([globalContext, resetButtonContext]);
		});
		it("fires a click event", function(){
			expect('click').toHaveBeenTriggeredOn('#resetButton');
		});
		it("runs playAgain.", function(){
			expect(this.context.spies.playAgain).toHaveBeenCalled();
		});
		describe("\nThe playAgain function", function(){
			it("resets the counter.", function(){
				expect(this.context.winningNumber.counter).toEqual(0);
			});
			it("clears the input box.", function(){
				expect($('guessInput')).toHaveValue('');
			});
			it("focuses the input box.", function(){
				expect($('guessInput')).toBeFocused();
			});
			it("sends a message to the player.", function(){
				expect(this.context.spies.sendPlayerMessage).toHaveBeenCalledWith("Let's play again!");
			});
		})
	});






// == WIN GAME == //
	describe("\nWhen the player wins", function(){
		beforeEach(function(){
			this.context = new Context([globalContext, playerWinsContext]);
		});
		checkGuess(this.context.testNums.winningNumber, this.context.testNums.correct);
		it("the win function fires.", function(){
			expect(this.context.spies.win).toHaveBeenCalled();
		})
		it("the player gets a message.", function(){
			expect(this.context.spies.sendPlayerMessage).toHaveBeenCalledWith("You Win!");
		});
		it("the player gets an exciting animation.", function(){
			expect(this.context.spies.excitingAnimation).toHaveBeenCalled();
		});
		it("the win box opens.", function(){
			expect($('#winBox')).not.toHaveClass('collapse');
			expect($('#loseBox')).toHaveClass('collapse');
		});
		it("the player can donate an amount equal to his life number.", function(){
			expect($('#donationAmount')).toHaveValue(this.context.testNums.winningNumber);
		});
	});






// == LOSE GAME == //
	describe("When the player loses", function () {
		beforeEach(function(){
			this.context = new Context([globalContext, playerLosesContext]);
		});
		it("the lose function fires", function (){
			expect(this.context.spies.lose).toHaveBeenCalled();
		});
		it("the player gets a message.", function(){
			expect(this.context.spies.sendPlayerMessage).toHaveBeenCalledWith("You Lose. Would You Like to Play Again?");
		});
		it("the player gets a depressing animation.", function(){
			expect(this.context.spies.depressingAnimation).toHaveBeenCalled();
		});
		it("the lose box opens.", function(){
			expect($('#loseBox')).not.toHaveClass('collapse');
			expect($('#winBox')).toHaveClass('collapse');
		});
		it("the player can donate an amount equal to his life number.", function(){
			expect($('#donationAmount')).toHaveValue(this.context.testNums.winningNumber);
		});
	});















// contexts

//context constructor
function Context(dependencies) {

	let currentKeys = [];
	try{
		let context = {};
		dependencies.forEach(function(element, index, array){
			let oldContext = context;
			Object.assign(context, element(oldContext));
			currentKeys.push(Object.keys(context));
		});

		return context;
	} catch(e){console.log(e, currentKeys, dependencies)};
};









//contexts

function jasmineTest(oldContext) {

	let context = (typeof oldContext == 'object') ? Object.create(oldContext) : {};

		context.jasmineTest = jasmineWorking();
	//return context
	return context;
};

function globalContext(oldContext) {

	let context = (typeof oldContext == 'object') ? Object.create(oldContext) : {};

	spyOn(Math, 'random').and.returnValue(0.3524928);
	context.spies = generateSpies();
	//return context
	return context;

};

function getStartedContext(oldContext) {

	let context = (typeof oldContext == 'object') ? Object.create(oldContext) : {};

			//context.getStartedButton = new buttonTest('#get_started');



	return context;
};

function submitAnswerContext(oldContext) {
	let context = (typeof oldContext == 'object') ? Object.create(oldContext) : {};
			context.testNums = testNumbers();
	return context;
};

function hintButtonContext(oldContext) {
	let context = (typeof oldContext == 'object') ? Object.create(oldContext) : {};
	return context;
};

function resetButtonContext(oldContext) {
	let context = (typeof oldContext == 'object') ? Object.create(oldContext) : {};
	return context;
};

function playerWinsContext(oldContext) {
	let context = (typeof oldContext == 'object') ? Object.create(oldContext) : {};
	return context;
};

function playerLosesContext(oldContext) {
	let context = (typeof oldContext == 'object') ? Object.create(oldContext) : {};
	return context;
};






//helpers

function buttonTest(element) {
	let buttonObject = {
		click(){
			return $(element).click();
		},
		spy(){
			this.spy = spyOnEvent(element, 'click');
		}
	};

	return buttonObject;
};



//number tests

function generateSpies() {
	return {
		generateWinningNumber: spyOn(window, 'generateWinningNumber').and.callThrough(),
		playersGuessSubmission: spyOn(window, 'playersGuessSubmission').and.callThrough(),
		lowerOrHigher: spyOn(window, 'lowerOrHigher').and.callThrough(),
		checkGuess: spyOn(window, 'checkGuess').and.callThrough(),
		provideHint: spyOn(window, 'provideHint').and.callThrough(),
		playAgain: spyOn(window, 'playAgain').and.callThrough(),
		win: spyOn(window, 'win').and.callThrough(),
		lose: spyOn(window, 'lose').and.callThrough(),
		sendPlayerMessage: spyOn(window, 'sendPlayerMessage').and.callThrough()
	};
};

function testNumbers() {
	let testNumbers = {
		winningNumber: 35,
		correct: 35,
		tooLow: 20,
		tooHigh: 75,
		negativeGuess: -10,
		decimal: 10.3,
		overHundred: 200
	};
	return testNumbers;
}