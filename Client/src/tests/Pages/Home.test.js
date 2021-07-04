import React from 'react';
import { render } from '@testing-library/react';
import Home from '../../pages/Home';
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "../../store";

test('[FILL ME OUT]', () => {
    const { container } = render(
        <Provider store={ store }>
            <Router>
                <Home />
            </Router>
        </Provider>
    );
});

/**
 * Needed Tests:
 * - Test all functionality.
 */
