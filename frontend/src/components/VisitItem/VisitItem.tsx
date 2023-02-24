import React from 'react';
import styled from 'styled-components';

const VisitItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  border-style: solid;
  border-color: #00264d;
  width: 85%;
  justify-content: space-between;
`;

const Detail = styled.span`
  padding: 1rem;
`;

// keep this here for now - may need to put it in a shared directory later
type Visit = {
  id: string;
  visit_id: string;
  timestamp: string;
  caregiver_id: string;
  care_recipient_id: string;
  event_type: string;
  meal?: string;
  note?: string;
};

interface VisitItemProps {
  visit: Visit;
}

export function parseEventType(eventType: string): string {
  //will just remove '_' for now but this may need to be expanded
  return eventType.replaceAll('_', ' ');
}

export function VisitItem({ visit }: VisitItemProps): React.ReactElement {
  return (
    <VisitItemContainer className="visit-item">
      <Detail>{new Date(Date.parse(visit.timestamp)).toLocaleString()}</Detail>
      <Detail>{visit.care_recipient_id}</Detail>
      <Detail>{parseEventType(visit.event_type)}</Detail>
    </VisitItemContainer>
  );
}
