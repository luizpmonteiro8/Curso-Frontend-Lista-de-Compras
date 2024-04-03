import styled from "styled-components";

const InputWrapper = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-size: 16px;
  margin-bottom: 8px;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

const ErrorMessage = styled.p`
  font-size: 12px;
  font-style: italic;
  color: red;
`;

export { ErrorMessage, InputField, InputWrapper, Label };
