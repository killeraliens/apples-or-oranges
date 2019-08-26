import React, {Component} from 'react';
import './Banner.css';
import Autocomplete from '../Autocomplete/Autocomplete';


class Banner extends Component {
  render() {
    const { ailments, onSubmit } = this.props;
    const autocompleteComponent = ailments.length === 0
      ?  <div className="loading-div">Loading...</div>
      :  <Autocomplete ailments={ailments} onSubmit={onSubmit} />;
    return(
      <div className={'Banner ' + this.props.className }>
        <h1>Apples Or Oranges</h1>
        { autocompleteComponent }

      </div>
    )
  }
}

export default Banner;
