import React from 'react';
import { render } from '@testing-library/react';
import NoMatch from '../../pages/NoMatch';
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "../../store";

test('renders the page text', () => {
    const { container } = render(
        <Provider store={ store }>
            <Router>
                <NoMatch />
            </Router>
        </Provider>
    );

    expect(container.textContent).toContain("No Match");
});
