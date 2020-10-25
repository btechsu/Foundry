import React from 'react';
import styled from 'styled-components';
import Textarea from 'react-textarea-autosize';
import {
  ThreadInputs,
  ThreadTitle,
  ThreadDescription,
  RenderWrapper,
  InputsGrid,
} from './style';
import { H1 } from 'src/components/globals';
import { SegmentedControl, Segment } from 'src/components/segmentedControl';
import ThreadRenderer from '../threadRenderer';

const ThreadHeading = styled(H1)`
  font-size: 28px;
  font-weight: 600;
  word-break: break-word;
  margin-bottom: 16px;
`;

export default (props) => {
  // $FlowIssue
  const [showPreview, setShowPreview] = React.useState(false);
  // $FlowIssue
  const [previewBody, setPreviewBody] = React.useState(null);

  const {
    title,
    body,
    autoFocus,
    changeBody,
    changeTitle,
    bodyRef,
    onKeyDown,
    isEditing,
  } = props;

  const onClick = (show) => {
    setShowPreview(show);

    if (show) {
      setPreviewBody(null);
      fetch('https://convert.spectrum.chat/from', {
        method: 'POST',
        body,
      })
        .then((res) => {
          if (res.status < 200 || res.status >= 300)
            throw new Error('Oops, something went wrong');
          return res.json();
        })
        .then((json) => {
          setPreviewBody(json);
        });
    }
  };

  return (
    <InputsGrid isEditing={isEditing}>
      <SegmentedControl
        css={{
          margin: '0',
          position: 'sticky',
          top: '0',
          left: '0',
          right: '0',
          zIndex: '9999',
          background: '#FFF',
          minHeight: '52px',
        }}
      >
        <Segment isActive={!showPreview} onClick={() => onClick(false)}>
          Write
        </Segment>
        <Segment isActive={showPreview} onClick={() => onClick(true)}>
          Preview
        </Segment>
      </SegmentedControl>
      <ThreadInputs>
        {showPreview ? (
          /* $FlowFixMe */
          <RenderWrapper>
            <ThreadHeading>{title}</ThreadHeading>
            {previewBody === null ? (
              <p>Loading...</p>
            ) : (
              <ThreadRenderer body={previewBody} />
            )}
          </RenderWrapper>
        ) : (
          <React.Fragment>
            <Textarea
              data-cy="composer-title-input"
              onChange={changeTitle}
              style={ThreadTitle}
              value={title}
              placeholder="What do you want to talk about?"
              autoFocus={autoFocus}
            />

            <input
              onChange={changeBody}
              value={body === null ? 'Loading...' : body}
              disabled={body === null}
              style={ThreadDescription}
              inputRef={bodyRef}
              placeholder="Elaborate here if necessary (optional)"
              className={'threadComposer'}
              dataCy="rich-text-editor"
              onKeyDown={onKeyDown}
            />
          </React.Fragment>
        )}
      </ThreadInputs>
    </InputsGrid>
  );
};
