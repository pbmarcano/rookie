import { render, h } from 'preact';
import './style.css';

// Simple App component
function App() {
  return (
    <div className="app-container">
      <h1>Rookie Wallet</h1>
    </div>
  );
}

// Render the app to the DOM
render(<App />, document.getElementById('app'));
