import React from 'react';
import { render } from '@testing-library/react';
import PreviewHeader from '../components/PreviewHeader';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store";

test('renders preview menu items', () => {
    const { container } = render(
        <Provider store={ store }>
            <Router>
                <PreviewHeader />
            </Router>
        </Provider>
    );

    expect(container.textContent).toContain("Join Email List");
});
