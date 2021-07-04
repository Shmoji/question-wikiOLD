import React from 'react';
import { render } from '@testing-library/react';
import InDepthTab from '../../../pages/QuestionTabs/InDepthTab';
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "../../../store";

test('renders the page text', () => {
    const { container } = render(
        <Provider store={ store }>
            <Router>
                <InDepthTab />
            </Router>
        </Provider>
    );

    expect(container.textContent).toContain("In-Depth Answer");
});

/**
 * Tests needed:
 * - Test everything I built.
 */
