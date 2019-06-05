import $ from 'jquery';

export function getSwansonQuote() {
  return $.ajax({
    url: "https://ron-swanson-quotes.herokuapp.com/v2/quotes",
    type: "GET",
    data: { format: "json" },
    success: function(response) {
      return response[0];
    },
    error: function() {
      return "Swanson quote failed.";
    }
  });
}

export function getTriva() {
  return $.ajax({
    url: "https://opentdb.com/api.php?amount=1&type=multiple",
    type: "GET",
    data: { format: "json" },
    success: function(response) {
      return response;
    },
    error: function() {
      return "Trivia question failed.";
    }
  });
}
