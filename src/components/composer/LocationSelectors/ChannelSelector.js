import React, { useState, useEffect } from 'react';
import compose from 'recompose/compose';
import { LoadingSelect, ErrorSelect } from 'src/components/loading';
import { firestoreConnect } from 'react-redux-firebase';
import { RequiredSelector } from '../style';

const ChannelSelector = (props) => {
  const {
    onChannelChange,
    selectedChannelId,
    selectedClubId,
    location,
    className,
    club,
    id,
    firestore,
    ...rest
  } = props;

  const [channels, setChannels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (club || id) {
      setIsLoading(true);
      firestore
        .collection('clubs')
        .doc(id)
        .collection('channels')
        .get()
        .then((channels) => {
          setIsLoading(false);
          setChannels(channels.docs);
        })
        .catch(() => {
          setIsLoading(false);
          setError(true);
        });
    }
  }, [id]);

  const onChange = (evt) => onChannelChange(evt.target.value);

  if (isLoading) return <LoadingSelect />;

  if (error)
    return <ErrorSelect>Something went wrong, try refreshing</ErrorSelect>;

  if (!isLoading && channels.length === 0)
    return <ErrorSelect>This club doesn’t have any channels</ErrorSelect>;

  return (
    <RequiredSelector
      className={className}
      data-cy="composer-channel-selector"
      onChange={onChange}
      value={selectedChannelId || ''}
      emphasize={!selectedChannelId}
      {...rest}
    >
      <React.Fragment>
        <option value={''}>Choose a channel</option>

        {channels.map((channel) => {
          if (!channel) return null;

          return (
            <option key={channel.id} value={channel.id}>
              # {channel.data().name}
            </option>
          );
        })}
      </React.Fragment>
    </RequiredSelector>
  );
};

export default compose(firestoreConnect())(ChannelSelector);
