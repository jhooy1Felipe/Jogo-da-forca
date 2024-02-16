const initialWordsAndHints = [
    { word: 'maçã', hint: 'Fruta vermelha' },
    { word: 'pera', hint: 'Fruta verde e doce' },
    { word: 'manga', hint: 'Fruta gostosa, verde por fora amarela por dentro' },
    { word: 'coco', hint: 'Fruta que tem água dentro' },
    { word: 'uva', hint: 'Fruta roxa ou verde, pequena e redonda' },
    { word: 'limão', hint: 'Fruta verde e ácida' },
    { word: 'kiwi', hint: 'Fruta marrom e peluda por fora, verde por dentro' },
    { word: 'melão', hint: 'Fruta grande e doce' },
    { word: 'caju', hint: 'Fruta doce e gostosa que contem castanha' },
    { word: 'jambo', hint: 'Fruta pequena, meia roxa e doce' }
];

let selectedWord, hint, remainingAttempts = 3, hiddenWord = '';
let correctAnswers = 0;
let userGuess;

correctAnswers = 0;

// Função para escolher uma palavra aleatória com dica
function chooseRandomWord() {
    if (initialWordsAndHints.length > 0) {
        const randomIndex = Math.floor(Math.random() * initialWordsAndHints.length);
        const selectedWordObj = initialWordsAndHints.splice(randomIndex, 1)[0];
        selectedWord = selectedWordObj.word;
        hint = selectedWordObj.hint;

        // Inicializar a palavra escondida
        hiddenWord = '_'.repeat(selectedWord.length);

        // Atualizar elementos no HTML
        document.getElementById('start-letter').innerText = selectedWord.charAt(0).toUpperCase();
        document.getElementById('hint').innerText = hint;
        document.getElementById('result').innerText = '';
        document.getElementById('input-box').value = '';
        document.getElementById('submit-button').style.display = 'block';
        document.getElementById('next-question-button').style.display = 'none';
    }
}

// Inicializar o jogo
chooseRandomWord();

// Função para verificar a adivinhação do usuário
function Buton() {
    userGuess = document.getElementById('input-box').value.toLowerCase();
    if (/^[a-zà-ú]+$/.test(userGuess)) {
        if (userGuess === selectedWord) {
            document.getElementById('result').innerText = 'Parabéns! Você acertou!';
            document.getElementById('result').style.color = '#4caf50';
            document.getElementById('submit-button').style.display = 'none';
            document.getElementById('next-question-button').style.display = 'block';
            correctAnswers++;
        } else {
            remainingAttempts--;
            updateHiddenWord(userGuess);
            updateHangman();
            document.getElementById('result').innerText = hiddenWord;

            if (remainingAttempts === 0) {
                document.getElementById('result').innerText = 'Ops! Suas tentativas acabaram. A palavra era: ' + selectedWord;
                document.getElementById('result').style.color = '#e74c3c';
                document.getElementById('submit-button').style.display = 'none';
                document.getElementById('next-question-button').style.display = 'block';
            }
        }
    } else {
        document.getElementById('result').innerText = 'Por favor, digite uma palavra válida.';
        document.getElementById('result').style.color = '#e74c3c';
    }
}

// Função para passar para a próxima pergunta
function nextQuestion() {
    remainingAttempts = 3;
    chooseRandomWord();

    if (initialWordsAndHints.length === 0) {
        document.getElementById('next-question-button').style.display = 'none';
        document.getElementById('restart-button').style.display = 'block';
        document.getElementById('show-result-button').style.display = 'block'; // Adicionado botão de mostrar resultado
    } else {
        document.getElementById('submit-button').style.display = 'block';
        document.getElementById('next-question-button').style.display = 'none';
    }
}

// Função para mostrar o resultado em um pop-up
function showResultsPopup() {
    const correctAnswersCount = correctAnswers;
    const incorrectAnswersCount = wordsAndHints.length - correctAnswersCount;

    const resultPopup = document.getElementById('result-popup');
    resultPopup.style.display = 'block';

    document.getElementById('correct-count').innerText = correctAnswersCount;
    document.getElementById('incorrect-count').innerText = Math.max(0, incorrectAnswersCount); // Correção aqui
}


// Função para fechar o pop-up de resultado
function closeResultsPopup() {
    const resultPopup = document.getElementById('result-popup');
    resultPopup.style.display = 'none';
}

// Função para reiniciar o jogo
function restartGame() {
    correctAnswers = 0;
    remainingAttempts = 3; // Reiniciar o número de tentativas
    initialWordsAndHints.push(...initialWordsAndHints); // Restaurar a lista de perguntas
    chooseRandomWord(); // Iniciar a primeira pergunta
    document.getElementById('restart-button').style.display = 'none';
    document.getElementById('submit-button').style.display = 'block';
    document.getElementById('next-question-button').style.display = 'none';
}

// Função para atualizar a palavra escondida
function updateHiddenWord(letter) {
    for (let i = 0; i < selectedWord.length; i++) {
        if (selectedWord[i] === letter && hiddenWord[i] === '_') {
            hiddenWord = hiddenWord.substr(0, i) + letter + hiddenWord.substr(i + 1);
        }
    }
}

// Função para atualizar o desenho da forca
function updateHangman() {
    document.getElementById('hangman').innerText = 'Tentativas restantes: ' + remainingAttempts;

    switch (remainingAttempts) {
        case 5:
            document.getElementById('hangman').innerText += '  (°_°)';
            break;
        case 4:
            document.getElementById('hangman').innerText += '  |(°_°)|';
            break;
        case 3:
            document.getElementById('hangman').innerText += ' /|(°_°)|\\';
            break;
        case 2:
            document.getElementById('hangman').innerText += ' /|(°_°)|\\';
            break;
        case 1:
            document.getElementById('hangman').innerText += '  /|\\';
            break;
        case 0:
            document.getElementById('hangman').innerText += '  X|X';
            break;
    }
}
