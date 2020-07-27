import React, { Component, useContext } from 'react';
import { navigate } from 'gatsby';
import { FirebaseContext } from '@Firebase';
import Title from '@components/Title';

// styles
import styled from 'styled-components';
import { Container, GridWrapper } from '@styles';
import { Circles, PageWrapper } from '@components/loader';

import Side from './side';
import Main from './main';

const PageContainer = styled.main`
  width: 100%;
  height: 100%;
`;
const CardsContainer = styled.div`
  z-index: 1;
  margin: 4rem 0;
`;

class ClubData extends Component {
  state = { club: undefined, data: undefined, text: undefined };

  componentDidMount() {
    this.props.firebase.getClub({ clubID: this.props.clubID }).then((doc) => {
      if (doc.exists) {
        this.setState({
          club: true,
          data: {
            name: doc.data().name,
            president: doc.data().president,
            description: doc.data().description,
            room: doc.data().room,
            days: doc.data().days,
            credits: doc.data().credits,
            time: doc.data().time,
            type: doc.data().type,
          },
          text: doc.data().text,
        });
      } else {
        this.setState({ club: false });
      }
    });
  }

  render() {
    if (this.state.club === undefined) {
      return (
        <PageWrapper>
          <Circles />
        </PageWrapper>
      );
    }

    if (this.state.club === null) {
      navigate('/404');
      return null;
    }

    return (
      <>
        <Title>{this.state.data.name && this.state.data.name}</Title>
        <GridWrapper align="flex-start">
          <Side data={this.state.data} />
          <Main data={this.state.text} />
        </GridWrapper>
      </>
    );
  }
}

const ClubTemplate = (props) => {
  const { user, firebase } = useContext(FirebaseContext);

  if (!firebase || !user) {
    return (
      <PageWrapper>
        <Circles />
      </PageWrapper>
    );
  }

  return (
    <PageContainer>
      <CardsContainer>
        <Container normal>
          <ClubData clubID={props.clubID} firebase={firebase} user={user} />
        </Container>
      </CardsContainer>
    </PageContainer>
  );
};

export default ClubTemplate;
