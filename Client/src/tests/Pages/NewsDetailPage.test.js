import React from 'react';
import { render } from '@testing-library/react';
import NewsDetailPage from '../../pages/NewsDetailPage';
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "../../store";

test('renders the page text', () => {
    const { container } = render(
        <Provider store={ store }>
            <Router>
                <NewsDetailPage match={{ params: { id: 1 } }} />
            </Router>
        </Provider>
    );
});

/**
 * Needed tests:
 * 1. Verify that it renders the page.
 */
