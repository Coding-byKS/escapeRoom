import inquirer from "inquirer";
import chalk from 'chalk';

let options = [];

//Questions class

export class Question {
    constructor(id, question, answer, options) {
        this.id = id;
        this.question = question;
        this.answer = answer;
        this.options = options;
    }
}

//Questions, created using the Question class - inquirer uses these directly for the user prompts, index.js imports and uses these to retrieve the correct answers

export const backEnd = [ //Back-end questions 
    // 
    new Question(1, chalk.underline.blueBright("What is MongoDB"), "A NoSQL database management system", ["A relational database management system", "A NoSQL database management system", "A SQL database management system", "A graph database management system"]),
    new Question(2, chalk.underline.blueBright("In SQL, Retrieve all columns from the 'employees' table"), "SELECT * FROM employees", ["SELECT ALL FROM employees", "GET * FROM employees", "SELECT * FROM employees", "SHOW employees"]),
    // new Question(2,"Retrieve all columns from the products table, sorted by price in descending order","SELECT * FROM products ORDER BY price DESC", ["SELECT * FROM products SORT BY price DESC","ELECT * FROM products ORDER price DESC","SELECT * FROM products ORDER BY price DESC","GET * FROM products ORDER BY price DESC"]),
    new Question(3, chalk.underline.blueBright("Which programming paradigm emphasizes breaking down a problem into smaller, reusable components known as objects?"), "Object-Oriented", ["Imperative", "Procedural", "Object-Oriented", "Functional"]),
    // new Question(3,"Calculate the total number of records in the orders table","COUNT ALL FROM orders", ["TOTAL FROM orders","SUM FROM orders","COUNT ALL FROM orders","SELECT COUNT(id) FROM orders"]),
    new Question(4, chalk.underline.blueBright("What is the primary key used for in a relational database table?"), "It uniquely identifies each record in the table.", ["It stores the most important data in the table", "It is used to establish relationships between tables", "It uniquely identifies each record in the table.", "It is an optional field in the table"]),
    new Question(5, chalk.underline.blueBright("What is normalization in the context of database design?"), "It is the process of organizing data to minimize redundancy and dependency.", ["It is the process of adding redundancy to the database.", "It is the process of converting unstructured data into structured data.", "It is the process of organizing data to minimize redundancy and dependency.", "It is the process of encrypting sensitive data in the database."]),
]

export const frontEnd = [ //Front-end questions
    new Question(1, chalk.underline.blueBright("Which CSS box model property is used to set the space between the border and the content of an element?"), "padding", ["margin", "padding", "border-spacing", "border-width"]),
    new Question(2, chalk.underline.blueBright("Which CSS property is used to enable Flexbox layout?"), "display: flex;", ["display: inline-block;", "display: table-cell;", "display: flex;", "display: block;"]),
    new Question(3, chalk.underline.blueBright("Which method is used to select an element by its ID in JavaScript DOM?"), "getElementByID", ["getElementByTag", "querySelector", "getElementByID", "selectElement"]),
    new Question(4, chalk.underline.blueBright("What is Node.js?"), "A back-end JavaScript runtime environment", ["A database management system", "A front-end JavaScript framework", "A back-end JavaScript runtime environment", "A web browser"]),
    new Question(5, chalk.underline.blueBright("What does the term 'event-driven' mean in the context of Node.js?"), "Node.js reacts to events by executing callbacks", ["Node.js can only handle one event at a time", "Node.js processes events synchronously", "Node.js reacts to events by executing callbacks", "Node.js uses a push-based architecture for events"]),
    new Question(6, chalk.underline.blueBright("Which HTML tag is used to create a hyperlink?"), "<a>", ["<link>", "<a>", "<hyperlink>", "<href>"]),
    new Question(7, chalk.underline.blueBright("Create a HTML heading level 1 <h1> element containing the text 'Welcome to my website"), "<h1>Welcome to my website</h1>", ["<h2>Welcome to my website</h2>", "<h1>Welcome to my site</h1>", "<h1>Welcome to my website</h1>", "<h1>Welcome</h1>"]),
    new Question(8, chalk.underline.blueBright("In CSS, change the text color of a paragraph to red?"), "p { color: red; }", ["p { color: blue; }", "p { color: #00ff00; }", "p { color: red; }", "p { color: rgb(255, 0, 0); }"]),
    new Question(9, chalk.underline.blueBright("In CSS, set the font size of a heading to 20 pixels"), "h1 { font-size: 20px; }", ["h1 { font-size: large; }", "h1 { font-size: 1.5em; }", "h1 { font-size: 20px; }", "h1 { size: 20px; }"]),
    new Question(10, chalk.underline.blueBright("In CSS, add a solid black border of 2 pixels to a div"), "div { border: 2px solid black; }", ["div { border: 1px solid black; }", "div { border: 2px dashed black; }", "div { border: 2px solid black; }", "div { border: 5px solid black; }"]),
    new Question(11, chalk.underline.blueBright("Which NPM package provides an easy way to capture user input in your Node?"), "inquirer", ["terminal", "node", "inquirer", "script"]),
]
//Enter the escape room prompt
export const start = async () => {
    let { userInput } = await inquirer.prompt({
        name: "userInput",
        type: "list", // confirm type also works for a Y/N response, but this is consistent with the other prompts
        message: "Do you want to enter The Escape Room?",
        choices: ["Yes", "No"]
    })
    return userInput;
}
//Superhero name prompt

