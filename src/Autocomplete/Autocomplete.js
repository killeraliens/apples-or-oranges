import React, {Component} from 'react';
import PropTypes from 'prop-types';


class Autocomplete extends Component {
  static propTypes = {};
  static defaultProps = {
    ailments: []
  }

  constructor(props) {
    super(props);
    this.state = {
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: ''
    }
  }

  onChange = (e) => {
    const filteredSuggestions = this.props.ailments.filter(ailment => ailment.hcText.toLowerCase().includes(e.target.value.toLowerCase()));
    this.setState({
      userInput: e.target.value,
      filteredSuggestions: filteredSuggestions,
      showSuggestions: true
    })
  }

  render() {
    const { ailments } = this.props;
    const { activeSuggestion, filteredSuggestions, showSuggestions, userInput} = this.state;
    const { onChange, onKeydown, onClick} = this;

    let suggestionsListComponent;
    if(userInput && showSuggestions) {
      if(filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul className="Autocomplete__suggestionsList">
            {filteredSuggestions.map(ailment => {
              return(
                <li
                  key={ailment.problemID}
                  id={ailment.problemID}
                  value={ailment.hcText}
                  onClick={onClick}
                >
                  {ailment.hcText}
                </li>
              )
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <div className="Autocomplete__noSuggestions">No Suggestions</div>
        );
      }
    }

    return (
      <React.Fragment>
        <label htmlFor="ailmentInput">Enter health issue or problem area</label>
        <input
          type="text"
          id="ailmentInput"
          name="ailment-input"
          placeholder="lungs"
          value={userInput}
          onChange={onChange}
          onKeydown={onKeydown}
        />
        {suggestionsListComponent}
      </React.Fragment>
    );

    // return(
    //   <div className='Autocomplete'>
    //     <form>
    //       <label htmlFor="ailmentInput">Enter health issue or problem area</label>
    //       <select type="text" name="ailment input" id="ailmentInput" placeholder="lungs">
    //         <option value="None">Select health issue or problem area</option>
    //         {ailmentOptions}
    //       </select>
    //     </form>
    //   </div>
    // );
  }
}

export default Autocomplete;

