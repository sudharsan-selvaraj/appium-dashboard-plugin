import React from "react";
import "./session-list.css";
import FilterListRoundedIcon from "@material-ui/icons/FilterListRounded";
import SessionInfoCard from "../../session-info-card/session-info-card";
import SessionFilter from "../../session-list/session-filter/session-filter";
import store from "../../../store";
import ReduxActionTypes from "../../../store/redux-action-types";
import styled from "styled-components";
import EmptyMessage from "../molecules/empty-message";
import SerialLayout, { Row } from "../layouts/serial-layout";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedSession, getSessions } from "../../../store/selectors/entities/sessions-selector";
import { useCallback } from "react";
import { setSelectedSession } from "../../../store/actions/session-actions";
import Session from "../../../interfaces/session";

const Container = styled.div`
  display: flex;
  flex: 0.2;
  border: 1px solid #ced8e1;
  border-top: 0;
  flex-direction: column;
  flex: 0.2;
  min-width: 370px;
`;

const HEADER_HEIGHT = "50px";
type SessionListPropsType = {

};

export default function SessionList(props: SessionListPropsType) {
  const dispatch = useDispatch();
  const sessions = useSelector(getSessions);
  const SelectedSession = useSelector(getSelectedSession);

  const selectSession = useCallback((session: Session) => {
    dispatch(setSelectedSession(session));
  }, []);

  return (
    <Container>
      <SerialLayout>
        <Row height={HEADER_HEIGHT}>
          <div>Filter</div>
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
        <Row height={`calc(100vh - ${HEADER_HEIGHT})`}>
          {sessions.length > 0 ? (
            <>
              {sessions.map((session: any) => (
                <SessionInfoCard
                  key={session}
                  session={session}
                  onCardClicked={selectSession}
                  isActive={SelectedSession == session.session_id}
                />
              ))}
            </>
          ) : (
            <EmptyMessage>
                No sessions found for given filter.
            </EmptyMessage>
          )}
        </Row>
      </SerialLayout>
    </Container>
  );
}
