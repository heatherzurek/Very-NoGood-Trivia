import $ from 'jquery';
import './styles.css';
import { getSwansonQuote, getTriva } from './api-calls';
import { checkAnswer, displayAnswers, displayQuestion } from './functions';
import Ron1 from './../src/img/Ron1.png';

if(!sessionStorage.getItem('score')) {
  sessionStorage.setItem('score', 0);
}
const myRon = new Image();
myRon.src = Ron1;

$(document).ready(function(){
  let correctAnswer = "";

  $('#host').prepend(myRon);

  getSwansonQuote().then((response) => {
    $('#host-text').append(response + " Ok.  Next Question.");
  });

  getTriva().then(response => {

    displayQuestion(response);
    correctAnswer = displayAnswers(response);


    // localStorage.setItem("questionNumber", (stored + 1));
    localStorage.questionNumber = Number(localStorage.questionNumber) + 1;

  });
  
  $("#answers").on("click", "li", function(event) {
    event.preventDefault();
    let userAnswer = $(this).text();
    // let strId = this.getAttribute("data-id");
    // console.log(str, strId, correctAnswer);
    
    let isCorrect  = checkAnswer(userAnswer, correctAnswer);
    console.log(isCorrect);
    if(isCorrect) {
      // sessionStorage.clear();
      let oldScore = Number(sessionStorage.getItem('score'));
      console.log(oldScore);
      sessionStorage.setItem('score', (oldScore + 1));
      $("#playerScore").text(sessionStorage.getItem('score'));
    }
  });


});


