import React, {Component} from 'react';
import './App.css';
import Autocomplete from './Autocomplete/Autocomplete';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ailments: [
        {
          "problemID": 120,
          "hcText": "Detoxification"
        },
        {
          "problemID": 30,
          "hcText": "Diabetes Type-1"
        },
        {
          "problemID": 16,
          "hcText": "Diabetes Type-2"
        }
      ]
    }
  }

  render() {
    return (
      <div className="App">
        <Autocomplete ailments={this.state.ailments}/>
      </div>
    );
  }
}

export default App;
