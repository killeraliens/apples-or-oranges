import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Autocomplete.css';


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
      userInput: '',
      activeAilmentId: null
    }
  }

  onChange = (e) => {
    const filteredSuggestions = this.props.ailments.filter(ailment => ailment.hcText.toLowerCase().includes(e.target.value.toLowerCase()));
    this.setState({
      activeSuggestion: 0,
      userInput: e.currentTarget.value,
      filteredSuggestions: filteredSuggestions,
      showSuggestions: true,
      activeAilmentId: null
    })
  }

  onClick = (e) => {
    console.log(e.currentTarget.value);
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText,
      activeAilmentId: e.currentTarget.value
    })
  }

  onKeyDown = (e) => {
    const { activeSuggestion, filteredSuggestions } = this.state;
    if(e.keyCode === 13) {
      console.log('enter key');
      this.setState({
        activeSuggestion: 0,
        filteredSuggestions: [],
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion].hcText,
        activeAilmentId: filteredSuggestions[activeSuggestion].problemID
      });
    } else if(e.keyCode === 40 && activeSuggestion < filteredSuggestions.length - 1) {
      console.log('down key');
      this.setState({
        activeSuggestion: activeSuggestion + 1
      })
    } else if(e.keyCode === 38 && activeSuggestion > 0) {
      console.log('up key');
      this.setState({
        activeSuggestion: activeSuggestion - 1
      })
    }
  }

  onSubmit = (e) => {
    const { userInput, activeAilmentId } = this.state;
    e.preventDefault();
    this.props.onSubmit(e, activeAilmentId);
    this.setState({
      activeSuggestion: 0,
      userInput: '',
      filteredSuggestions: [],
      showSuggestions: false,
      activeAilmentId: null
    })

    // console.log('user input', {userInput});
    // console.log('user input', {activeAilmentId});
  }

  render() {
    //const { ailments } = this.props;
    const { activeSuggestion, filteredSuggestions, showSuggestions, userInput} = this.state;
    const { onChange, onKeyDown, onClick, onSubmit} = this;

    let suggestionsListComponent;

    if(userInput && showSuggestions) {
      if(filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul className="Autocomplete__suggestionsList">
            {filteredSuggestions.map((ailment, i) => {
              return(
                <li
                  key={i}
                  id={ailment.problemID}
                  value={ailment.problemID}
                  onClick={onClick}
                  className={activeSuggestion === i ? "active" : null}
                >
                  <a href="#">{ailment.hcText}</a>
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
        <form action="" className="Autocomplete__form" autoComplete="off" onSubmit={onSubmit}>
          <label htmlFor="ailmentInput">Enter health issue or problem area</label>
          <input
            type="text"
            id="ailmentInput"
            name="ailment-input"
            placeholder="lungs"
            value={userInput}
            onChange={onChange}
            onKeyDown={onKeyDown}

          />
          {suggestionsListComponent}
          {/*<button type="submit">Submit</button>*/}
        </form>
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

