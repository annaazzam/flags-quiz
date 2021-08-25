import * as React from 'react';
import styles from './App.module.css';
import { Quiz } from './quiz/quiz';

export class App extends React.Component {
  render() {
    return (
      <div className={styles.App}>
        <Quiz/>
      </div>
    );
  }
}

export default App;
