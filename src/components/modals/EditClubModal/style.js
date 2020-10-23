import styled from 'styled-components';

export const Container = styled.div`
  padding: 10px 0px 30px 25px;
`;

export const FieldInput = styled.input`
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 5px;
  padding: 10px;
  font-size: 18px;
`;

export const FieldArea = styled.textarea`
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 5px;
  padding: 10px;
  height: 250px;
  width: 400px;
  font-size: 18px;
`;

export const FieldLabel = styled.p`
  font-size: 18px;
`;

export const Field = styled.div`
  margin-top: 5px;
  margin-bottom: 5px;
`;

export const SubmitButton = styled.button`
  color: white;
  font-size: 18px;
  background-color: green;
  border-radius: 5px;
  padding: 5px 20px 5px 20px;
  transition: 0.1s linear;
  margin-top: 10px;

  ${SubmitButton}:hover {
    cursor: pointer;
    background-color: #00b846;
  }
`;
