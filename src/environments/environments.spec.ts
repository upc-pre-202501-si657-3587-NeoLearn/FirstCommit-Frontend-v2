import { environment } from './environments';

describe('Development Environment', () => {
  it('should have production flag set to false', () => {
    expect(environment.production).toBe(false);
  });

  it('should have a defined apiBaseUrl', () => {
    expect(environment.apiBaseUrl).toBeDefined();
  });
});
