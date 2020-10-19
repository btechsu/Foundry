import React from 'react';
import { useFirebase } from 'react-redux-firebase';
import {Container, Heading, Subheading} from '../style'

export default function Authorized(props){
    const firebase = useFirebase();
    let currentUser = firebase.auth().currentUser;
    let unauthorized = (<Container>
        <Heading>Oops!</Heading>
        <Subheading>You aren't allowed to see this page.</Subheading>
    </Container>);
    let notLoggedIn = (<Container>
        <Heading>Oops!</Heading>
        <Subheading>You aren't logged in.</Subheading>
    </Container>);
    if(currentUser === null){ return notLoggedIn; }

    if(
        currentUser.email === 'korlov9026@bths.edu' || 
        currentUser.email === 'mbilik0726@bths.edu' || 
        currentUser.email === 'iakram2586@bths.edu'
    ){
        return props.children;
    } 

    return unauthorized;

}