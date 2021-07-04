import React from 'react';
import { render } from '@testing-library/react';
import Tabs from '../../../components/QuestionTabs/Tabs';
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "../../../store";

test('renders in-depth tab', () => {
    const { container } = render(
        <Provider store={ store }>
            <Router>
                <Tabs tab="In-Depth" />
            </Router>
        </Provider>
    );

    expect(container.textContent).toContain("In-Depth Answer");
});

test('renders personal tab', () => {
    const { container } = render(
        <Provider store={ store }>
            <Router>
                <Tabs tab="Personal" />
            </Router>
        </Provider>
    );

    expect(container.textContent).toContain("Read everyone's individual opinions on the matter to get a well-rounded view of the topic.");
});

test('renders discussion tab', () => {
    const { container } = render(
        <Provider store={ store }>
            <Router>
                <Tabs tab="Discussion" />
            </Router>
        </Provider>
    );

    expect(container.textContent).toContain("Discussions");
});

test('renders edits tab', () => {
    const { container } = render(
        <Provider store={ store }>
            <Router>
                <Tabs tab="Edits" />
            </Router>
        </Provider>
    );

    expect(container.textContent).toContain("The wiki articles undergo revisions every day. See what others have changed in the past!");
});

test('renders confused tab', () => {
    const { container } = render(
        <Provider store={ store }>
            <Router>
                <Tabs tab="Confused" />
            </Router>
        </Provider>
    );

    expect(container.textContent).toContain("Help Page");
});

test('renders simple tab', () => {
    const { container } = render(
        <Provider store={ store }>
            <Router>
                <Tabs tab="Simple" />
            </Router>
        </Provider>
    );

    expect(container.textContent).toContain("Quick and Simple Answer");
});
