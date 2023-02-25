import React, { useState } from 'react';
import styled from 'styled-components';
import { VisitDetail } from '../../containers/VisitDetail/VisitDetail';
import { VisitItemProps } from '../../shared/interfaces';
import { parseEventType } from '../../helpers';

export const VisitItemContainer = styled.div`
  display: grid;
  grid-auto-columns: minmax(0, 1fr);
  grid-auto-flow: column; 
  border-style: solid;
  border-color: #00264d;
  width: 85%;
  justify-content: space-between;
  cursor: pointer;
  margin-left: auto;
  margin-right: auto;
  &:hover {
    background-color: #e2f5f5;
  }
`;

export const Detail = styled.span`
  padding: 1rem;
`;

export function VisitItem({ visit }: VisitItemProps): React.ReactElement {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <VisitItemContainer
      className="visit-item"
      role="button"
      onClick={() => setShowDetail(true)}
    >
      <Detail>{new Date(Date.parse(visit.timestamp)).toLocaleString()}</Detail>
      <Detail>{visit.care_recipient_id}</Detail>
      <Detail>{parseEventType(visit.event_type)}</Detail>
      {showDetail && (
        <VisitDetail
          visit={visit}
          handleClose={() => setShowDetail(false)}
          open={showDetail}
        />
      )}
    </VisitItemContainer>
  );
}
