import React from 'react';
import { render } from '@testing-library/react';
import Login from '../../pages/Login';
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "../../store";
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

test('renders registration text', () => {
    const { getByText } = render(
        <Provider store={ store }>
            <Router>
                <Login />
            </Router>
        </Provider>,
        container
    );

    const text = getByText('Don\'t have an account?');
    expect(text).toBeInTheDocument();
});

/**
 * Needed Tests:
 * 1. Can log in
 */
