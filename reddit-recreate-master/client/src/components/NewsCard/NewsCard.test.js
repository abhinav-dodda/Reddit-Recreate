import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import NewsCard from './NewsCard';

describe('NewsCard', () => {
  let component = null;

  it('renders correctly', () => {
    component = renderer.create(<NewsCard />);
    //component = shallow(<NewsCard />);
  });

  it('matches snapshot', () => {
    if(component !== null){
       const tree = component.toJSON();
       expect(tree).toMatchSnapshot();
    }
        
  })
});