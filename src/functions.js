export function buildAnswers(string, array){
  let index = Math.floor(Math.random() * 3); 
  array.splice(index, 0, string);
  return array;
}

export function checkAnswer(userAnswer, correctAnswer){
  return (userAnswer == correctAnswer);
}
