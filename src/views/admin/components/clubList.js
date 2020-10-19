import React, {useState, useEffect} from 'react'
import { useFirestore } from 'react-redux-firebase';
import {ClubListStyle} from '../style'
import ClubItem from './clubItem'

export default function ClubList() {
    const firestore = useFirestore();
    const [clubs, setClubs] = useState([]);

    useEffect(() => {
        firestore.collection('clubs').limit(10).get()
        .then(snapshot => {
            setClubs(snapshot.docs)
        })
    }, [])

    return (
        <ClubListStyle>
            {clubs.map(club => 
                <ClubItem data={club.data()} key={club.id} />
            )}
        </ClubListStyle>
    );
}