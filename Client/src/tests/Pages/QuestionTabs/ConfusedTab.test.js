import React from 'react';
import { render } from '@testing-library/react';
import ConfusedTab from '../../../pages/QuestionTabs/ConfusedTab';
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "../../../store";

test('renders the page text', () => {
    const { container } = render(
        <Provider store={ store }>
            <Router>
                <ConfusedTab />
            </Router>
        </Provider>
    );

    expect(container.textContent).toContain("Help Page");
});

/**
 * Tests needed:
 * - Test everything I built.
 */
