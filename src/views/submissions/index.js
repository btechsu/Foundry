import * as React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import generateMetaInfo from 'shared/generate-meta-info';
import Head from 'src/components/head';
import { ErrorBoundary } from 'src/components/error';
import { ViewGrid } from 'src/components/layout';
import { setTitlebarProps } from 'src/actions/titlebar';
import { Container, Heading, Subheading } from './style';
import SubmissionList from './components/submissionList';
import Authorized from './components/authorized';

class Submissions extends React.Component {
  componentDidMount() {
    this.dispatch = this.props.dispatch;
    this.dispatch(setTitlebarProps({ title: 'Submissions' }));
  }

  render() {
    const { title, description } = generateMetaInfo({
      type: 'submissions',
    });

    return (
      <React.Fragment>
        <Head title={title} description={description} />
        <ViewGrid data-cy="submissions-page">
          <ErrorBoundary>
            <Authorized>
              <Container>
                <Heading>Submissions</Heading>
                <Subheading>Panel to manage submissions.</Subheading>
                <SubmissionList dispatch={this.dispatch} />
              </Container>
            </Authorized>
          </ErrorBoundary>
        </ViewGrid>
      </React.Fragment>
    );
  }
}

export default compose(connect())(Submissions);
