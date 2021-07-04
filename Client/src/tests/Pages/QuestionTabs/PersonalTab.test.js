import React from 'react';
import { render } from '@testing-library/react';
import PersonalTab from '../../../pages/QuestionTabs/PersonalTab';
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "../../../store";

test('renders the page text', () => {
    const { container } = render(
        <Provider store={ store }>
            <Router>
                <PersonalTab />
            </Router>
        </Provider>
    );

    expect(container.textContent).toContain("Read everyone's individual opinions on the matter to get a well-rounded view of the topic.");
});

/**
 * Tests needed:
 * - Test everything out.
 */
