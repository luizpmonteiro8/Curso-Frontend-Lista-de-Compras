import styled from "styled-components";
import { ThemeGlobalProps } from "../../theme";

const Button = styled.button<{ $buttonColor: string; theme: ThemeGlobalProps }>`
  padding: 10px 20px;
  font-size: 16px;
  background-color: ${({ theme, $buttonColor }) =>
    $buttonColor == "primary" ? theme.colors.primary : theme.colors.secondary};
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme, $buttonColor }) =>
      $buttonColor == "primary"
        ? theme.colors.secondary
        : theme.colors.primary};
  }

  &:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
  }
`;

export { Button };
