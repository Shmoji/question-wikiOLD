import React from 'react';
import { render } from '@testing-library/react';
import TopHeader from '../components/TopHeader';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store";

test('renders correct text when not logged in', () => {
    const { container } = render(
        <Provider store={ store }>
            <Router>
                <TopHeader />
            </Router>
        </Provider>
    );

    expect(container.textContent).toContain("Not logged in");
});

/**
 * Needed tests:
 * 1. Log in and see if the menu changes.
 * 2. Simulate a click event on the account button to validate: "Login" and "Register" on logged out and "Logout" when logged in
 */
