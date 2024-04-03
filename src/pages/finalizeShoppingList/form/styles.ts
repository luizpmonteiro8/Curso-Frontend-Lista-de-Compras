import styled from "styled-components";
import { ThemeGlobalProps } from "../../../theme";

const Wrapper = styled.form`
  display: flex;
  flex-direction: row;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ContainerShoppingItems = styled.div<{ theme: ThemeGlobalProps }>`
  display: flex;
  flex-direction: column;
  padding: 25px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  flex: 7;
  margin-right: 20px;
`;

const ContainerShoppingPrice = styled.div<{ theme: ThemeGlobalProps }>`
  display: flex;
  flex-direction: column;
  padding: 25px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  flex: 3;
`;

const ContainerBottomTotal = styled.div<{ theme: ThemeGlobalProps }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding: 25px;
  background-color: ${({ theme }) => theme.colors.secondary};
  /* border: 1px solid ${({ theme }) => theme.colors.border}; */
  position: fixed;
  bottom: 0;
  left: 200px;
  width: calc(100vw - 200px);
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 20px;

  @media (max-width: 905px) {
    left: 0;
    width: 100vw;
  }
`;

const ProductTitle = styled.h2<{ theme: ThemeGlobalProps }>`
  font-size: 24px;
  color: ${({ theme }) => theme.colors.text};
`;

const DivLine = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  flex-wrap: wrap;
`;

export {
  ContainerBottomTotal,
  ContainerShoppingItems,
  ContainerShoppingPrice,
  DivLine,
  ProductTitle,
  Wrapper,
};
