import styled from "styled-components";
import { ThemeGlobalProps } from "./theme";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 25px;
  margin: 0 auto;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Title = styled.h1<{ theme: ThemeGlobalProps }>`
  text-align: left;
  color: ${({ theme }) => theme.colors.text};
`;

const ButtonRightLine = styled.div`
  text-align: right;
`;

const DivLine = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Card = styled.div<{ theme: ThemeGlobalProps }>`
  display: flex;
  flex-direction: column;
  margin-block: 20px;
  margin-inline: 10px;
  padding: 25px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
`;

export { ButtonRightLine, Card, Container, DivLine, Title, Wrapper };
