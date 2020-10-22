// import React from 'react';
// import compose from 'recompose/compose';
// import { withRouter } from 'react-router-dom';
// import querystring from 'query-string';
// import { LoadingSelect, ErrorSelect } from 'src/components/loading';
// import Icon from 'src/components/icon';
// import { RequiredSelector, ChannelPreview } from '../style';

// const ChannelSelector = (props) => {
//   const {
//     data,
//     onChannelChange,
//     selectedChannelId,
//     selectedClubId,
//     location,
//     className,
//     ...rest
//   } = props;
//   const { loading, error, community } = data;
//   if (loading) return <LoadingSelect />;
//   if (error)
//     return <ErrorSelect>Something went wrong, try refreshing</ErrorSelect>;

//   const onChange = (evt) => onChannelChange(evt.target.value);

//   const { search } = location;
//   const { composerChannelId } = querystring.parse(search);

//   const { edges } = community.channelConnection;
//   if (!edges || edges.length === 0)
//     return <ErrorSelect>This club doesn’t have any channels</ErrorSelect>;

//   const shouldDisableChannelSelect =
//     channelIsValid && composerChannelId === selectedChannelId;

//   if (shouldDisableChannelSelect) {
//     if (!channel) {
//       return (
//         <RequiredSelector
//           className={className}
//           data-cy="composer-channel-selector"
//           onChange={onChange}
//           value={channelIsValid ? selectedChannelId : ''}
//           emphasize={!selectedChannelId}
//           {...rest}
//         >
//           <React.Fragment>
//             <option value={''}>Choose a channel</option>

//             {sortedNodes.map((channel) => {
//               if (!channel) return null;
//               return (
//                 <option key={channel.id} value={channel.id}>
//                   {channel.name}
//                 </option>
//               );
//             })}
//           </React.Fragment>
//         </RequiredSelector>
//       );
//     }

//     return (
//       <ChannelPreview className={className} data-cy="composer-channel-selected">
//         <Icon glyph={'channel'} size={32} />
//         {channel.name}
//       </ChannelPreview>
//     );
//   }

//   return (
//     <RequiredSelector
//       className={className}
//       data-cy="composer-channel-selector"
//       onChange={onChange}
//       value={channelIsValid ? selectedChannelId : ''}
//       emphasize={!selectedChannelId}
//       {...rest}
//     >
//       <React.Fragment>
//         <option value={''}>Choose a channel</option>

//         {sortedNodes.map((channel) => {
//           if (!channel) return null;
//           return (
//             <option key={channel.id} value={channel.id}>
//               # {channel.name}
//             </option>
//           );
//         })}
//       </React.Fragment>
//     </RequiredSelector>
//   );
// };

// export default compose(withRouter)(ChannelSelector);
