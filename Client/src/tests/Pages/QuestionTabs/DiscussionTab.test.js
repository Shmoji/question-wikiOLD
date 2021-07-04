import React from 'react';
import { render } from '@testing-library/react';
import DiscussionTab from '../../../pages/QuestionTabs/DiscussionTab';
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "../../../store";

test('renders the page text', () => {
    const { container } = render(
        <Provider store={ store }>
            <Router>
                <DiscussionTab />
            </Router>
        </Provider>
    );

    expect(container.textContent).toContain("Discussions");
});

/**
 * Tests needed:
 * - Test everything once built out more.
 */
