import React from 'react';
import { render } from '@testing-library/react';
import Unanswered from '../../pages/Unanswered';
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "../../store";

test('[FILL ME OUT]', () => {
    const { container } = render(
        <Provider store={ store }>
            <Router>
                <Unanswered />
            </Router>
        </Provider>
    );
});

/**
 * Needed Tests:
 * - Test all functionality.
 */
