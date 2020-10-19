import { theme } from 'shared/theme';
import styled from 'styled-components';

export const Container = styled.div`
    padding: 40px;
`;

export const Heading = styled.h1`
    font-size: 40px;
    font-weight: 700;
`;
export const Subheading = styled.h2`
    font-size: 20px;
    margin-bottom: 30px;
`;

export const ClubListStyle = styled.ul`
    list-style: none;
`;

export const ClubItemStyle = styled.li`
    border-top: 1px solid rgba(0,0,0,0.2);
    font-size: 20px;
    padding: 5px;
`;

export const Name = styled.span`
    
`;

export const Description = styled.span`
    color: rgba(0,0,0,0.4);
`;

export const DeleteButton = styled.a`
    color: red;
    font-size: 15px;
    margin-right: 20px;
    vertical-align: middle;
`;

export const EditButton = styled.a`
    color: blue;
    font-size: 15px;
    margin-right: 20px;
    vertical-align: middle;
`;