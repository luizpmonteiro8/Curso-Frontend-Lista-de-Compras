import styled from "styled-components";
import { ThemeGlobalProps } from "../../theme";

const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
`;

const CheckboxInput = styled.input<{ theme: ThemeGlobalProps }>`
  width: 30px;
  height: 30px;

  &:checked {
    background-color: ${({ theme }) => theme.colors.primary};
    color: #fff;
  }
`;

const CheckboxLabel = styled.label`
  display: inline-block;
  cursor: pointer;
  user-select: none;
  padding-left: 5px;
`;

export { CheckboxContainer, CheckboxInput, CheckboxLabel };
