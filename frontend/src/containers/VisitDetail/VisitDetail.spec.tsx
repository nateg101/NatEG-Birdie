import React from 'react';
import { render, screen } from '@testing-library/react';
import { VisitDetail } from './VisitDetail';
import { parseEventType, formatTimeStamp } from '../../helpers';
import { mockFoodIntakeProps } from '../../mocks/mockVisitItem';

const header = 'Details of Visit';

describe('Visit Detail component', () => {
  it('renders the detail of a food intake visit', () => {
    render(
      <VisitDetail
        visit={mockFoodIntakeProps}
        handleClose={jest.fn()}
        open={true}
      />
    );
    expect(screen.getByText(header)).toBeInTheDocument();

    expect(
      screen.getByText(
        `Date of Visit: ${new Date(
          Date.parse(mockFoodIntakeProps.timestamp)
        ).toDateString()}`
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        `Time of Visit: ${formatTimeStamp(mockFoodIntakeProps.timestamp)}`
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        `Nature of Visit: ${parseEventType(mockFoodIntakeProps.event_type)}`
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Ate: ${mockFoodIntakeProps.note}`)
    ).toBeInTheDocument();
  });
});
