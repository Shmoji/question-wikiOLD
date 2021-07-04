import React from 'react';
import { render } from '@testing-library/react';
import NotRegistered from '../components/NotRegistered';
import { BrowserRouter as Router } from "react-router-dom";

test('renders modal text when shown', () => {
    const { container } = render(
        <Router>
            <NotRegistered show={ true } />
        </Router>
    );

    expect(container.textContent).toContain("You need an account to ask and answer questions.");
});

test('renders nothing when not shown', () => {
    const { container } = render(
        <Router>
            <NotRegistered />
        </Router>
    );

    expect(container.textContent).toBe("");
});
