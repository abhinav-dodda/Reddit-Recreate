import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

describe('App', () => {
  let component = null;

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    component = renderer.create(<App />);
    ReactDOM.unmountComponentAtNode(div);    
  });


  // fetchNews operation confirm
  it('fetch correctly', () => {    
      component.getInstance().fetchNews();
      expect(component.getInstance().state.after_news).toBe("");
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();    
  });

  // fetchPeriod operation confirm
  it('periodic fetch correctly', () => {    
      component.getInstance().fetchPeriod();
      expect(component.getInstance().state.news_count).toBe(0);
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();    
  });

  //element count after rendering
  it('NewsList element count', () => {    
      const wrapper = shallow(<App />);
      expect(wrapper.find(`NewsList`).length).toEqual(1);  
  });

});