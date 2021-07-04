import React from 'react';
import { render } from '@testing-library/react';
import SimpleTab from '../../../pages/QuestionTabs/SimpleTab';
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "../../../store";

test('renders the page text', () => {
    const { container } = render(
        <Provider store={ store }>
            <Router>
                <SimpleTab />
            </Router>
        </Provider>
    );

    expect(container.textContent).toContain("Quick and Simple Answer");
});

/**
 * Tests needed:
 * - Test everything I built.
 */
