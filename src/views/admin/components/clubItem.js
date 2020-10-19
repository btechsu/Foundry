import React from 'react'
import {ClubItemStyle, Name, Description, DeleteButton, EditButton} from '../style'

export default class ClubItem extends React.Component {
    handleDelete(e){
        alert("Function coming soon.")
    }

    handleEdit(e){
        alert("Function coming soon.")
    }

    render(){
        return (
            <ClubItemStyle>
                <DeleteButton onClick={this.handleDelete}>Delete</DeleteButton>{" "}
                <EditButton onClick={this.handleEdit}>Edit</EditButton>{" "}
                <Name>{this.props.name}</Name> — <Description>{this.props.description}</Description>
            </ClubItemStyle>
        );
    }
}