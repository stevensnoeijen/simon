import React from 'react';
import './App.css';

export class App extends React.Component {

  pattern = [];

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
  };

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <h1>Simon saids</h1>
        </header>
        <div className="App-body">
          <div>
            <div className={'button ' + (this.state.green ? "on" : "off")} style={{backgroundColor: 'green'}}></div>
            <div className={'button ' + (this.state.red ? "on" : "off")} style={{backgroundColor: 'red'}}></div>
            <br/>
            <div className={'button ' + (this.state.yellow ? "on" : "off")} style={{backgroundColor: 'yellow'}}></div>
            <div className={'button ' + (this.state.blue ? "on" : "off")} style={{backgroundColor: 'blue'}}></div>
          </div>

          <button disabled={!this.state.startButtonEnabled} onClick={this.startGame} >Start</button>
        </div>
      </div>
    );
  };

  async startGame(){
    this.setState({
      startButtonEnabled: false
    });

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

    this.setState({
      startButtonEnabled: true
    });
  };
};

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}