import React, {Component} from 'react';
import './App.css';
import Autocomplete from './Autocomplete/Autocomplete';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ailments: [],
      results: [],
      showForm: true
    }
  }

  componentDidMount() {
    fetch('https://nutridigm-api-dev.azurewebsites.net/api/v1/nutridigm/healthconditions?subscriptionId=dd79cc82-f959-74f0-5fb4-f24082721083')
    .then(resp => {
      if(!resp.ok) {
        throw new Error (resp.statusText)
      }
      return resp.json()
    })
    .then(respJson => {
      console.log(respJson);
      this.setState({
        ailments: respJson,
        error: null
      });
    })
    .catch(err => {
      this.setState({
        error: err.message
      })
    })
  }

  onSubmit = (e, activeAilmentId) => {
    e.preventDefault();
    console.log(activeAilmentId);
    this.setState({
      showForm: false

    })
  }

  render() {
    const {ailments, results, error, showForm} = this.state;
    const {onSubmit} = this;
    const autocompleteComponent = ailments.length === 0
      ?  <div className="loading-div">Loading...</div>
      :  <Autocomplete ailments={ailments} onSubmit={onSubmit} showForm={showForm}/>;
    const errorComponent = error
      ?  <div className="error-div">{error}</div>
      : null;
    return (
      <div className="App">
        {errorComponent}
        {autocompleteComponent}
      </div>
    );
  }
}

export default App;
