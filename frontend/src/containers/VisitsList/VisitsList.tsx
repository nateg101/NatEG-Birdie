import React, { useEffect, useState } from 'react';
import LinkButton from '../../components/LinkButton/LinkButton';
import { VisitItem } from '../../components/VisitItem/VisitItem';
import { constructGetEventsCall } from '../../helpers';
import { NavBar, CenteredHeader, VisitsWrapper, DateWrapper, Label } from './ListComponents';

function VisitsListWrapper(): React.ReactElement {
  const [loading, setLoading] = useState(true);
  const [visits, setVisits] = useState([]);
  const [error, setError] = useState(false);
  const [startEndDate, setStartEndDate] = useState({startDate: '', endDate: ''});
 
  useEffect(() => {
    const endpoint = constructGetEventsCall(startEndDate.startDate, startEndDate.endDate)
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
            value={startEndDate.startDate}
            onChange={(e) =>
              setStartEndDate({ ...startEndDate, startDate: e.target.value })
            }
          />
        </Label>
        <Label>
          End Date: 
          <input
            type="date"
            name="End Date"
            value={startEndDate.endDate}
            onChange={(e) =>
              setStartEndDate({ ...startEndDate, endDate: e.target.value })
            }
          />
        </Label>
      </DateWrapper>
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
          There are no visits that match your criteria
        </div>
      )}
      {error && returnError()}
    </VisitsWrapper>
  );
}

export default VisitsListWrapper;
