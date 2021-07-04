import React from 'react';
import { render } from '@testing-library/react';
import Register from '../../pages/Register';
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "../../store";
import { unmountComponentAtNode } from "react-dom";

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test('renders login text', () => {
    const { getByText } = render(
        <Provider store={ store }>
            <Router>
                <Register />
            </Router>
        </Provider>,
        container
    );

    const text = getByText('Already have an account?');
    expect(text).toBeInTheDocument();
});

/**
 * Needed Tests:
 * 1. Can register
 */
