import { environment } from './environment.prod';

describe('Production Environment', () => {
  it('should have production flag set to true', () => {
    expect(environment.production).toBe(true);
  });
});
