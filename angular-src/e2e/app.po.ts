import { browser, element, by } from 'protractor';

export class AngularSrcPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('mapp-root h1')).getText();
  }
}
