import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const SideBarWrapper = styled.div<{ $menuPosition: string }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 20%;
  min-width: 200px;
  background-color: ${({ theme }) => theme.colors.backgroundMenu};
  color: white;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 9999;

  ${({ $menuPosition }) =>
    $menuPosition === "right" &&
    css`
      order: 2;
    `}
`;

const Content = styled.div`
  height: 100vh;
  width: 100%;
  overflow-y: auto;
  padding: 20px;
`;

const PageLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-weight: bold;
  font-size: 18px;

  &:hover {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const PageTitle = styled.div`
  background-color: #ddd;
  padding: 10px;
  height: 20%;
  color: #000;
  text-align: center;
`;

const PageTitleLink = styled(PageLink)`
  font-size: 24px;
  color: #000;
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 10px 0;
`;

const ListItem = styled.li<{ $active: boolean }>`
  margin: 5px 0;
  padding: 8px;
  border-radius: 5px;
  background-color: ${({ $active, theme }) =>
    $active ? theme.colors.accent : theme.colors.primary};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.buttonHover};
  }
`;

const LogoutButton = styled(Link)`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  font-size: 18px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.buttonHover};
  }
`;

const SideBarTop = styled.div`
  height: 100%;
`;

export {
  Content,
  LayoutContainer,
  ListItem,
  LogoutButton,
  MenuList,
  PageLink,
  PageTitle,
  PageTitleLink,
  SideBarTop,
  SideBarWrapper,
};
