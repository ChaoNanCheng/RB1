import { RB1Page } from './app.po';

describe('rb1 App', function() {
  let page: RB1Page;

  beforeEach(() => {
    page = new RB1Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
