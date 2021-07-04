import React from 'react';
import { render } from '@testing-library/react';
import NewsPage from '../../pages/NewsPage';
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "../../store";

test('renders the page text', () => {
    const { container } = render(
        <Provider store={ store }>
            <Router>
                <NewsPage />
            </Router>
        </Provider>
    );

    expect(container.textContent).toContain("News and Updates");
});

/**
 * Needed tests:
 * 1. Verify that the data gets pulled correctly and displays just fine.
 */
