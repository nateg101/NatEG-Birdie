import React from 'react';
import { render, screen } from '@testing-library/react';
import { VisitItem } from './VisitItem';
import { parseEventType } from '../../helpers';
import { mockFoodIntakeProps } from '../../mocks/mockVisitItem';

describe('Visit Item component', () => {
  it('renders the summary information of a food intake visit', () => {
    render(<VisitItem visit={mockFoodIntakeProps} />);
    expect(
      screen.getByText(`${mockFoodIntakeProps.care_recipient_id}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        new Date(Date.parse(mockFoodIntakeProps.timestamp)).toLocaleString()
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(parseEventType(mockFoodIntakeProps.event_type))
    ).toBeInTheDocument();
  });
});
