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

export const SubmissionListStyle = styled.ul`
  list-style: none;
`;

export const SubmissionItemStyle = styled.li`
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  font-size: 18px;
  padding: 5px;
`;

export const Name = styled.span``;

export const Description = styled.span`
  color: rgba(0, 0, 0, 0.4);
`;

export const RejectButton = styled.a`
  color: red;
  font-size: 18px;
  margin-right: 20px;
  vertical-align: middle;
`;

export const AcceptButton = styled.a`
  color: green;
  font-size: 18px;
  margin-right: 20px;
  vertical-align: middle;
`;

export const ControlButtons = styled.div`
  margin-top: 10px;
`;
