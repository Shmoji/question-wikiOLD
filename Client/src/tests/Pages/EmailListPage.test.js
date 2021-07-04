import React from 'react';
import { render } from '@testing-library/react';
import EmailListPage from '../../pages/EmailListPage';
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "../../store";

test('renders the page text', () => {
    const { container } = render(
        <Provider store={ store }>
            <Router>
                <EmailListPage />
            </Router>
        </Provider>
    );

    expect(container.textContent).toContain("Join the Email List For Updates on Question Wiki");
});
