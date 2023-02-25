import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import LinkButton from '../../components/LinkButton/LinkButton';
import {
  VisitItem,
  VisitItemContainer,
  Detail,
} from '../../components/VisitItem/VisitItem';
import { constructGetEventsCall } from '../../helpers';
import {
  NavBar,
  CenteredHeader,
  VisitsWrapper,
  DateWrapper,
  Label,
  OuterVisitContainer,
} from './ListComponents';

const VisitItemContainerHeader = styled(VisitItemContainer)`
  font-weight: 600;
  cursor: auto;
  &:hover {
    background-color: #ffff;
  }
`


function VisitsListWrapper(): React.ReactElement {
  const [loading, setLoading] = useState(true);
  const [visits, setVisits] = useState([]);
  const [error, setError] = useState(false);
  const [startEndDate, setStartEndDate] = useState({
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    const endpoint = constructGetEventsCall(
      startEndDate.startDate,
      startEndDate.endDate
    );
    fetch(`${endpoint}`)
      .then((res) => res.json())
      .then((results) => {
        setVisits(results);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
      });
  }, [startEndDate.endDate, startEndDate.startDate]);

  function returnError(): any {
    return (
      <div className="visits-error-message">
        There was an error, please contact our support team if this persists
      </div>
    );
  }

  return (
    <VisitsWrapper className="visits-wrapper">
      <NavBar>
        <div>
          <LinkButton
            className="redirect-home"
            aria-label="navigate to homepage"
            to="/"
          >
            Home
          </LinkButton>
        </div>
        <CenteredHeader>Visits</CenteredHeader>
      </NavBar>
      <DateWrapper className="date-selector">
        <Label>
          Start Date:
          <input
            type="date"
            name="Start Date"
            // value={startEndDate.startDate}
            onBlur={(e) =>
              setStartEndDate({ ...startEndDate, startDate: e.target.value })
            }
          />
        </Label>
        <Label>
          End Date:
          <input
            type="date"
            name="End Date"
            // value={startEndDate.endDate}
            onBlur={(e) =>
              setStartEndDate({ ...startEndDate, endDate: e.target.value })
            }
          />
        </Label>
      </DateWrapper>
      <OuterVisitContainer>
        <VisitItemContainerHeader>
          <Detail>Date Of Visit</Detail>
          <Detail>ID of Recipient</Detail>
          <Detail>Type of Visit</Detail>
        </VisitItemContainerHeader>
        {loading ? (
          <div className="loading">Loading ...</div>
        ) : (
          visits.length > 0 &&
          visits.map((visitData: any) => {
            return <VisitItem key={visitData.id} visit={visitData} />;
          })
        )}
        {!loading && !error && visits.length === 0 && (
          <div className="no-visits">
            There are no visits that match your criteria - please try again
          </div>
        )}
        {error && returnError()}
      </OuterVisitContainer>
    </VisitsWrapper>
  );
}

export default VisitsListWrapper;
