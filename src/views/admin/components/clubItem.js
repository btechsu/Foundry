import React from 'react'
import {ClubItemStyle, Name, Description, DeleteButton, EditButton, ControlButtons, DeleteIcon, EditIcon} from '../style'

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
                <Name>{this.props.data.name}</Name> — <Description>{this.props.data.description.substring(0,100) + "..."}</Description>
                <ControlButtons>
                    <DeleteButton onClick={this.handleDelete}><DeleteIcon src="/img/trash.svg" /></DeleteButton>{" "}
                    <EditButton onClick={this.handleEdit}><EditIcon src="/img/edit.svg" /></EditButton>{" "}
                </ControlButtons>
            </ClubItemStyle>
        );
    }
}