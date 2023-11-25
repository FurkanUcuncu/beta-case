import { authSlice, getSessionId } from '../../store/auth/authSlice';

jest.mock('axios', () => ({
  create: jest.fn().mockImplementation(() => {
    return {
      defaults: {
        headers: {
          common: {
            'Session-ID': '1234dd',
          },
        },
      },
    };
  }),
}));

jest.mock('react-slick', () => jest.fn());

const initialState = { sessionId: '' };

describe('Product slice tests', () => {
  it('Session Id call', async () => {
    const action = {
      type: getSessionId.fulfilled.type,
      payload: { data: '1234dd' },
    };
    const state = authSlice.reducer(initialState, action);
    expect(state).toEqual({ sessionId: '1234dd' });
  });
});
