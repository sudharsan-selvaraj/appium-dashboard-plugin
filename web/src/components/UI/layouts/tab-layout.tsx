import React from "react";
import { useState } from "react";
import styled from "styled-components";

const TabsContainer = styled.div``;

type TabPropsType = {
  name: string;
  children: JSX.Element | null;
};

export function Tab(props: TabPropsType) {
  const { children } = props;
  return <TabsContainer>{children}</TabsContainer>;
}

export const TAB_HEADER_HEIGHT = 40;

const TabsLayoutContainer = styled.div``;

const Header = styled.div`
  height: ${TAB_HEADER_HEIGHT}px;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
`;

const TabName = styled.div<{ active: boolean }>`
  display: inline-block;
  border-bottom: 3px solid
    ${(props) => (props.active ? props.theme.colors.primary : "transparent")};
  padding: 10px;
  cursor: ${(props) => (props.active ? "default" : "pointer")};
`;

const Body = styled.div``;

type TabType = TabPropsType;

const useTabs = (children: JSX.Element[]) => {
  const tabs: TabType[] = [];
  React.Children.forEach(children, (children) => {
    const props: TabType = children.props as TabType;

    tabs.push({
      name: props.name,
      children: props.children,
    });
  });

  return tabs;
};

type TabsLayoutPropsType = {
  selected: string;
  children: JSX.Element[];
};

export default function TabsLayout(props: TabsLayoutPropsType) {
  const { selected } = props;
  const tabs = useTabs(props.children);
  const defaultTab = tabs.find((tab) => tab.name === selected);
  const [selectedTab, setSelectedTab] = useState<TabType>(
    defaultTab as TabType,
  );

  return (
    <TabsLayoutContainer>
      <Header>
        {tabs.map((tab: TabType) => (
          <TabName
            active={selectedTab.name === tab.name}
            onClick={() => setSelectedTab(tab)}
            key={tab.name}
          >
            {tab.name}
          </TabName>
        ))}
      </Header>
      <Body>{selectedTab.children}</Body>
    </TabsLayoutContainer>
  );
}
