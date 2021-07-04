import React from 'react';
import { render } from '@testing-library/react';
import AdminRichTE from '../components/AdminRichTE';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store";

test('renders text editor', () => {
    const { container } = render(
        <Provider store={ store }>
            <Router>
                <AdminRichTE />
            </Router>
        </Provider>
    );

    expect(container.textContent).toContain("Write a new post");
});

/**
 * Tests needed:
 * - Test all of the operations of the text editor and verify the results.
 */
