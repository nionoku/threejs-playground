import './assets/main.css';
import { ViewController } from './controllers/view';

async function main() {
  try {
    const vc = await new ViewController().make();
    vc.startRendering();
  } catch (err) {
    alert('Ops... game not working');
  }
}

document.addEventListener('DOMContentLoaded', main);