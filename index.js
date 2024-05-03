//import inquirer from "inquirer"; - inquirer is used in inq.js, not directly in index.js
import superheroes from "superheroes";
import chalk from 'chalk';
import { start, superHero, chooseRoom, enterOtherRoom, frontEnd, backEnd } from './functions/inq.js';
import { backendRoomQuestions, frontendRoomQuestions, startFinalKey, checkFinalKey } from './functions/inq.js';

const delay = time => new Promise(res => setTimeout(res, time)); //Delay function
const backEndClues = ["front", "end"];
const frontEndClues = ["grw", "tho", "pony", "cam"];
let i = 0, correctCounter = 0, incorrectCounter = 0;
let backEndComplete = false;
//let frontEndComplete = false;

//Score subclass and functions

class Player { //Class, only stores name
    constructor(PName) {
        this.PName = PName;
    }
}

class Score extends Player { //Subclass of Player, adds variables and functions for scores
    constructor(PName, questionsAnswered, questionsCorrect, questionsIncorrect) {
        super(PName)
        this.questionsAnswered = questionsAnswered
        this.questionsCorrect = questionsCorrect
        this.questionsIncorrect = questionsIncorrect
    }

    updateScore() {
        //console.log(`[Values to add: ${i+1}, ${correctCounter}, ${incorrectCounter}]`) //Show what is being added, for testing - remove slashes behind console.log
        totalScore.questionsAnswered = totalScore.questionsAnswered + (i + 1); //Add i value and one to account for starting at index number (zero)
        totalScore.questionsCorrect = totalScore.questionsCorrect + (correctCounter); //Add correctCounter value
        totalScore.questionsIncorrect = totalScore.questionsIncorrect + incorrectCounter; //Add incorrectCounter value
        return this;
    }

    updateScoreFinalCorrect() {
        totalScore.questionsAnswered++; //Increment answered
        totalScore.questionsCorrect++; //Increment correct
        return this;
    }

    updateScoreFinalLoss() {
        totalScore.questionsAnswered++; //Increment answered
        totalScore.questionsIncorrect++; //Increment incorrect
        return this;
    }

    showScore() {
        console.log(`${totalScore.PName}'s Score - Answered: ${totalScore.questionsAnswered}, Correct: ${totalScore.questionsCorrect}, Incorrect: ${totalScore.questionsIncorrect}`);
        return this;
    }
}

let totalScore

//Back End

const enterBE = async () => {
    while (correctCounter < 2 || incorrectCounter < 3) {
        const answer = await backendRoomQuestions(i);
        console.log(`Your answer is: ${answer}`); //Answer input is displayed
        if (backEnd[i].answer == answer) { //Checks if it is correct
            console.log(`You are correct! Here is your clue: ${backEndClues[correctCounter]}`); //Gives one part of the clue based on the counter
            console.log("Please note it down for your Final Key.")
            await delay(1500);

            if (correctCounter < 1) {
                i++; correctCounter++;
            } else { //If second correct answer
                backEndComplete = true;
                correctCounter++; //Increment final correct answer for this section
                totalScore.updateScore(); //Update score with i, correctCounter and incorrectCounter
                totalScore.showScore(); //Show score
                console.log("Well done in the Back-end room. But as your clues say, there is no escaping the front-end, you are ready to enter the front-end room now.");
                return "exit";
            }

        } else { //Wrong answer
            console.log(`That is incorrect. The correct answer was ${backEnd[i].answer}.`)
            await delay(700);

            if (incorrectCounter < 2) {
                i++, incorrectCounter++;
                console.log("Let's try another question.");
                await delay(1000);
            } else {
                console.log("Back-end doesn't seem to be your friend. You may want to try your luck in the front-end room.")
                incorrectCounter++;
                totalScore.updateScore(); //Update score with i, correctCounter and incorrectCounter
                totalScore.showScore(); //Show score
                await delay(1000);
                return "exit";
            }
        }
    }
}

//Back End simple (if you choose Front End first)

const enterBESimple = async () => {
    i = 0, correctCounter = 0, incorrectCounter = 0;
    while (correctCounter < 2 || incorrectCounter < 3) {
        const answer = await backendRoomQuestions(i);
        console.log(`Your answer is: ${answer}`); //Answer input is displayed
        if (backEnd[i].answer == answer) { //Checks if it is correct
            console.log("You are correct! Here is your " + chalk.yellowBright("gold coin"));
            await delay(1500);
            if (correctCounter < 1) {
                i++; correctCounter++;
            } else { //If second correct answer
                backEndComplete = true;
                correctCounter++; //Increment final correct answer for this section
                totalScore.updateScore(); //Update score with i, correctCounter and incorrectCounter
                totalScore.showScore(); //Show score
                console.log("Well done in the Back-end room, you now have two gold coins. You can enter your Final Key now.");
                return;
            }
        } else { //Wrong answer
            console.log(`That is incorrect. The correct answer was ${backEnd[i].answer}.`)
            await delay(700);
            if (incorrectCounter < 4) {
                i++, incorrectCounter++;
                console.log("Let's try another question.");
                await delay(1000);
            } else {
                console.log("I am sorry but you needed TWO coins to enter the Final Key! Better luck next time")
                incorrectCounter++;
                totalScore.updateScore(); //Update score with i, correctCounter and incorrectCounter
                totalScore.showScore(); //Show score
                await delay(1000);
                return "exit";
            }
        }
    }
}

//Front End

