import React from "react";
import { useState } from "react";
import styled from "styled-components";

const TabsContainer = styled.div``;

type TabPropsType = {
  name: string
  children: JSX.Element | null;
};

export function Tab(props: TabPropsType) {
  const { children } = props;
  return (
    <TabsContainer>
      {children}
    </TabsContainer>
  )
}

const TabsLayoutContainer = styled.div``;

const Header = styled.div``;

const TabName = styled.div``;

const Body = styled.div``;

type TabType = TabPropsType;

const useTabs = (children: JSX.Element[]) => {
  const tabs: TabType[]  = [];
  React.Children.forEach(children, (children, element) => {
    if (!React.isValidElement(element)) return;

    const props: TabType = element.props as TabType;

    tabs.push({
      name: props.name,
      children: props.children,
    });
  });

  return tabs;
};

type TabsLayoutPropsType = {
  children: JSX.Element[];
};

export default function TabsLayout(props: TabsLayoutPropsType) {
  const tabs = useTabs(props.children);
  const [selectedTab, setSelectedTab] = useState<TabType>(tabs[0]);

  return (
    <TabsLayoutContainer>
      <Header>
        {tabs.map((tab: TabType) => (
          <TabName onClick={() => setSelectedTab(tab)}>
            {tab.name}
          </TabName>
        ))}
      </Header>
      <Body>
        {selectedTab.children}
      </Body>
    </TabsLayoutContainer>
  )
}
