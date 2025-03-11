import { Buffer } from 'buffer';
window.Buffer = Buffer;

import { render } from 'preact';
import App from './App';
import './style.css';

render(<App />, document.getElementById('app'));
