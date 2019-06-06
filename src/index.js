import $ from 'jquery';
import './styles.css';
import { getSwansonQuote, getTriva } from './api-calls';
import { clearScores,checkAnswer, displayAnswers, displayQuestion, displayPlayerScore, applyAnswer, displayResponse, buildPlayerForm, createPlayerObjects } from './functions';
import Ron1 from './../src/img/Ron1.png';
import { Game } from './objects';

if(!sessionStorage.getItem('score')) {
  sessionStorage.setItem('score', 0);
}
if(!sessionStorage.getItem('newGame')) {
  sessionStorage.setItem('newGame', false);
}

if(!sessionStorage.getItem('game')) {
  // let newGame = new Game();
  sessionStorage.setItem('game', new Game());
}

const myRon = new Image();
myRon.src = Ron1;
let correctAnswer;

$(document).ready(function(){

  $('#host').prepend(myRon);

  attatchListeners();

  getSwansonQuote().then((response) => {
    $('#host-text').append(response + " Ok.  Next Question.");
  });

  getTriva().then(response => {
    displayQuestion(response);
    correctAnswer = displayAnswers(response);
    localStorage.questionNumber = Number(localStorage.questionNumber) + 1;
  });

});

function attatchListeners(){

  //clear scores
  $('#clear').on('click', ()=> clearScores());


  //listen for presses on answer divs
  $("#answers").on("click", "li", function(event) {
    event.preventDefault();
    // let strId = this.getAttribute("data-id");
    let userAnswer = $(this).text();
    let isCorrect  = checkAnswer(userAnswer, correctAnswer);
    // console.log(isCorrect);

    applyAnswer(isCorrect, this);

    if(isCorrect) {
      let oldScore = Number(sessionStorage.getItem('score'));
      sessionStorage.setItem('score', (oldScore + 1));
    }
    displayPlayerScore();
    displayResponse(isCorrect);
  });

  //next question
  $('#host').on("click", "button", ()=> window.location.reload());

  //get player count
  $('#submitPlayerCount').on('click', (e)=>{
    e.preventDefault();
    let userValue = $('#playerCount').val();
    sessionStorage.setItem('playerCount', userValue);
    buildPlayerForm();
  });

  //create player objects in sessionStorage
  $('#preGame').on('click', '#playerInfoSubmit', ()=>{
    let players = (createPlayerObjects());
    console.log(players);
    
    sessionStorage.setItem('game', JSON.stringify(players));
    console.log(sessionStorage.getItem('game'));
    console.log(JSON.parse(sessionStorage.getItem('game'))[0].name);
  });

}
