import React, {Component} from 'react';


class Autocomplete extends Component {
  render() {
    const { ailments } = this.props;
    const ailmentOptions = ailments.map(ailment => {
      return <option key={ailment.problemID} id={ailment.problemID} value={ailment.hcText}>{ailment.hcText}</option>
    });

    return(
      <div className='Autocomplete'>
        <form>
          <label htmlFor="ailmentInput">Enter health issue or problem area</label>
          <select type="text" name="ailment input" id="ailmentInput" placeholder="lungs">
            <option value="None">Select health issue or problem area</option>
            {ailmentOptions}
          </select>
        </form>
      </div>
    );
  }
}

export default Autocomplete;

