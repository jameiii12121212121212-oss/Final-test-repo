"use client";

import { FormEvent, useState } from "react";

const MIN_NUMBER = 1;
const MAX_NUMBER = 100;

function getRandomNumber() {
  return Math.floor(Math.random() * (MAX_NUMBER - MIN_NUMBER + 1)) + MIN_NUMBER;
}

export default function NumberGuessingGame() {
  const [targetNumber, setTargetNumber] = useState(getRandomNumber);
  const [guess, setGuess] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [message, setMessage] = useState("Make your first guess to begin.");
  const [validationMessage, setValidationMessage] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!/^\d+$/.test(guess.trim())) {
      setValidationMessage("Enter a whole number between 1 and 100.");
      return;
    }

    const numericGuess = Number(guess);
    if (numericGuess < MIN_NUMBER || numericGuess > MAX_NUMBER) {
      setValidationMessage("Enter a whole number between 1 and 100.");
      return;
    }

    setValidationMessage("");
    setAttempts((currentAttempts) => currentAttempts + 1);

    if (numericGuess === targetNumber) {
      setMessage("Correct!");
      setIsComplete(true);
    } else if (numericGuess > targetNumber) {
      setMessage("Too high");
    } else {
      setMessage("Too low");
    }
  }

  function restartGame() {
    setTargetNumber(getRandomNumber());
    setGuess("");
    setAttempts(0);
    setMessage("Make your first guess to begin.");
    setValidationMessage("");
    setIsComplete(false);
  }

  return (
    <main className="game-shell">
      <section className="game-card" aria-labelledby="game-title">
        <div className="game-header">
          <p className="eyebrow">A quick number challenge</p>
          <h1 id="game-title">Number Guessing Game</h1>
          <p className="instructions">
            I&apos;m thinking of a number from <strong>1 to 100</strong>. Can you
            find it?
          </p>
        </div>

        <div className="game-stats" aria-label="Game statistics">
          <div>
            <span className="stat-label">Attempts</span>
            <span className="stat-value">{attempts}</span>
          </div>
          <div>
            <span className="stat-label">Range</span>
            <span className="stat-value">1–100</span>
          </div>
        </div>

        <form className="guess-form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="guess">Your guess</label>
          <div className="input-row">
            <input
              id="guess"
              name="guess"
              type="text"
              inputMode="numeric"
              value={guess}
              onChange={(event) => {
                setGuess(event.target.value);
                setValidationMessage("");
              }}
              placeholder="Enter a number"
              aria-describedby="guess-help validation-message"
              aria-invalid={Boolean(validationMessage)}
              disabled={isComplete}
            />
            <button type="submit" disabled={isComplete}>
              Guess
            </button>
          </div>
          <p id="guess-help" className="field-help">
            Whole numbers only
          </p>
          <p
            id="validation-message"
            className="validation-message"
            role="alert"
            aria-live="polite"
          >
            {validationMessage}
          </p>
        </form>

        <div
          className={`feedback ${isComplete ? "feedback-success" : ""}`}
          role="status"
          aria-live="polite"
        >
          <span className="feedback-dot" aria-hidden="true" />
          <span>{message}</span>
        </div>

        <button className="restart-button" type="button" onClick={restartGame}>
          Restart Game
        </button>
      </section>
      <p className="footer-note">No scores saved. Just a little practice.</p>
    </main>
  );
}
