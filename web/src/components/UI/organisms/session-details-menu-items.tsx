import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Session from "../../../interfaces/session";
import Icon, { Sizes } from "../atoms/icon";
import Spinner, { Sizes as SpinnerSize } from "../atoms/spinner";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSession,
  setSelectedSession,
  pauseSession,
  resumeSession,
} from "../../../store/actions/session-actions";
import {
  isSessionDeleting,
  getSessionDeleteResponse,
  getSessionStateChangeResponse,
  isStateChangePending,
} from "../../../store/selectors/entities/sessions-selector";

const Container = styled.div`
  padding: 0 30px 0px 0;
  display: flex;
  justify-content: end;
  align-items: center;
  color: #fff;
  & .icon {
    cursor: pointer;
  }
`;

const IconGroup = styled.div`
  display: flex;
  align-items: center;
  height: 25px !important;
`;

const IconContainer = styled.div`
  margin-left: 20px;
`;

type PropsType = {
  session: Session;
};

export default function sessionMenuItems(props: PropsType) {
  const { session } = props;
  const [paused, setPaused] = useState(session.is_paused);
  const dispatch = useDispatch();
  const deletePending = useSelector(isSessionDeleting);
  const stateChangePending = useSelector(isStateChangePending);
  const deleteResponse = useSelector(getSessionDeleteResponse);
  const stateChangeResponse = useSelector(getSessionStateChangeResponse);

  const onDelete = useCallback((id: string) => {
    dispatch(deleteSession(id));
  }, []);

  const onPause = useCallback((id: string) => {
    setPaused(true);
    dispatch(pauseSession(id));
  }, []);

  const onResume = useCallback((id: string) => {
    setPaused(false);
    dispatch(resumeSession(id));
  }, []);

  useEffect(() => {
    if (deleteResponse && deleteResponse.success) {
      dispatch(setSelectedSession(null));
    }
  }, [deleteResponse]);

  useEffect(() => {
    if (stateChangeResponse && !stateChangeResponse.success) {
      setPaused(!paused);
    }
  }, [stateChangeResponse]);

  function getPlayPauseIcon() {
    if (paused) {
      return (
        <Icon
          name="play"
          tooltip="Resume"
          size={Sizes.XL}
          onClick={() => onResume(session.session_id)}
        ></Icon>
      );
    } else {
      return (
        <Icon
          name="pause"
          tooltip="Pause"
          size={Sizes.XL}
          onClick={() => onPause(session.session_id)}
        ></Icon>
      );
    }
  }

  return (
    <Container>
      <IconGroup>
        {/* Show pause/play icon only if the session is still running */}
        {!session.is_completed &&
          (stateChangePending ? (
            <Spinner size={SpinnerSize.S} />
          ) : (
            getPlayPauseIcon()
          ))}

        {/* Show delete icon only if the session execution is completed */}
        {session.is_completed &&
          (deletePending ? (
            <Spinner size={SpinnerSize.S} />
          ) : (
            <IconContainer>
              <Icon
                name="delete"
                tooltip="Delete"
                size={Sizes.L}
                onClick={() => onDelete(session.session_id)}
              ></Icon>
            </IconContainer>
          ))}
      </IconGroup>
    </Container>
  );
}
