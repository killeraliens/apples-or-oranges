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
      showBanner: true
    }
  }

   async componentDidMount() {
    const resp = await fetch('https://nutridigm-api-dev.azurewebsites.net/api/v1/nutridigm/healthconditions?subscriptionId=dd79cc82-f959-74f0-5fb4-f24082721083');
    console.log(resp.status);
    if (resp.status === 200) {
      resp.json().then(respJson => {
        this.setState({
          ailments: respJson,
          error: null
        })
      })
    } else {
      //throw new Error('Problem loading ailments search')
      this.setState({
        error: 'Problem loading ailments search'
      })
    }
    // let setAutocomplete = await fetch('https://nutridigm-api-dev.azurewebsites.net/api/v1/nutridigm/healthconditions?subscriptionId=dd79cc82-f959-74f0-5fb4-f24082721083')
    // .then(resp => {
    //   if(!resp.ok) {
    //     throw new Error (resp.statusText)
    //   }
    //   let responseJson = resp.json();
    //   return responseJson;
    // })
    // .then(respJson => {
    //   console.log(respJson);
    //   this.setState({
    //     ailments: respJson,
    //     error: null
    //   });
    // })
    // .catch(err => {
    //   this.setState({
    //     error: err.message
    //   })
    // })

    // return setAutocomplete;
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
