import React from 'react';
import { render } from '@testing-library/react';
import RichTextEditor from '../components/RichTextEditor';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store";

test('renders text editor', () => {
    const { container } = render(
        <Provider store={ store }>
            <Router>
                <RichTextEditor />
            </Router>
        </Provider>
    );

    expect(container.textContent).toContain("Answer this question");
});

/**
 * Tests needed:
 * - Test all of the operations of the text editor and verify the results.
 */
