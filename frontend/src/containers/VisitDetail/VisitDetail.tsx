import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from '@mui/material/Modal';
import { parseEventType, formatTimeStamp } from '../../helpers';
import { Visit } from '../../shared/interfaces';

interface VisitDetailProps {
  visit: Visit;
  handleClose: () => void;
  open: boolean;
}

const VisitModal = styled(Modal)`
  align-items: center;
  justify-content: center;
  display: flex;
`;

const VisitWrapper = styled.div`
  top: '50%';
  left: '50%';
  transform: 'translate(-50%, -50%)';
  width: 75vw;
  background: #ffff;
  padding: 0.5rem;
`;

export function VisitDetail({
  visit,
  handleClose,
  open,
}: VisitDetailProps): React.ReactElement {
  const {
    note = '',
    event_type,
    timestamp,
    meal,
    task_definition_description,
    task_schedule_note,
  } = visit;

  return (
    <VisitModal open={open} onClose={handleClose}>
      <VisitWrapper>
        <p>
          {`Date of Visit: ${new Date(Date.parse(timestamp)).toDateString()}`}
        </p>
        <p> {`Time of Visit: ${formatTimeStamp(timestamp)}`}</p>
        {event_type && !task_definition_description && (
          <p>{`Nature of Visit: ${parseEventType(event_type)}`}</p>
        )}
        {task_definition_description && (
          <p>
            {`Nature of Visit: ${parseEventType(task_definition_description)}`}
          </p>
        )}
        {
          // if there is a meal then the note describes what was eaten
          meal && <p>{`Ate: ${note}`}</p>
        }
        {note && !meal && <p>{`Note: ${note}`}</p>}
        {task_schedule_note && <p>{`Note: ${task_schedule_note}`}</p>}
      </VisitWrapper>
    </VisitModal>
  );
}
