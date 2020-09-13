import React from 'react';
import ContainerApp from "./App";
import ReactDOM from 'react-dom';

test('render without crashing', () => {
  const div = document.createElement(`div`);
  ReactDOM.render(<ContainerApp />, div );
  ReactDOM.unmountComponentAtNode(div);
});
