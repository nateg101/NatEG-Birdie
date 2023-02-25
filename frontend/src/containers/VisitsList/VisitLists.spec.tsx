import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import VisitsListWrapper from './VisitsList';
import { parseEventType } from '../../components/VisitItem/VisitItem';
import { mockVisitResponse } from '../../mocks/mockVisitsResponse';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.get('http://localhost:8000/events', (req, res, ctx) => {
    return res(ctx.json(mockVisitResponse));
  })
);

beforeAll(() => {
  server.listen({
    onUnhandledRequest: 'warn',
  });
});

afterAll(() => {
  server.close();
});

describe('Visit List Wrapper', () => {
  it('renders a list of visits when API call is successful', async () => {
    render(<VisitsListWrapper />);
    expect(screen.getByText('Loading ...')).toBeInTheDocument();

    const firstVisitItem = mockVisitResponse[0];

    const visitsForFirstRecipient = mockVisitResponse.filter(
      (visit) => visit.care_recipient_id === firstVisitItem.care_recipient_id
    ).length;
    const checkOuts = mockVisitResponse.filter(
      (visit) => visit.event_type === 'check_out'
    ).length;

    await waitFor(() =>
      expect(
        screen.getAllByText(`${firstVisitItem.care_recipient_id}`)
      ).toHaveLength(visitsForFirstRecipient)
    );
    expect(screen.getAllByText(parseEventType('check_out'))).toHaveLength(
      checkOuts
    );
    expect(
      screen.getByText(
        new Date(Date.parse(firstVisitItem.timestamp)).toLocaleString()
      )
    ).toBeInTheDocument();
  });

  it('renders an error when events API returns one', async () => {
    server.use(
      rest.get('http://localhost:8000/events', (req, res, ctx) => {
        return res.once(ctx.status(400));
      })
    );

    render(<VisitsListWrapper />);
    expect(screen.getByText('Loading ...')).toBeInTheDocument();

    await waitFor(() =>
      expect(
        screen.getByText(
          'There was an error, please contact our support team if this persists'
        )
      ).toBeInTheDocument()
    );
  });

  it('returns a message when no results are returned', async () => {
    server.use(
      rest.get('http://localhost:8000/events', (req, res, ctx) => {
        return res.once(ctx.json([]));
      })
    );

    render(<VisitsListWrapper />);
    expect(screen.getByText('Loading ...')).toBeInTheDocument();
    await waitFor(() =>
      expect(
        screen.getByText('There are no visits that match your criteria')
      ).toBeInTheDocument()
    );
  });
});
