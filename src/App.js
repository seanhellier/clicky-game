import React, { Component } from "react";
import MatchCard from "./components/MatchCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import matches from "./matchcards.json";
import "./App.css";

let correctGuesses = 0;
let bestScore = 0;
let clickMessage = "Click on a domino to gain points. Click on the same one twice and you lose!";

class App extends Component {
    state = {
        matches,
        correctGuesses,
        bestScore,
        clickMessage
    };

    setClicked = id => {

        const matches = this.state.matches;
        const clickedMatch = matches.filter(match => match.id === id);

        if (clickedMatch[0].clicked) {

            console.log("Correct Guesses: " + correctGuesses);
            console.log("Best Score: " + bestScore);

            correctGuesses = 0;
            clickMessage = "You have already clicked on this one."

            for (let i = 0; i < matches.length; i++) {
                matches[i].clicked = false;
            }

            this.setState({ clickMessage });
            this.setState({ correctGuesses });
            this.setState({ matches });

        } else if (correctGuesses < 11) {


            clickedMatch[0].clicked = true;


            correctGuesses++;

            clickMessage = "Great! Keep going!";

            if (correctGuesses > bestScore) {
                bestScore = correctGuesses;
                this.setState({ bestScore });
            }

            // Shuffle the array
            matches.sort(function (a, b) { return 0.5 - Math.random() });

            this.setState({ matches });
            this.setState({ correctGuesses });
            this.setState({ clickMessage });
        } else {

            clickedMatch[0].clicked = true;
            correctGuesses = 0;

            clickMessage = "You got ALL of them!!! Now, let's try again!";
            bestScore = 12;
            this.setState({ bestScore });

            for (let i = 0; i < matches.length; i++) {
                matches[i].clicked = false;
            }

            matches.sort(function (a, b) { return 0.5 - Math.random() });
            this.setState({ matches });
            this.setState({ correctGuesses });
            this.setState({ clickMessage });

        }
    };

    render() {
        return (
            <Wrapper>
                <Title>A New Kind of Dominos</Title>

                <h3 className="scoreSummary">
                    {this.state.clickMessage}
                </h3>

                <h3 className="scoreSummary card-header">
                    Correct Guesses: {this.state.correctGuesses}
                    <br />
                    Best Score: {this.state.bestScore}
                </h3>
                <div className="container">
                    <div className="row">
                        {this.state.matches.map(match => (
                            <MatchCard
                                setClicked={this.setClicked}
                                id={match.id}
                                key={match.id}
                                image={match.image}
                            />
                        ))}
                    </div>
                </div>

            </Wrapper>
        );
    }
}

export default App;