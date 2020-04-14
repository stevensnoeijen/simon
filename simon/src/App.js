import React from 'react';
import './App.css';

export class App extends React.Component {

  pattern = [];
  userStep = -1;
  userTurn = false;

  constructor(props){
    super(props);

    this.state = {
      startButtonEnabled: true,
      green: false,
      red: false,
      yellow: false,
      blue: false
    };

    this.startGame = this.startGame.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
  };

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <h1>Simon says</h1>
        </header>
        <div className="App-body">
          <div>
            <div className={'button ' + (this.state.green ? "on" : "off")} style={{backgroundColor: 'green'}} onClick={() => this.onButtonClick('green')}></div>
            <div className={'button ' + (this.state.red ? "on" : "off")} style={{backgroundColor: 'red'}} onClick={() => this.onButtonClick('red')}></div>
            <br/>
            <div className={'button ' + (this.state.yellow ? "on" : "off")} style={{backgroundColor: 'yellow'}} onClick={() => this.onButtonClick('yellow')}></div>
            <div className={'button ' + (this.state.blue ? "on" : "off")} style={{backgroundColor: 'blue'}} onClick={() => this.onButtonClick('blue')}></div>
          </div>

          <br/>
          <button disabled={!this.state.startButtonEnabled} onClick={this.startGame} >Start</button>
        </div>
      </div>
    );
  };

  async startGame(){
    this.pattern = [];
    this.userStep = -1;
    this.setState({
      startButtonEnabled: false
    });
    await this.runNewRound();
  }

  async runNewRound(){
    console.log('level ' + (this.pattern.length + 1));
    this.userStep = -1;
    // generate color
    const newNumber = Math.floor(Math.random() * 4);
    let color;
    switch(newNumber){
      case 0:
        color = 'green';
        break;
      case 1:
        color = 'red';
        break;
      case 2:
        color = 'yellow';
        break;
      case 3:
        color = 'blue';
        break;
    }

    this.pattern.push(color);
    
    //play pattern
    for(const color of this.pattern){
      this.setState({
        [color]: true
      });
      await sleep(500);
      this.setState({
        [color]: false
      });
      await sleep(250);
    }

    this.userTurn = true;
  };

  onButtonClick(color){
    if(this.userTurn === false){
      return;
    }
    this.userTurn = false;
    this.userStep++;

    // check step
    const isValid = this.pattern[this.userStep] === color;
    console.log(`click was ${isValid}`);
    if(!isValid) {
      alert('incorrect! game over');
      this.setState({
        startButtonEnabled: true
      });
      return;
    }
    // if its the last one
    if(this.pattern.length === (this.userStep + 1)){
      console.log('last step clicked, start new round');
      sleep(1000).then(() => {
        this.runNewRound();
      });
    }

    this.userTurn = true;
  }
};

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}