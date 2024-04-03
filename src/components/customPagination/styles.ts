import styled from "styled-components";

const PaginationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15px;
`;

const PageButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const PageInfoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
`;

const PageInfo = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
`;

const PageButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const PageButton = styled.button`
  padding: 5px 10px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textSecondary};
  border: 1px solid ${({ theme }) => theme.colors.border};

  &:hover {
    background-color: ${({ theme }) => theme.colors.buttonHover};
  }
`;

export {
  PageButton,
  PageButtonContainer,
  PageButtons,
  PageInfo,
  PageInfoContainer,
  PaginationContainer,
};
