import React from "react";
import Header from "./components/Header";
import Player from "./components/Player";
import Addplayer from "./components/Addplayer";
import Playerlist from "./components/Playerlist";
import "./App.css";
import { Provider } from "./components/context";

class App extends React.Component {
  state = {
    player: [
      { name: "Sufail", score: 0, id: 1, bool: false },
      { name: "Sanjaa", score: 0, id: 2, bool: false },
      { name: "Sanchir", score: 0, id: 3, bool: false },
      { name: "Sumail", score: 0, id: 4, bool: false },
    ],
    maxScore: 0,
    id1: 0,
    id2: 0,
  };

  ChangeName = (name, index) => {
    console.log(name, index);
    this.setState((prevState) => {
      const updatedPlayer = [...prevState.player];
      const newPlayer = { ...updatedPlayer[index - 1] };

      updatedPlayer[index - 1].name = name;
      updatedPlayer[index - 1].score = 0;
      return {
        player: updatedPlayer,
      };
    });
  };

  highscore = () => {
    const score = this.state.player.map((p) => p.score);
    const highscore = Math.max(...score);
    if (highscore > 0) {
      return highscore;
    } else {
      return null;
    }
  };

  incrementScore = (id) => {
    this.setState((prevState) => {
      const updatedPlayer = [...prevState.player];
      const newPlayer = { ...updatedPlayer[id] };

      updatedPlayer[id].score = newPlayer.score += 1;
      return {
        player: updatedPlayer,
      };
    });
  };

  dicrementScore = (id) => {
    this.setState((prevState) => {
      const updatedPlayer = [...prevState.player];
      const newPlayer = { ...updatedPlayer[id] };

      updatedPlayer[id].score = newPlayer.score -= 1;
      return {
        player: updatedPlayer,
      };
    });
  };

  addPlayer = (e) => {
    let a = this.state.player.length;
    let b = this.state.player[a - 1].id + 1;
    e.preventDefault();
    let namee = document.getElementById("sdashunre").value;

    this.setState((prevState) => {
      return {
        player: [...prevState.player, { name: namee, score: 0, id: b }],
      };
    });

    document.getElementById("sdashunre").value = "";
  };

  removePlayer = (id) => {
    this.setState((prevState) => {
      return { player: prevState.player.filter((p) => p.id !== id) };
    });
  };

  render() {
    return (
      <div className="scoreboard">
        <Provider value={this.state.player}>
          <Header
            title="scoreboard"
            totalPlayer={this.state.player.length}
            players={this.state.player}
          />

          <Playerlist
            index={this.state.player.length}
            removePlayer={this.removePlayer}
            incrementScore={this.incrementScore}
            dicrementScore={this.dicrementScore}
            ishighscore={this.highscore}
            changeName={this.ChangeName}
          />

          <Addplayer function={this.addPlayer} />
        </Provider>
      </div>
    );
  }
}

export default App;
