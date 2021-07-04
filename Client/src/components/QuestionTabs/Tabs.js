import React from 'react';

import PersonalTab from './PersonalTab';
import SimpleTab from './SimpleTab';
import InDepthTab from './InDepthTab';
import DiscussionTab from './DiscussionTab';
import EditsTab from './EditsTab';
import ConfusedTab from './ConfusedTab';

function Tabs(props)  {
    const tab = props.tab;

    switch (tab) {
        case 'In-Depth':
        return <InDepthTab questionId={ props.questionId } fetchData={ props.fetchData } />;
        case 'Personal':
        return <PersonalTab questionId={ props.questionId } fetchData={ props.fetchData } />;
        case 'Discussion':
        return <DiscussionTab questionId={ props.questionId } />;
        case 'Edits':
        return <EditsTab questionId={ props.questionId } />;
        case 'Confused':
        return <ConfusedTab questionId={ props.questionId } fetchData={ props.fetchData } />;
        case 'Simple':
        default:
        return <SimpleTab questionId={ props.questionId } fetchData={ props.fetchSimpleWiki } />;
    }
}

export default Tabs;