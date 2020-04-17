import React from 'react';
import './App.scss';

export class App extends React.Component {

  pattern = [];
  userStep = -1;
  userTurn = false;

  constructor(props){
    super(props);

    this.state = {
      level: 0,
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
        <div className="App-body">
          <div className={'circle'}>
            <div>
              <div className={'quarter-circle-top-left button ' + (this.state.green ? "on" : "off")} onClick={() => this.onButtonClick('green')}></div>
              <div className={'quarter-circle-top-right button ' + (this.state.red ? "on" : "off")} onClick={() => this.onButtonClick('red')}></div>
            </div>
            <div>
              <div className={'quarter-circle-buttom-left button ' + (this.state.yellow ? "on" : "off")} onClick={() => this.onButtonClick('yellow')}></div>
              <div className={'quarter-circle-bottom-right button ' + (this.state.blue ? "on" : "off")} onClick={() => this.onButtonClick('blue')}></div>
            </div>
            <div className={'inner-center'}>
              <strong>SIMON</strong>
              <div>
                <button disabled={!this.state.startButtonEnabled} onClick={this.startGame} className={'start-button'} title={'start game'}></button>
              </div>
              <sub>
                lvl {this.state.level} 
              </sub>
            </div>
          </div>
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
    const level = this.pattern.length + 1;
    console.log('level ' + level);
    this.setState({
      level: level
    });
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
      this.reset();
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

  reset(){
    this.setState({
      level: 0,
      startButtonEnabled: true
    });
  }
};

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}