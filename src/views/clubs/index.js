// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import generateMetaInfo from '@shared/generate-meta-info';
import Head from '@components/head';
import Search from './components/search';
import ClubSearchWrapper from './components/clubSearchWrapper';
import { ErrorBoundary } from '@components/error';
import { ViewGrid } from '@components/layout';
import { setTitlebarProps } from '@actions/titlebar';
import { Charts } from './view';

class Explore extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(setTitlebarProps({ title: 'Clubs' }));
  }

  render() {
    const { title, description } = generateMetaInfo({
      type: 'clubs',
    });

    return (
      <React.Fragment>
        <Head title={title} description={description} />
        <ViewGrid data-cy="clubs-page">
          <ErrorBoundary>
            <ClubSearchWrapper redirectPath={window.location}>
              <Search />
            </ClubSearchWrapper>
            <Charts />
          </ErrorBoundary>
        </ViewGrid>
      </React.Fragment>
    );
  }
}

export default compose(connect())(Explore);
