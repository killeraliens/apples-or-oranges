import React, {Component} from 'react';
import './App.css';
//import Autocomplete from './Autocomplete/Autocomplete';
import Banner from './Banner/Banner';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ailments: [],
      results: [],
      showBanner: true
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
      showBanner: false
    })
  }

  handleShowBanner = (e) => {
    this.setState({
      showBanner: true,
      results: []
    })
  }

  render() {
    const {ailments, results, error, showBanner} = this.state;
    const {onSubmit, handleShowBanner} = this;

    // const autocompleteComponent = ailments.length === 0
    //   ?  <div className="loading-div">Loading...</div>
    //   :  <Autocomplete ailments={ailments} onSubmit={onSubmit} />;
    const errorComponent = error
      ?  <div className="error-div">{error}</div>
      : null;

    const bannerShowButton = showBanner
      ? null
      : <button type="button" id="show-banner-btn" onClick={handleShowBanner}>Start a new search</button>;

    return (
      <div className="App">
        {errorComponent}
        <Banner className={showBanner ? "visible" : "slide-up"} ailments={ailments} onSubmit={onSubmit} />
        { bannerShowButton }
      </div>
    );
  }
}

export default App;
