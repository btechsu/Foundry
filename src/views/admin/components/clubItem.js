import React from 'react'
import {ClubItemStyle, Name, Description, DeleteButton, EditButton, ControlButtons} from '../style'

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
                <Name>{this.props.name}</Name> — <Description>{this.props.description}</Description>
                <ControlButtons>
                    <DeleteButton onClick={this.handleDelete}><img src="/img/trash.svg" width="20" /></DeleteButton>{" "}
                    <EditButton onClick={this.handleEdit}><img src="/img/edit.svg" width="20" /></EditButton>{" "}
                </ControlButtons>
            </ClubItemStyle>
        );
    }
}