import React from "react";
import styled from "styled-components";
import EmptyMessage from "../molecules/empty-message";
import SerialLayout, { Row } from "../layouts/serial-layout";
import { useDispatch, useSelector } from "react-redux";
import {
  getSelectedSession,
  getSessions,
} from "../../../store/selectors/entities/sessions-selector";
import { useCallback } from "react";
import { setSessionFilter } from "../../../store/actions/session-actions";
import Session from "../../../interfaces/session";
import SessionCard from "./session-card";
import { useEffect } from "react";
import ReduxActionTypes from "../../../store/redux-action-types";
import {
  APP_HEADER_HEIGHT,
  SUB_APP_HEADER_HEIGHT,
} from "../../../constants/ui";
import { getHeaderStyle } from "../../../utils/ui";
import Dropdown from "../atoms/dropdown";
import Icon, { Sizes } from "../atoms/icon";
import SessionListFilter from "./session-list-filter";
import { useState } from "react";
import { Badge } from "@material-ui/core";
import { getSessionFilterCount } from "../../../store/selectors/ui/filter-selector";
import Utils from "../../../utils/common-utils";

const Container = styled.div`
  border-right: 1px solid #ced8e1;
  width: 100%;
  font-family: source-code-pro, Menlo, Monaco, Consolas, " Courier New ",
    monospace;
`;

const List = styled.div``;

const Header = styled.div`
  ${(props) => getHeaderStyle(props.theme)};
  padding: 7px 5px;
`;

const FilterTrigger = styled.div`
  padding: 10px;
`;

const FilterTriggerLabel = styled.div`
  display: inline-block;
  font-size: 13px;
  padding-left: 4px;
`;

const FilterDropdown = styled.div``;

const StyledBadge = styled(Badge)`
  positive: relative;
  left: 17px;
  top: -2px;
`;

function getFiltersFromQueryParams(searchQuery: string) {
  const urlParams = new URLSearchParams(searchQuery);

  const allowedFilters: any = {
    name: "",
    os: {
      valid: ["ios", "android"],
    },
    status: {
      valid: ["running", "failed", "passed", "timeout"],
    },
    device_udid: "",
    start_time: {
      valid: (dateString: string) => {
        return !isNaN(new Date(dateString).getDate());
      },
    },
  };

  return Utils.parseJsonSchema(
    allowedFilters,
    Utils.urlParamsToObject(urlParams),
  );
}

export default function SessionList() {
  const dispatch = useDispatch();
  const sessions = useSelector(getSessions);
  const SelectedSession = useSelector(getSelectedSession);
  const urlFilters = getFiltersFromQueryParams(window.location.search);

  useEffect(() => {
    if (Object.keys(urlFilters).length) {
      setFilter(urlFilters);
    } else {
      dispatch({
        type: ReduxActionTypes.FETCH_SESSIONS_INIT,
      });
    }
  }, []);

  useEffect(() => {
    if (SelectedSession == null) {
      dispatch({
        type: ReduxActionTypes.FETCH_SESSIONS_INIT,
      });
    }
  }, [SelectedSession]);

  const setFilter = useCallback((payload) => {
    dispatch(setSessionFilter(payload));
  }, []);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterCount = useSelector(getSessionFilterCount);

  return (
    <Container>
      <SerialLayout>
        <Row height={`${SUB_APP_HEADER_HEIGHT}px`}>
          <Header>
            <Dropdown
              controlled
              onOpen={() => setIsFilterOpen(true)}
              onClose={() => setIsFilterOpen(false)}
              open={isFilterOpen}
            >
              <FilterTrigger>
                <Icon name="filter" size={Sizes.S} />
                <FilterTriggerLabel>FILTERS</FilterTriggerLabel>
                <StyledBadge badgeContent={filterCount} color="secondary" />
              </FilterTrigger>
              <FilterDropdown>
                <SessionListFilter
                  onApply={(payload) => {
                    setFilter(payload);
                    setIsFilterOpen(false);
                  }}
                />
              </FilterDropdown>
            </Dropdown>
          </Header>
        </Row>
        <Row
          height={`calc(100vh - ${
            SUB_APP_HEADER_HEIGHT + APP_HEADER_HEIGHT
          }px)`}
          scrollable
        >
          <List>
            {sessions.length > 0 ? (
              <>
                {sessions.map((session: Session) => (
                  <SessionCard
                    key={session.session_id}
                    selected={
                      SelectedSession?.session_id === session.session_id
                    }
                    session={session}
                  />
                ))}
              </>
            ) : (
              <EmptyMessage>No sessions found for given filter.</EmptyMessage>
            )}
          </List>
        </Row>
      </SerialLayout>
    </Container>
  );
}
