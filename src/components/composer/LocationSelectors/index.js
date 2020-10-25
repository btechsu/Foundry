import React, { useEffect } from 'react';
import compose from 'recompose/compose';
import { withRouter } from 'react-router-dom';
import querystring from 'query-string';
import { Dropdowns, DropdownsLabel } from '../style';
import ClubSelector from './ClubSelector';
import ChannelSelector from './ChannelSelector';

const ComposerLocationSelectors = (props) => {
  const {
    selectedClubId,
    selectedChannelId,
    onClubSelectionChanged,
    onChannelSelectionChanged,
    location,
  } = props;

  const setStateFromQueryParams = () => {
    const { location } = props;
    const { search } = location;
    const { composerClubId, composerChannelId } = querystring.parse(
      search
    );

    // tell the parent composer that we have query params
    onClubSelectionChanged(composerClubId);
    onChannelSelectionChanged(composerChannelId);
  };

  /*
    Whenever the browser location.search changes, check for query parameters 
    related to the composer and update the state of the composer.
  */
  useEffect(
    () => {
      setStateFromQueryParams();
    },
    [location.search]
  );

  return (
    <Dropdowns>
      <DropdownsLabel>Post to: </DropdownsLabel>

      <ClubSelector
        id={selectedClubId}
        onClubChange={onClubSelectionChanged}
      />

      {!!selectedClubId && (
        <ChannelSelector
          id={selectedClubId}
          selectedChannelId={selectedChannelId}
          selectedClubId={selectedClubId}
          onChannelChange={onChannelSelectionChanged}
        />
      )}
    </Dropdowns>
  );
};

export default compose(withRouter)(ComposerLocationSelectors);