import React, { useEffect, useState } from 'react';
import { getFirebase } from 'react-redux-firebase';
import { Container, Heading, Subheading } from '../style';
import { isFoundryAdmin } from 'src/helpers/permissions';

export default function Authorized(props) {
  let unauthorized = (
    <Container>
      <Heading>Oops!</Heading>
      <Subheading>You aren't allowed to see this page.</Subheading>
    </Container>
  );
  let notLoggedIn = (
    <Container>
      <Heading>Oops!</Heading>
      <Subheading>
        You aren't logged in. If you are, refresh the page.
      </Subheading>
    </Container>
  );

  let [content, setContent] = useState(<Heading>Loading...</Heading>);

  useEffect(() => {
    getFirebase()
      .auth()
      .onAuthStateChanged((currentUser) => {
        if (currentUser === null) {
          setContent(notLoggedIn);
        } else {
          if (isFoundryAdmin(currentUser.email)) setContent(props.children);
          else setContent(unauthorized);
        }
      });
  }, []);

  return <React.Fragment>{content}</React.Fragment>;
}
