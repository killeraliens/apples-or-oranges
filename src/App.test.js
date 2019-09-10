import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';


describe('App component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render( <App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('componentDidMount should be called when mounted', () => {
    const wrapper = shallow(<App />);
    const instance = wrapper.instance();
    jest.spyOn(instance, 'componentDidMount');
    instance.componentDidMount();
    expect(instance.componentDidMount).toHaveBeenCalled();

  });

  it('sets ailments state in componentDidMount function', async () => {
    window.fetch = jest.fn().mockImplementation(() => ({
      status: 200,
      json: () => new Promise((resolve, reject) => {
        resolve(
          [
            {problemID: 238, hcText: "Aches/Pains"},
            {problemID: 65, hcText: "Asthma (Adults)"}
          ]
        )
      })
    }));

    const renderedApp = await shallow(<App />);
    console.log(renderedApp.state('ailments'));
    let updatedWrapper = await renderedApp.update();
    console.log(updatedWrapper.state('ailments'));

    expect(updatedWrapper.state('ailments').length).toEqual(2);

  });

})
