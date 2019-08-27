import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme';

describe('App component', () => {
  it('renders without crashing', async () => {
    const div = document.createElement('div');
    ReactDOM.render( await <App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('sets ailments state in componentDidMount function', async () => {
    window.fetch = jest.fn().mockImplementation(() => ({
      status: 200,
      json: () => new Promise((resolve, reject) => {
        resolve({
          ailments: [
            {problemID: 238, hcText: "Aches/Pains"},
            {problemID: 65, hcText: "Asthma (Adults)"}
          ]
        })
      })
    }));

    const renderedApp = await shallow(<App />);
    await renderedApp.update();
    expect(renderedApp.state('ailments').length).toEqual(2);

  });

})
