import * as React from 'react';
import EditForm from './editForm';
import ChannelList from './channelList';
import { SectionsContainer, Column } from 'src/components/settingsViews/style';
import { ErrorBoundary, SettingsFallback } from 'src/components/error';

class Overview extends React.Component {
  render() {
    const { club, id } = this.props;

    return (
      <SectionsContainer>
        <Column>
          <ErrorBoundary fallbackComponent={SettingsFallback}>
            <EditForm club={club} id={id} />
          </ErrorBoundary>
        </Column>
        <Column>
          <ErrorBoundary fallbackComponent={SettingsFallback}>
            <ChannelList club={club} id={id} />
          </ErrorBoundary>
        </Column>
      </SectionsContainer>
    );
  }
}

export default Overview;
