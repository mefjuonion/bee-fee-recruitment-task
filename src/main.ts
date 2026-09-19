import App from './App';
import UI from './utils/UI';

const whenStarted = new Promise<void>((resolve) => {
  UI.welcomeStartButton().addEventListener('click', () => {
    UI.welcomePage().remove();
    resolve();
  });
});

void App(whenStarted);