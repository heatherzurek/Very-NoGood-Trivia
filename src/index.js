import $ from 'jquery';
import './styles.css';
import { getSwansonQuote, getTriva } from './api-calls';
import { clearScores,checkAnswer, displayAnswers, displayQuestion, displayPlayerScore, applyAnswer } from './functions';
import Ron1 from './../src/img/Ron1.png';

if(!sessionStorage.getItem('score')) {
  sessionStorage.setItem('score', 0);
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

  //listen for clicks on answers
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
      displayPlayerScore();
    }
  });

}

