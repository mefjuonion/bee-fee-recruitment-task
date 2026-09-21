import App from './App';
import DOM from './utils/DOM';

const whenStarted = new Promise<void>((resolve) => {
  DOM.welcomeStartButton().addEventListener('click', () => {
    DOM.welcomePage().remove();
    resolve();
  });
});

void App(whenStarted);