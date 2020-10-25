import * as React from 'react';
import { connect } from 'react-redux';
import SubmitClubForm from './components/submitClubForm';
import SubmitClubEditor from './components/submitClubEditor';
import Stepper from './components/stepper';
import Head from 'src/components/head';
import { ViewGrid, SingleColumnGrid } from 'src/components/layout';
import Login from 'src/views/login';
import { setTitlebarProps } from 'src/actions/titlebar';
import { LoadingView } from 'src/views/viewHelpers';
import { Container, Title, Description } from './style';

class NewClub extends React.Component {
  constructor() {
    super();

    this.state = {
      activeStep: 1,
      club: null,
      editor: null,
    };
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(setTitlebarProps({ title: 'Submit club' }));
  }

  step = (direction) => {
    const { activeStep } = this.state;
    let newStep = direction === 'next' ? activeStep + 1 : activeStep - 1;
    this.setState({
      activeStep: newStep,
    });
  };

  title = () => {
    const { activeStep, club } = this.state;
    switch (activeStep) {
      case 1: {
        return club ? 'Update your club' : 'Submit a club';
      }
      case 2: {
        return club ? 'Write about your club' : "Edit your club's description";
      }
      case 3: {
        return 'Done!';
      }
      default: {
        return 'Submit a club';
      }
    }
  };

  description = () => {
    const { activeStep, club } = this.state;
    switch (activeStep) {
      case 1: {
        return "Let's get your club on Foundry. To get started, tell us more about your club below.";
      }
      case 2: {
        return `Kickstart ${
          club ? `${club.name}` : 'your club'
        } by telling us more about it. The more you write the better! You WILL NOT be able to edit this description later so please write your best.`;
      }
      case 3: {
        return "You're all set! We'll send you an email when we approve your club. You will soon be able to start creating posts, and get the conversation started!";
      }
      default: {
        return 'Submit a club';
      }
    }
  };

  clubCreated = (club) => {
    this.setState({
      club: { ...club },
    });
    return this.step('next');
  };

  finalPage = () => {
    return this.step('next');
  };

  render() {
    const { authed, isLoaded } = this.props;
    const { activeStep, club } = this.state;
    const title = this.title();
    const description = this.description();

    if (!isLoaded) return <LoadingView />;

    if (authed) {
      return (
        <ViewGrid>
          <Head title={'Submit a club'} description={'Submit a new club'} />
          <SingleColumnGrid>
            <Container bg={activeStep === 3 ? 'onboarding' : null} repeat>
              <Stepper activeStep={activeStep} />
              <Title centered={activeStep === 3}>{title}</Title>
              <Description centered={activeStep === 3}>
                {description}
              </Description>

              {
                // gather community meta info
                activeStep === 1 && !club && (
                  <SubmitClubForm clubCreated={this.clubCreated} />
                )
              }

              {activeStep === 2 && (
                <SubmitClubEditor
                  prevPage={this.state.club}
                  finalPage={this.finalPage}
                />
              )}
            </Container>
          </SingleColumnGrid>
        </ViewGrid>
      );
    }

    return (
      <Login
        dispatch={this.props.dispatch}
        redirectPath={`${window.location.href}`}
      />
    );
  }
}

export default connect(({ firebase: { auth } }) => ({
  isLoaded: auth.isLoaded,
  authed: !!auth && !!auth.uid,
}))(NewClub);
