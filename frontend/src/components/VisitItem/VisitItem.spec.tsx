import React from 'react';
import { render, screen } from '@testing-library/react';
import { VisitItem, parseEventType } from './VisitItem';

const mockFoodIntakeProps = {
  id: '19f90822-d91f-4c5f-a67c-38e5c87f7e27',
  meal: 'snack',
  note: '3 x biscuits ',
  visit_id: 'b7c54214-8861-4495-a244-fac62abace70',
  timestamp: '2019-05-12T22:05:07+01:00',
  event_type: 'food_intake_observation',
  caregiver_id: '56890b44-f575-4d66-840a-b402d19a81e5',
  care_recipient_id: 'ad3512a6-91b1-4d7d-a005-6f8764dd0111',
};

describe('Visit Item component', () => {
  it('renders the summary information of a food intake visit', () => {
    render(<VisitItem visit={mockFoodIntakeProps} />);
    expect(
      screen.getByText(`${mockFoodIntakeProps.care_recipient_id}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(Date.parse(mockFoodIntakeProps.timestamp))
    ).toBeInTheDocument();
    expect(
      screen.getByText(parseEventType(mockFoodIntakeProps.event_type))
    ).toBeInTheDocument();
  });
});
