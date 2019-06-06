import $ from 'jquery';
import { Player } from './objects';

export function spliceAnswers(string, array){
  let index = Math.floor(Math.random() * 3);
  array.splice(index, 0, string);
  return array;
}

export function checkAnswer(userAnswer, correctAnswer){
  return (userAnswer == correctAnswer);
}

export function displayAnswers(responseObj) {
  let incorrectAnswers = responseObj["results"][0]["incorrect_answers"];
  let correctAnswer = responseObj['results'][0]["correct_answer"];
  let answers = spliceAnswers(correctAnswer, incorrectAnswers);
  let counter = 1;
  answers.forEach(answer => {
    $('#answers').append('<li data-id="' + counter  + '" class="answerBox"><p>' + answer.replace(/&quot;/g,'"').replace(/&#039;/g, "'") + '</p></l1>');
    counter++;
  });
  return correctAnswer;
}

export function displayQuestion(responseObj){
  $('#host-question').text(responseObj["results"][0]["question"].replace(/&quot;/g,'"').replace(/&#039;/g, "'"));
}

export function clearScores(){
  sessionStorage.setItem('score', 0);
  displayPlayerScore();
}

export function displayPlayerScore(){
  $("#score").text(" " + sessionStorage['score']);
}

export function applyAnswer(isCorrect, eventObj) {
  isCorrect ? $(eventObj).addClass('correctAnswer') : $(eventObj).addClass('wrongAnswer');
  $('li').addClass('unClickable');
}

export function displayResponse(isCorrect, correctAnswer) {
  let answer= correctAnswer;
  let correct = "You are correct. Well played.";
  let wrong = "You are very, very wrong.";
  if(isCorrect){
    $('#host-text').text(correct);
    // $('#host').append('<p class="response">You are correct.  Well played.</p>');
  } else {
    $('#host-text').text(wrong + "The correct answer is, " + answer + ". I knew that.");
    // $('#host').append('<p class="response">You are very wrong.</p>');
  }
  $('#host').append('<button id="nextButton">Next Question</button>');
}

export function getPlayerCount() {
  return sessionStorage.getItem('playerCount');
}

export function buildPlayerForm(){
  let count = getPlayerCount();
  $('#preGame').append('<form id="playerInfoForm"></form>');
  for(let i = 1; i <= count; i++) {
    $('#playerInfoForm').append('<label for="playerNameInput">Player ' + i + ' Name</label>',
      '<input type="text" name="playerNameInput" id="player' + i + '" name.>');
  }
  $('#preGame').append('<button id="playerInfoSubmit">Let\'s Play</button>');
}

export function createPlayerObjects() {
  let count = getPlayerCount();
  let players = [];
  for(let i = 0; i<= count -1; i++) {
    let id = "#player"+(i+1);
    let name = $(id).val();
    let player = new Player(name);
    players.push(player);
  }
  return players;
}