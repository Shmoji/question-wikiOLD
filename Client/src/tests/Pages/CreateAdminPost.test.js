import React from 'react';
import { render } from '@testing-library/react';
import CreateAdminPost from '../../components/pages/CreateAdminPost';
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "../../store";

test('ensure the RTE is present', () => {
    const { container } = render(
        <Provider store={ store }>
            <Router>
                <CreateAdminPost />
            </Router>
        </Provider>
    );

    expect(container.textContent).toContain("Write a new post");
});
