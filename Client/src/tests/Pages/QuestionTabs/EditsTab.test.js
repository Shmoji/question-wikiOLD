import React from 'react';
import { render } from '@testing-library/react';
import EditsTab from '../../../pages/QuestionTabs/EditsTab';
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "../../../store";

test('renders the page text', () => {
    const { container } = render(
        <Provider store={ store }>
            <Router>
                <EditsTab />
            </Router>
        </Provider>
    );

    expect(container.textContent).toContain("Pending Edits");
});

/**
 * Tests needed:
 * - Test everything once built out more.
 */
