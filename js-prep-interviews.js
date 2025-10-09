'use strict';
// Object
const person = {
    name: "Tu",
    old: 34,
    homeTown: 'Hanoi',

    great: function (message) {
        //name = 'Tung3'; // this can be in strict mode without error. But this cause problem when we declare new name global variable
        // USE this.name instead => Update `Tu` to new value
        const name = 'Tunggg';
        console.log(name);
        console.log(`${message}. Hi my name is ${this.name}`);
    },

    getName: function() {
        console.log(`My name is ${this.name}`)
    },

    thisAccessMethod: function() {
        this.name = 'Hung';
        console.log('block scope this test', this.name);

        function regularChild() {
            console.log('regular func + this test:', this.name); // undefined
        }


        const arrowChild = () => {
            this.name = 'Binh';
            this.old = 30;
            console.log('arrow func + this test:', this.name);
        }

        regularChild.apply(this);
        arrowChild();
    }

}

//const Hung = Object.create(person);
//Hung.name = 'Hung'
//const HungName = Hung.getName();
//console.log(HungName)

//const hiAlice = person.great.bind(person, 'Hello My class roommate is Alice');
//hiAlice()


const callExam = person.great.bind(person, 'Hi bind')
callExam();
console.log(this);//global this
person.thisAccessMethod();
person.great('Hi again');
console.log(person.name);
console.log(person.old);


const quiz = {
    score: 0,
    
    questions: [
        {question: "What is 2 + 2 ?", answer: "4"},
        {question: "What is the capital of France", answer: "Paris"}
    ],

    displayScore: function() {
        console.log(`Your current score is : ${this.score}`); //this in block scope
    },

    checkAnswer: function(questionIndex, userAnswer) {
        if (this.questions[questionIndex].answer.toLowerCase() === userAnswer.toLowerCase()) {
            this.score++; // update score for correct
            console.log('Correct!');
        } else {
            console.log('Incorrect!');
        }
    },

    startQuiz: function() {
        console.log('Starting attemp quiz');
        this.checkAnswer(0, "4");
        this.checkAnswer(1, 'Berlin');
        this.checkAnswer(1, 'paRis');
        this.displayScore();
    }
}

quiz.startQuiz();



// Closures
// useful for data encapsulation and privacy, Beware of memory leaks 
// functions retain access to variables from outer scope even after execution
function outer() {
    let count = 0;

    return function inner() {
        count++;
        return count;
    }
}

const counter = outer();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
console.log(`${counter.count}`,counter().inner)


//async/await
/**
 *  event loop, call stack, event queue
 *  proper error handling async flows
 */

//prototypes, inheritance

const animal = {
    speak() {
        console.log('Animal sound')
    }
}

const dog = Object.create(animal);

dog.bark = function() {
    console.log('Woof')
}

dog.speak();
dog.bark();


// Array, Set, manipulation

const arr = [1,2,3,4]
const doubled = arr.map(x => x*2);
console.log(doubled);console.log(arr);
const filtered = doubled.filter(x => x > 4)
console.log(filtered);console.log(arr)
const reduced = arr.reduce((res, x) => {return res + x}, 0);
console.log(reduced);console.log(arr);

// Var, Let, Const


// Deep Clone, Shadow Clone