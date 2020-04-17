import React from 'react';
import './App.scss';

type AppProps = {

}


type AppState = {
  level?: number;
  startButtonEnabled?: boolean;

  green?: boolean;
  red?: boolean;
  yellow?: boolean;
  blue?: boolean;
}

export class App extends React.Component<AppProps, AppState> {

  /**
   * Light pattern of simon
   */
  private pattern : string[] = [];
  /**
   * Current click the user is at.
   * If -1 the user hasn't clicked yet.
   */
  private userStep = -1;
  /**
   * If the user his turn started,
   * now button clicks will respond.
   */
  private userTurn = false;

  constructor(props: AppProps){
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
    this.buttonClick = this.buttonClick.bind(this);
  };

  render(){
    return (
      <div className="App">
        <div className="App-body">
          <div className={'circle'}>
            <div>
              <div className={'quarter-circle-top-left button ' + (this.state.green ? "on" : "off")} onClick={() => this.buttonClick('green')}></div>
              <div className={'quarter-circle-top-right button ' + (this.state.red ? "on" : "off")} onClick={() => this.buttonClick('red')}></div>
            </div>
            <div>
              <div className={'quarter-circle-buttom-left button ' + (this.state.yellow ? "on" : "off")} onClick={() => this.buttonClick('yellow')}></div>
              <div className={'quarter-circle-bottom-right button ' + (this.state.blue ? "on" : "off")} onClick={() => this.buttonClick('blue')}></div>
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

  increaseLevel(): void {
    const level = this.pattern.length + 1;
    this.setState({
      level: level
    });
    this.increasePattern();
  }

  /**
   * @returns color
   */
  generateColor(): string {
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
    return color as string;
  }

  increasePattern(): void {
    const color = this.generateColor()
    this.pattern.push(color);
  }

  async runNewRound(){
    this.increaseLevel();
    this.playPattern();
    this.startUserTurn();
  };

  startUserTurn(){
    this.userStep = -1;
    this.userTurn = true;
  }

  async playPattern(){
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
  }

  buttonClick(color: string){
    if(this.userTurn === false){
      // cancel click if its not the user's turn
      return;
    }
    this.userTurn = false;
    this.userStep++;

    // check step
    const isValid = this.pattern[this.userStep] === color;
    if(!isValid) {
      alert('incorrect! game over');
      this.resetGame();
      return;
    }
    // if last step was clicked
    if(this.pattern.length === (this.userStep + 1)){
      this.userTurn = false;
      sleep(1000).then(() => {
        this.runNewRound();
      });
      return;
    }

    this.userTurn = true;
  }

  resetGame(){
    this.userStep = -1;
    this.setState({
      level: 0,
      startButtonEnabled: true
    });
  }
};

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}