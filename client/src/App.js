import { useEffect, useState } from 'react';
import './App.css';

const BASE_URL = window.HOST;

const App = () => {
  const [quotes, setQuotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log(window?.REACT_APP_HOST);

  useEffect(() => {
    fetch(`${BASE_URL}/quotes`)
      .then(r => {
        if (!r.ok) {
          throw new Error('Error connecting to the server');
        }

        return r.json();
      })
      .then(setQuotes)
      .catch(console.log)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1 class="App-title">Movie quotes</h1>
        {
          isLoading
            ? <div>Loading data...</div>
            : quotes.map(({ text, movie }, index) =>
              <div className="App-quote" key={index}>
                {text
                  .split('\n')
                  .filter(Boolean)
                  .map((line, i) => <div key={i}>
                    <q>{line}</q>
                    <br />
                  </div>)}
                <p>- {movie}</p>
              </div>
            )
        }
      </header>
    </div>
  );
}

export default App;
