import $ from 'jquery';
import './styles.css';
import { getSwansonQuote, getTriva } from './api-calls';
import { buildAnswers, checkAnswer } from './functions';

$(document).ready(function(){
  let correctAnswer = "";
  getSwansonQuote().then((response) => {
    $('#swansonQuotes').append(response + " Ok.  Next Question.");
  });

  
  getTriva().then(response => {
    let incorrectAnswers = response["results"][0]["incorrect_answers"];
    correctAnswer = response['results'][0]["correct_answer"];
    let answers = buildAnswers(correctAnswer, incorrectAnswers);
    $('#questions').text(response["results"][0]["question"].replace(/&quot;/g,'"').replace(/&#039;/g, "'"));

    let counter =1;
    answers.forEach(answer => {
      $('#answers').append('<li data-id="' + counter  + '" class="answerBox">' + answer.replace(/&quot;/g,'"').replace(/&#039;/g, "'") + '</li>');
      counter++;
    });
  });

  $("#answers").on("click", "li", function(event) {
    event.preventDefault();
    let userAnswer = $(this).text();
    // let strId = this.getAttribute("data-id");
    // console.log(str, strId, correctAnswer);

    let isCorrect  = checkAnswer(userAnswer, correctAnswer);
    console.log(isCorrect);
  });
});

