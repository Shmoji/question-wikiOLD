import React from 'react';
import { render } from '@testing-library/react';
import SectionHeader from '../../../../pages/QuestionTabs/TabComponents/SectionHeader';
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "../../../../store";

test('renders the page text', () => {
    const { container } = render(
        <Provider store={ store }>
            <Router>
                <SectionHeader />
            </Router>
        </Provider>
    );

    expect(container.textContent).toContain("EditDelete");
});

/**
 * Tests needed:
 * - Test what happens with different settings.
 */
