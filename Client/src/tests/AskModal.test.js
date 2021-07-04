import React from 'react';
import { render } from '@testing-library/react';
import AskModal from '../components/AskModal';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store";

test('renders NotRegistered modal text when shown', () => {
    const { container } = render(
        <Provider store={ store }>
            <Router>
                <AskModal show={ true } onClose={ () => {} } />
            </Router>
        </Provider>
    );

    expect(container.textContent).toContain("You need an account to ask and answer questions.");
});

test('renders nothing when not shown', () => {
    const { container } = render(
        <Provider store={ store }>
            <Router>
                <AskModal show={ false } onClose={ () => {} } />
            </Router>
        </Provider>
    );

    expect(container.textContent).toBe("");
});

/**
 * Needed tests:
 * 1. Log in and see if the ask modal shows without the NotRegistered modal.
 */
