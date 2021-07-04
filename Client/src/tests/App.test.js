import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';
import { unmountComponentAtNode } from "react-dom";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test('renders home link', () => {
  const { getByText } = render(<App />, container);
  const linkElement = getByText(/Home/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders not logged in link', () => {
  const { getByText } = render(<App />, container);
  const linkElement = getByText(/Not logged in/i);
  expect(linkElement).toBeInTheDocument();
});