import React from 'react';
import AppWrapper from '../components/AppWrapper/AppWrapper';
import LinkButton from '../components/LinkButton/LinkButton';
import VisitItem from '../components/VisitItem/VisitItem';

function HomePage(): React.ReactElement {
  return (
    <AppWrapper className='home-page'>
        <h1>Welcome to Birdie</h1>
        <p>Please click below to view care visits</p>
        <LinkButton className='view-care-redirect' to='visits'> View Care Visits</LinkButton>
        <VisitItem />
    </AppWrapper>
  );
}

export default HomePage;
