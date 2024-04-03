import { useState } from "react";
import {
  CloseButton,
  HamburgerIcon,
  MenuContainer,
  MenuItemWrapper,
  NavigationMenu,
  PageLink,
} from "./styles";

interface MenuItem {
  text: string;
  url: string;
}

interface MenuProps {
  pageText: MenuItem;
  menuItems: MenuItem[];
  activeRouter: string;
}

export const MenuHambuguer = ({
  pageText,
  menuItems,
  activeRouter,
}: MenuProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <MenuContainer>
      <NavigationMenu $isOpen={isOpen}>
        {menuItems.map((menuItem, index) => (
          <MenuItemWrapper
            $active={activeRouter === menuItem.url}
            key={"menuitemwrapper" + index}
          >
            <PageLink to={menuItem.url}>{menuItem.text}</PageLink>
          </MenuItemWrapper>
        ))}
      </NavigationMenu>
      <PageLink to={pageText.url}>{pageText.text}</PageLink>
      {isOpen ? (
        <CloseButton onClick={closeMenu}>X</CloseButton>
      ) : (
        <HamburgerIcon onClick={toggleMenu}>&#x2630;</HamburgerIcon>
      )}
    </MenuContainer>
  );
};

/* {isOpen && <CloseButton onClick={closeMenu}>X</CloseButton>}
{!isOpen && <HamburgerIcon onClick={toggleMenu}>&#x2630;</HamburgerIcon>} */
