// Renders a thread body to React elements
import React from 'react';
import redraft from 'redraft';
import threadRenderer from 'shared/clients/draft-js/thread/renderer';

export default (props) => (
  <div className="markdown">{redraft(props.body, threadRenderer)}</div>
);
