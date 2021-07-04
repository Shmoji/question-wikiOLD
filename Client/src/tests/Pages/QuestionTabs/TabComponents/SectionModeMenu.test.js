import React from 'react';
import { render } from '@testing-library/react';
import SectionModeMenu from '../../../../pages/QuestionTabs/TabComponents/SectionModeMenu';
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "../../../../store";

test('renders the page text', () => {
    const { container } = render(
        <Provider store={ store }>
            <Router>
                <SectionModeMenu />
            </Router>
        </Provider>
    );

    expect(container.textContent).toContain("Edit SectionsChange Section Order");
});

/**
 * Tests needed:
 * - Test what happens with different settings.
 */
