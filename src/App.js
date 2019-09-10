import React, {Component} from 'react';
import './App.css';
//import Autocomplete from './Autocomplete/Autocomplete';
import Banner from './Banner/Banner';

class App extends Component {
  //static default propTypes = {};

  constructor(props) {
    super(props);

    this.state = {
      ailments: [],
      topResults: [],
      avoidResults: [],
      showBanner: true,
      loadCounter: 0
    }
  }


  async componentDidMount() {

    let didTimeout = false;

    new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        didTimeout = true;
        reject(new Error('Timedout!!!!'));
      }, 5000);

      fetch('https://nutridigm-api-dev.azurewebsites.net/api/v1/nutridigm/healthconditions?subscriptionId=dd79cc82-f959-74f0-5fb4-f24082721083')
      .then(resp => {
        clearTimeout(timeout);
        console.log('fetched response', {resp});
        if (!didTimeout ) {
          resolve(resp);
        }
      })
      .catch(err => {
        console.log(err.message)
        if(didTimeout) {
          console.log('timedOUT');
          return err;
        }
        reject(err);
      })
    })
    .then(promiseReturn => {
      console.log('successful promise');
      return promiseReturn.json();
    })
    .then(prJson => {
      console.log('do stuff with json');
      console.log(prJson);
      this.setState({
        ailments: prJson,
        error: null
      })
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
    // this.setState({
    //   showBanner: false
    // })
    fetch(`https://nutridigm-api-dev.azurewebsites.net/api/v1/nutridigm/topitemstoconsume?subscriptionId=dd79cc82-f959-74f0-5fb4-f24082721083&problemId=${activeAilmentId}`)
    .then(resp => {
      if (!resp.ok) {
        throw new Error(resp.statusText)
      }
      return resp.json();
    })
    .then(respJsonTopResults => {
      console.log(respJsonTopResults);
      this.setState({
         topResults: respJsonTopResults,
         error: null,
         showBanner: false
      })
    })
    .catch(err => {
      this.setState({
        error: err.message
      })
    })
  }

  handleShowBanner = (e) => {
    this.setState({
      showBanner: true,
      topResults: [],
      avoidResults: []
    })
  }

  render() {
    const {ailments, error, showBanner, topResults, avoidResults} = this.state;
    const {onSubmit, handleShowBanner} = this;

    const errorComponent = error
      ?  <div className="error-div">{error}</div>
      : null;

    const bannerShowButton = showBanner
      ? null
      : <button type="button" id="show-banner-btn" onClick={handleShowBanner}>Start a new search</button>;

    const resultsComponent = topResults.length > 0 || avoidResults.length > 0
      ? <div>Results component</div>
      : null;

    const loadingPage = <div>Loading Suggestions...</div>;

    return (
      <div className="App">
        {errorComponent}
        <Banner className={showBanner ? "visible" : "slide-up"} ailments={ailments} onSubmit={onSubmit} />
        { bannerShowButton }
        { resultsComponent }
      </div>
    );
  }
}

export default App;
