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
    url: "https://opentdb.com/api.php?amount=1",
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

export function getInsults() {
  return $.ajax({
    url: "https://cors-anywhere.herokuapp.com/evilinsult.com/generate_insult.php?lang=en&type=json",
    type: "GET",
    data: {format: "json" },
    success: function(response) {
      return response;
    },
    error: function() {
      return "Insult failed.";
    }
  });
}