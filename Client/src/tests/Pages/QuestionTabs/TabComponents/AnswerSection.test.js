import React from 'react';
import { render } from '@testing-library/react';
import AnswerSection from '../../../../pages/QuestionTabs/TabComponents/AnswerSection';
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "../../../../store";

test('renders the page text', () => {
    const { container } = render(
        <Provider store={ store }>
            <Router>
                <AnswerSection />
            </Router>
        </Provider>
    );

    expect(container.textContent).toContain("AnswerEditChange Row Order");
});

/**
 * Tests needed:
 * - Test what happens with different settings.
 */
