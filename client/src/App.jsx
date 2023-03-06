import "./App.css";
import axios from "axios";
import { useState } from "react";

const App = () => {
  const [currencies, setCurrencies] = useState(null);
  const [database, setDatabase] = useState([]);
  const [dbIsShoved, setDbIsShoved] = useState(false);

  const api = "https://api.coingecko.com/api/v3/global";
  const base_url = "http://localhost:8000/currency";

  const getSourceData = async () => {
    await axios
      .get(api)
      .then((res) => {
        const sourceData = res.data.data.market_cap_percentage;

        setCurrencies(Object.entries(sourceData));
        setDbIsShoved(false);
      })
      .catch((error) => {
        console.log("getSourceData error", error);
      });
  };

  const addToDatabase = async (name, value) => {
    await axios
      .post(
        `${base_url}/add`,
        {
          name: name,
          value: value,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json;charset=utf-8",
          },
        }
      )
      .then((res) => {
        console.log("Succesfully", res);
      })
      .catch((err) => {
        console.log("addToDatabase error", err);
      });
  };

  const getDatabase = async () => {
    await axios
      .get(`${base_url}/all`)
      .then((res) => {
        const currencies = res.data.data;

        setDatabase(currencies);
        setDbIsShoved(true);
      })
      .catch((error) => {
        console.log("getSourceData error", error);
      });
  };

  return (
    <div className="App">
      <div className="buttons">
        <button
          onClick={() => {
            getSourceData();
          }}
        >
          Parse
        </button>
        <button
          onClick={() => {
            getDatabase();
          }}
        >
          Show
        </button>
      </div>
      {currencies && !dbIsShoved && (
        <div className="container">
          <h3>Parsed data</h3>
          <div className="source-data">
            {currencies.map(([name, value], index) => {
              return (
                <div className="source-data-element" key={`${name} ${index}`}>
                  <span>{name}</span>
                  <span>{value}</span>
                  <button
                    onClick={() => {
                      addToDatabase(name, value);
                    }}
                  >
                    add to database
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {dbIsShoved && (
        <div className="container">
          <h3>Database</h3>
          {database.length !== 0 ? (
            <div className="database">
              {database.map((item) => {
                return (
                  <div className="database-element" key={item._id}>
                    <span>{item.name}</span>
                    <span>{item.value}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>Database is empty. Parse some currencies</div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
