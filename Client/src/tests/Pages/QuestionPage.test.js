import React from 'react';
import { render } from '@testing-library/react';
import QuestionPage from '../../pages/QuestionPage';
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "../../store";

test('Defaults to the simple answer page', () => {
    const { container } = render(
        <Provider store={ store }>
            <Router>
                <QuestionPage match={{ params: { id: 1, title: 'test' } }} />
            </Router>
        </Provider>
    );

    expect(container.textContent).toContain("Quick and Simple Answer");
});

/**
 * Needed tests:
 * 1. Verify that we can fetch the data
 */
