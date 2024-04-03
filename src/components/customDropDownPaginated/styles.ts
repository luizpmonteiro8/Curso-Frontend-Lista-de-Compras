import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const ErrorMessage = styled.p`
  font-size: 12px;
  font-style: italic;
  color: red;
`;

export { Container, ErrorMessage };
