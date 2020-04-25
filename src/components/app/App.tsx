import React from 'react';
import './App.scss';
import { Board } from '../board/Board';

export type AppProps = {

}

export type AppState = {
}

export class App extends React.Component<AppProps, AppState> {
  public render(): JSX.Element {
    return (
      <div className="App">
        <div className="App-body">
          <Board/>
        </div>
      </div>
    );
  }
}
