import React, { useEffect, useState } from 'react';
import { VisitItem } from '../../components/VisitItem/VisitItem';

function VisitsListWrapper(): React.ReactElement {
  const [loading, setLoading] = useState(true);
  const [visits, setVisits] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8000/events')
      .then((res) => res.json())
      .then((results) => {
        setVisits(results);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
      });
  }, []);

  function returnError(): any {
    return (
      <div className="visits-error-message">
        There was an error, please contact our support team if this persists
      </div>
    );
  }

  return (
    <div className="visits-wrapper">
      <h1>Visits</h1>
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
    </div>
  );
}

export default VisitsListWrapper;
