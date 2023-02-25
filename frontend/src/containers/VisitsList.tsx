import React, { useEffect, useState } from 'react';
import { VisitItem } from '../components/VisitItem/VisitItem';

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

  return (
    <div className="visits-wrapper">
      {loading ? (
        <div className="loading">Loading ...</div>
      ) : (
        visits.length > 0 &&
        visits.map((visitData: any) => {
          return <VisitItem visit={visitData} />;
        })
      )}
    </div>
  );
}

export default VisitsListWrapper;
