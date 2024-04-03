import {
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
} from "./styles";

interface MenuItem {
  text: string;
  url: string;
}

interface MenuProps {
  pageText: MenuItem;
  menuItems: MenuItem[];
  children: React.ReactNode;
  menuPosition?: "right" | "left";
  logoutText: MenuItem;
  activeRouter: string;
}

export const SideBar = ({
  pageText,
  menuItems,
  menuPosition = "left",
  children,
  logoutText,
  activeRouter,
}: MenuProps) => {
  return (
    <LayoutContainer>
      <SideBarWrapper $menuPosition={menuPosition}>
        <SideBarTop>
          <PageTitle>
            <PageTitleLink href={pageText.url}>{pageText.text}</PageTitleLink>
          </PageTitle>
          <MenuList>
            {menuItems.map((menuItem, index) => (
              <PageLink key={"menuItem" + index} href={menuItem.url}>
                <ListItem $active={activeRouter === menuItem.url}>
                  {menuItem.text}
                </ListItem>
              </PageLink>
            ))}
          </MenuList>
        </SideBarTop>
        <LogoutButton href={logoutText.url}>{logoutText.text}</LogoutButton>
      </SideBarWrapper>
      <Content>{children}</Content>
    </LayoutContainer>
  );
};
