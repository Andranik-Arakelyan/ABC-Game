export function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

export function getRandomFromRange(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

export function questionGenerate(currentLevel, ALPHABET, LEVELS) {
  let quizIndex = getRandomFromRange(0, ALPHABET.length);
  let quiz = ALPHABET[quizIndex];
  let plusNumber = getRandomFromRange(
    LEVELS[currentLevel].range[0],
    LEVELS[currentLevel].range[1]
  );
  return {
    question: `${quiz} + ${plusNumber}`,
    answerIndex: quizIndex + plusNumber,
  };
}

export function answersGenerate(answerIndex, ALPHABET) {
  let alphabetCopy = ALPHABET.slice();
  let correctLetter =
    answerIndex < alphabetCopy.length ? alphabetCopy[answerIndex] : "NO";
  let alphWithout = alphabetCopy
    .concat(["NO"])
    .filter((letter) => letter !== correctLetter);

  let wrongAnswers = [1, 2, 3].map(() => {
    let letter = alphWithout[getRandomFromRange(0, alphWithout.length)];
    alphWithout = alphWithout.filter((item) => item !== letter);
    return letter;
  });

  return {
    answer: correctLetter,
    allAnswers: shuffle([...wrongAnswers, correctLetter]),
  };
}
