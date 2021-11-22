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
import { setSelectedSession } from "../../../store/actions/session-actions";
import Session from "../../../interfaces/session";
import SessionCard from "./session-card";
import { useEffect } from "react";
import ReduxActionTypes from "../../../store/redux-action-types";
import {
  APP_HEADER_HEIGHT,
  SUB_APP_HEADER_HEIGHT,
} from "../../../constants/ui";
import { getHeaderStyle } from "../../../utils/ui";

const Container = styled.div`
  border-right: 1px solid #ced8e1;
  width: 100%;
  font-family: source-code-pro, Menlo, Monaco, Consolas, " Courier New ",
    monospace;
`;

const List = styled.div``;

const Filter = styled.div`
  ${(props) => getHeaderStyle(props.theme)};
`;

type SessionListPropsType = any;

export default function SessionList(props: SessionListPropsType) {
  const dispatch = useDispatch();
  const sessions = useSelector(getSessions);
  const SelectedSession = useSelector(getSelectedSession);
  const selectSession = useCallback((session: Session) => {
    dispatch(setSelectedSession(session));
  }, []);
  useEffect(() => {
    dispatch({
      type: ReduxActionTypes.FETCH_SESSIONS_INIT,
    });
  }, []);

  return (
    <Container>
      <SerialLayout>
        <Row height={`${SUB_APP_HEADER_HEIGHT}px`}>
          <Filter>Filter</Filter>
          {/* <div>
            <div
              className="session-list__filter_header"
              onClick={() => this.toggleFilter(!this.state.showFilter)}
            >
              <FilterListRoundedIcon />
              FILTERS
              {this.getActiveFilterCount() > 0 && (
                <div className="session-list__filter_count">
                  {this.getActiveFilterCount()}
                </div>
              )}
            </div>
            {this.state.showFilter && (
              <SessionFilter
                filter={this.props.filters}
                onFilterApplied={(filter: any) => {
                  this.props.onFilterApplied(filter);
                  this.toggleFilter(!this.state.showFilter);
                }}
              />
            )}
          </div> */}
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
                  <SessionCard key={session.session_id} session={session} />
                ))}
              </>
            ) : (
              <EmptyMessage>No sessions found for given filter1.</EmptyMessage>
            )}
          </List>
        </Row>
      </SerialLayout>
    </Container>
  );
}