const enterFE = async () => {
    i = 0, correctCounter = 0, incorrectCounter = 0;
    while (correctCounter < 4 || (correctCounter + incorrectCounter) < 6) {
        const answer = await frontendRoomQuestions(i);
        console.log(`Your answer is: ${answer}`);
        if (answer == frontEnd[i].answer) { //Checks if the answer is correct
            await delay(700);
            console.log(`You are correct! Here is your clue: ${frontEndClues[correctCounter]}`); //Gives one part of the clue based on the counter
            await delay(700);
            console.log("Please note it down for your Final Key.");
            await delay(1500);
            if (correctCounter >= 3) { //If correct answer and counter is already at 3 or more
                //frontEndComplete = true;
                correctCounter++; //Increment final correct answer for this section
                totalScore.updateScore(); //Update score with i, correctCounter and incorrectCounter
                totalScore.showScore(); //Show score
                await delay(1000);
                console.log("HOORAY! You have all the clues. Looks like you can enter the Final Key here.");
                if (backEndComplete == false) {
                    await delay(1000);
                    console.log("But not so fast, you need to earn 2 gold coins from the Back End Room before you can do that.");
                }
                await delay(2000);
                return;
            } else { //If correct answer but not enough to finish yet
                i++; correctCounter++;
            } 
        } else { //Wrong answer
            console.log(`That is incorrect. The correct answer was ${frontEnd[i].answer}.`)
            if (incorrectCounter + correctCounter < 5) { //If incorrect answer but answered less than 5 questions
                console.log("Let's try another question.");
                i++, incorrectCounter++;
                await delay(700);
            } else { //Incorrect and has answered 5 questions already
                console.log("You have run out of questions. Try again later!")
                incorrectCounter++;
                totalScore.updateScore(); //Update score with i, correctCounter and incorrectCounter
                totalScore.showScore(); //Show score
                return "exit";
            }

        }
    }

}

//Final Key

const getFinalKey = async () => {
    const response = await startFinalKey();
    if (response == "Yes") {
        incorrectCounter = 0;
        while (incorrectCounter < 3) { //3 attempts to enter the correct answer
            const finalKey = await checkFinalKey();
            if (finalKey.toLowerCase() == "growth company" || finalKey.toLowerCase() == "growthcompany") { //Checks that user input (as lowercase) is correct
                console.log(`You entered: ${finalKey}.`)
                await delay(1500);
                console.log(`CONGRATULATIONS! YOU HAVE FOUND YOUR WAY OUT!`); //Win the game
                totalScore.updateScoreFinalCorrect();
                totalScore.showScore(); //Show final score
                return;
            } else { //Wrong answer
                console.log(`You entered: ${finalKey}.`);
                await delay(1000);
                console.log("Incorrect Final Key, please try again.");
                await delay(1000);
                incorrectCounter++;
            }
        }
        await delay(1000);
        console.log("You have tried THREE wrong Final Keys");
        await delay(1000);
        console.log("Here is a hint for you. This Software Bootcamp is run by this company.");

        //Player is given another 3 attempts to enter the correct answer

        incorrectCounter = 0;
        while (incorrectCounter < 3) {
            const finalKey = await checkFinalKey();
            if (finalKey.toLowerCase() == "growth company" || finalKey.toLowerCase() == "growthcompany") { //Checks that user input (as lowercase) is correct
                console.log(`You entered: ${finalKey}.`)
                await delay(1500);
                console.log(`CONGRATULATIONS! YOU HAVE FOUND YOUR WAY OUT!`); //Win the game
                totalScore.updateScoreFinalCorrect();
                totalScore.showScore(); //Show final score
                return;
            } else {
                console.log(`You entered: ${finalKey}.`);;
                console.log("Incorrect Final Key, please try again.")
                incorrectCounter++;
            }
        }
        console.log("You have tried THREE incorrect Final Keys again!");
        await delay(500);
        console.log("We have run out of time. Better luck next time."); //Lost the game - too many incorrect inputs
        totalScore.updateScoreFinalLoss();
        totalScore.showScore(); //Show final score
        await delay(500);
    } else { console.log("Sorry, you cannot move ahead then. Better luck next time!") }
}

//Display - this is the function for the start of the game and calls the other functions within it

const display = async () => {
    const response = await start(); //"Do you want to enter The Escape Room?"
    await delay(500);
    if (response == "Yes") { //Checks response
        const nameNeeded = await superHero(); //Ask user if they want superhero name
        await delay(500);
        if (nameNeeded == "Yes") { //Checks response
            const name = superheroes[Math.round(Math.random() * superheroes.length)]; //Gives a name using the imported superheroes package
            console.log(`Hi ${name}, Welcome to the Coding Escape Room!`);
            totalScore = new Score(name, 0, 0, 0) //Set totalScore to new Score object
        } else {
            const name = superheroes[Math.round(Math.random() * superheroes.length)]; //Gives a name anyway
            console.log(`Too bad, we will still give you one. Your super hero name is ${name}, Welcome to the Coding Escape Room!`);
            totalScore = new Score(name, 0, 0, 0) //Set totalScore to new Score object
        }

        await delay(1500);
        const choice = await chooseRoom(); //Ask user which room they want to start with
        if (choice == "Front End") { //If the choice is front-end...
            const fe = await enterFE(); //Enter front-end
            if (fe == "exit") {
                return;
            } else {
                const beSimple = await enterBESimple();
                if (beSimple == "exit") {
                    return;
                } else {
                    const fk = await getFinalKey(); //Final key
                }
            }
        } else { //Back-end
            const be = await enterBE(); //Enter back-end
            const response = await enterOtherRoom(); //After back-end is completed, ask user if they are ready to enter the front-end
            if (response == "Yes") {
                const fe = await enterFE(); //Enter front-end
                if (fe == "exit") {
                    return;
                } else {
                    const fk = await getFinalKey(); //Final key
                }
            } else { console.log("Sorry, you cannot move ahead then. Better luck next time!") }
        }
    } else { console.log("Cool, we will see you later!") } //Did not enter the escape room
}

display(); //Starts the game