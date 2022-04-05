import './App.css';

export default function App() {

  function testFetch() {
    fetch('/api')
    .then(res => res.json())
    .then(data => console.log(data))
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={testFetch}>fetch test</button>
      </header>
    </div>
  );
}