export const superHero = async () => {
    let { userInput } = await inquirer.prompt({
        name: "userInput",
        type: "list", // confirm type also works for a Y/N response, but this is consistent with the other prompts
        message: "Would you like a superhero name?",
        choices: ["Yes", "No"]
    })
    return userInput;
}
//Front end or back end prompt
export const chooseRoom = async () => {
    let { userInput } = await inquirer.prompt({
        name: "userInput",
        type: "list",
        message: "Would you like to enter the front end room or the back end room?",
        choices: ["Front End", "Back End"]
    })
    return userInput;
}

//Switching to the other room
export const enterOtherRoom = async () => {
    let { userInput } = await inquirer.prompt({
        name: "userInput",
        type: "list",
        message: "Are you ready to switch over to the front-end room",
        choices: ["Yes", "No"]
    })
    return userInput;
}
//Answering questions

export const backendRoomQuestions = async (i) => { //Will need value passed into the function so it can be used
    let { userInput } = await inquirer.prompt({
        name: "userInput",
        type: "list",
        message: `${i + 1}: ${backEnd[i].question}`, //The question
        choices: backEnd[i].options, //Options that the user can choose from
    })
    return userInput;
}

export const frontendRoomQuestions = async (i) => { //Will need value passed into the function so it can be used
    let { userInput } = await inquirer.prompt({
        name: "userInput",
        type: "list",
        message: `${i + 1}: ${frontEnd[i].question}`, //The question
        choices: frontEnd[i].options, //Options that the user can choose from
    })
    return userInput;
}

//Start final key

export const startFinalKey = async () => {
    let { userInput } = await inquirer.prompt({
        name: "userInput",
        type: "list",
        message: "Are you ready to enter the final key?",
        choices: ["Yes", "No"]
    })
    return userInput
}

export const checkFinalKey = async () => {
    let { userInput } = await inquirer.prompt({
        name: "userInput",
        type: "text",
        message: "Please enter the Final Key. Hint: add up all the clues you received in the front end room. It is an anagram for the Final Key.",
    })
    return userInput;
}


// Inquirer functions:
// function start: asking user if they want to enter the Coding Escape Room(yes/no)
// name: "result"
// type: "list"
// message: "Do you want to enter the escape room?"
// choices" ["yes", "no"]

// function superHero: to ask user whether they want a superhero name assigned(yes/no)

// function choose: asking whether front end room or back end room
// function startFE: asking whether the user is ready to enter the Frontend room from the backend room

//function: frontRoom: sending front end questions to user along with options
// function: backRoom: sending back end questions to user along with options
// function: startFinalKey: asking whether the user ready to enter final key(yes/no)
// function: checkFinalKey: get final key from the user to check against Final key
