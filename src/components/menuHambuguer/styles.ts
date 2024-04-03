import { Link } from "react-router-dom";
import styled from "styled-components";

const MenuContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.backgroundMenu};
  padding: 10px;
  height: 50px;
`;

const NavigationMenu = styled.nav<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
  flex-direction: column;
  gap: 10px;
  color: #fff;
  position: absolute;
  top: 40px;
  right: 10px;
  background-color: ${({ theme }) => theme.colors.backgroundMenu};
  padding: 10px;
  z-index: 1;
  border: 2px solid #000;
`;

const HamburgerIcon = styled.div`
  cursor: pointer;
  font-size: 24px;
  color: white;
`;

const PageLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-weight: bold;
  font-size: 24px;

  &:hover {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const MenuItemWrapper = styled.div<{ $active: boolean }>`
  margin: 0 10px;
  padding: 10px;
  cursor: pointer;
  text-align: center;
  background-color: ${({ $active, theme }) =>
    $active ? theme.colors.accent : theme.colors.primary};
`;

const CloseButton = styled.div`
  text-align: right;
  cursor: pointer;
  font-size: 32px;
  color: #fff;
`;

export {
  CloseButton,
  HamburgerIcon,
  MenuContainer,
  MenuItemWrapper,
  NavigationMenu,
  PageLink,
};
