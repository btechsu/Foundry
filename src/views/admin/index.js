import * as React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import generateMetaInfo from 'shared/generate-meta-info';
import Head from 'src/components/head';
import { ErrorBoundary } from 'src/components/error';
import { ViewGrid } from 'src/components/layout';
import { setTitlebarProps } from 'src/actions/titlebar';
import { Container, Heading, Subheading } from './style';
import ClubList from './components/clubList';
import Authorized from './components/authorized';

export function isFoundryAdmin(email) {
  if (
    email === 'korlov9026@bths.edu' ||
    email === 'mbilik0726@bths.edu' ||
    email === 'iakram2586@bths.edu' ||
    email === 'aseylanov9340@bths.edu'
  ) {
    return true;
  }

  return false;
}

class Admin extends React.Component {
  componentDidMount() {
    this.dispatch = this.props.dispatch;
    this.dispatch(setTitlebarProps({ title: 'Admin' }));
  }

  render() {
    const { title, description } = generateMetaInfo({
      type: 'admin',
    });

    return (
      <React.Fragment>
        <Head title={title} description={description} />
        <ViewGrid data-cy="admin-page">
          <ErrorBoundary>
            <Authorized>
              <Container>
                <Heading>Admin</Heading>
                <Subheading>Panel to manage clubs.</Subheading>
                <ClubList dispatch={this.dispatch} />
              </Container>
            </Authorized>
          </ErrorBoundary>
        </ViewGrid>
      </React.Fragment>
    );
  }
}

export default compose(connect())(Admin);
