import React, {useState, useEffect} from 'react'
import {ClubListStyle} from '../style'
import ClubItem from './clubItem'

export default function ClubList() {
    const [clubs, setClubs] = useState([{
        name: "Loading...",
        description: "Loading..."
    }]);

    useEffect(() => {
        setClubs([
            {
                id: 0,
                name: "Cool Club",
                description: "Club description"
            },
            {
                id: 1,
                name: "Awesome Club",
                description: "Club description"
            },
            {
                id: 2,
                name: "Amazing Club",
                description: "Club description"
            }
        ])
    }, [])

    return (
        <ClubListStyle>
            {clubs.map(club => 
                <ClubItem name={club.name} description={club.description} key={club.id} />
            )}
        </ClubListStyle>
    );
}