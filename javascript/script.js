let selectedLevel = 'easy'; // Default to 'easy'
let wordList = {
    easy: ['cat', 'dog', 'bat', 'fish', 'ball'],
    intermediate: ['elephant', 'giraffe', 'mountain', 'computer', 'piano'],
    genius: ['quizzaciously', 'antidisestablishmentarianism', 'floccinaucinihilipilification', 'hippopotomonstrosesquipedaliophobia']
};
let attempts;
let word;
let guessedLetters = [];
let wrongGuesses = [];

document.querySelectorAll('.difficulty-button').forEach(button => {
    button.addEventListener('click', () => {
        selectedLevel = button.dataset.level;
        setDifficulty(selectedLevel);
    });
});

function setDifficulty(level) {
    if (level === 'easy') {
        attempts = 6;
    } else if (level === 'intermediate') {
        attempts = 5;
    } else {
        attempts = 4;
    }
    document.getElementById('attempts').textContent = `Attempts: ${attempts}`;
}

function startGame() {
    guessedLetters = [];
    wrongGuesses = [];
    word = getRandomWord(selectedLevel);
    displayWord();
    displayKeyboard();
    document.getElementById('wrong-guesses').textContent = `Wrong guesses: ${wrongGuesses.join(', ')}`;
}

function getRandomWord(level) {
    const words = wordList[level];
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex].toLowerCase();
}

function displayWord() {
    const wordDisplay = document.getElementById('word-display');
    wordDisplay.innerHTML = ''; // Clear the word display

    word.split('').forEach(letter => {
        const span = document.createElement('span');
        span.textContent = guessedLetters.includes(letter) ? letter : '_';
        wordDisplay.appendChild(span);
    });

    checkGameStatus();
}

function displayKeyboard() {
    const keyboard = document.getElementById('keyboard');
    keyboard.innerHTML = ''; // Clear the keyboard

    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    alphabet.forEach(letter => {
        const button = document.createElement('button');
        button.textContent = letter;
        button.classList.add('letter-button');
        button.addEventListener('click', () => handleGuess(letter));
        keyboard.appendChild(button);
    });
}

function handleGuess(letter) {
    if (guessedLetters.includes(letter) || wrongGuesses.includes(letter)) return;

    guessedLetters.push(letter);
    if (word.includes(letter)) {
        displayWord();
    } else {
        wrongGuesses.push(letter);
        attempts--;
        document.getElementById('attempts').textContent = `Attempts: ${attempts}`;
        document.getElementById('wrong-guesses').textContent = `Wrong guesses: ${wrongGuesses.join(', ')}`;
        displayWord();
    }
}

function checkGameStatus() {
    if (word.split('').every(letter => guessedLetters.includes(letter))) {
        alert('Congratulations! You won!');
    } else if (attempts <= 0) {
        alert('Game Over! You ran out of attempts!');
    }
}
