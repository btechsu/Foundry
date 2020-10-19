import React, { useEffect, useState } from 'react';
import { getFirebase, useFirebase } from 'react-redux-firebase';
import {Container, Heading, Subheading} from '../style'

export default function Authorized(props){
    let unauthorized = (<Container>
        <Heading>Oops!</Heading>
        <Subheading>You aren't allowed to see this page.</Subheading>
    </Container>);
    let notLoggedIn = (<Container>
        <Heading>Oops!</Heading>
        <Subheading>You aren't logged in. If you are, refresh the page.</Subheading>
    </Container>);

    let [content, setContent] = useState(<Heading>Loading...</Heading>);

    useEffect(() => {
        getFirebase().auth().onAuthStateChanged(currentUser => {
            if(currentUser === null){ 
                setContent(notLoggedIn); 
            } else {
                if(currentUser.email === 'korlov9026@bths.edu' || currentUser.email === 'mbilik0726@bths.edu' || currentUser.email === 'iakram2586@bths.edu'){
                    setContent(props.children);
                }else {
                    setContent(unauthorized)
                }
            }
        });
    }, []);

    return (
        <React.Fragment>{content}</React.Fragment>
    );
}