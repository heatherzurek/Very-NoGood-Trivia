import $ from 'jquery';
import './styles.css';
import { getSwansonQuote, getTriva, getInsults } from './api-calls';

$(document).ready(function(){
  getSwansonQuote().then((response) => {
    $('#swansonQuotes').append(response + " Ok.  Next Question.");
  });

  

  getTriva().then(response => {
    $('#questions').text(response["results"][0]["question"].replace(/&quot;/g,'"'));
  });

  getInsults().then(response => {
    let result = JSON.parse(response);
    $('#insults').text(result['insult'].replace(/&quot;/g,'"'));
  });

});