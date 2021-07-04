import React from 'react';
import { render } from '@testing-library/react';
import Menu from '../../../components/QuestionTabs/Menu';
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "../../../store";

test('renders menu items', () => {
    const { container } = render(
        <Provider store={ store }>
            <Router>
                <Menu questionId="1" title="test" />
            </Router>
        </Provider>
    );

    expect(container.textContent).toBe("SimpleIn-DepthPersonalDiscussionEditsConfused");
});
