import React from 'react';
import renderer from 'react-test-renderer';
import NewsList from './NewsList';

describe('NewsList', () => {
  let component = null;

  it('renders correctly', () => {
    component = renderer.create(<NewsList />);
  });

  it('matches snapshot', () => {
    if(component !== null){
       const tree = component.toJSON();
       expect(tree).toMatchSnapshot();
    }
        
  })
});