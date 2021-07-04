import React from 'react';
import { render } from '@testing-library/react';
import AnswerModeMenu from '../../../../pages/QuestionTabs/TabComponents/AnswerModeMenu';
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "../../../../store";

test('renders the page text', () => {
    const { container } = render(
        <Provider store={ store }>
            <Router>
                <AnswerModeMenu />
            </Router>
        </Provider>
    );

    expect(container.textContent).toBe("AnswerEditChange Row Order");
});

/**
 * Tests needed:
 * - Test what the buttons say when you click on them.
 */
