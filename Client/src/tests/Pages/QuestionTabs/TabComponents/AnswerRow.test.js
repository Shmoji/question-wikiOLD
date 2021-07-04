import React from 'react';
import { render } from '@testing-library/react';
import AnswerRow from '../../../../pages/QuestionTabs/TabComponents/AnswerRow';
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "../../../../store";

test('renders the page text', () => {
    const { container } = render(
        <Provider store={ store }>
            <Router>
                <AnswerRow />
            </Router>
        </Provider>
    );

    expect(container.textContent).toBe("EditDelete");
});

/**
 * Tests needed:
 * - Test what happens with different settings.
 */
