let playerHand = [];
let dealerHand = [];

function deal() {
  // Initialize player and dealer hands with two random cards each
  playerHand = [getRandomCard(), getRandomCard()];
  dealerHand = [getRandomCard(), getRandomCard()];

  // Display initial hands
  document.getElementById("playerHand").innerHTML = playerHand.join(", ");
  document.getElementById("dealerHand").innerHTML = dealerHand[0] + ", ?";

  // Enable Hit and Stand buttons
  document.getElementById("hitButton").disabled = false;
  document.getElementById("standButton").disabled = false;
}

function getRandomCard() {
  const cards = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
  return cards[Math.floor(Math.random() * cards.length)];
}

function hit() {
  // Add a random card to the player's hand
  playerHand.push(getRandomCard());
  
  // Display the updated hand
  document.getElementById("playerHand").innerHTML = playerHand.join(", ");
  
  // Check if the player busts (hand value > 21)
  if (getHandValue(playerHand) > 21) {
    document.getElementById("result").innerHTML = "Player busts! Dealer wins.";
    disableButtons();
  }
}

function stand() {
  // Dealer reveals their second card
  document.getElementById("dealerHand").innerHTML = dealerHand.join(", ");
  
  // Dealer draws cards until their hand value is at least 17
  while (getHandValue(dealerHand) < 17) {
    dealerHand.push(getRandomCard());
    document.getElementById("dealerHand").innerHTML = dealerHand.join(", ");
  }
  
  // Determine the winner
  const playerValue = getHandValue(playerHand);
  const dealerValue = getHandValue(dealerHand);

  if (playerValue > 21 || (dealerValue <= 21 && dealerValue >= playerValue)) {
    document.getElementById("result").innerHTML = "Dealer wins.";
  } else if (dealerValue > 21 || playerValue > dealerValue) {
    document.getElementById("result").innerHTML = "Player wins!";
  } else {
    document.getElementById("result").innerHTML = "It's a tie!";
  }

  disableButtons();
}

function getHandValue(hand) {
  // Calculate the value of a hand (Ace can be 1 or 11)
  let value = 0;
  let numAces = 0;

  for (const card of hand) {
    if (card === "A") {
      numAces++;
      value += 11;
    } else if (["K", "Q", "J"].includes(card)) {
      value += 10;
    } else {
      value += parseInt(card);
    }
  }

  // Adjust for aces if needed
  while (value > 21 && numAces > 0) {
    value -= 10;
    numAces--;
  }

  return value;
}

function disableButtons() {
  // Disable Hit and Stand buttons
  document.getElementById("hitButton").disabled = true;
  document.getElementById("standButton").disabled = true;
}

// Link functions to buttons
document.getElementById("dealButton").addEventListener("click", deal);
document.getElementById("hitButton").addEventListener("click", hit);
document.getElementById("standButton").addEventListener("click", stand);
