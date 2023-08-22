import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import Explorer from './Explorer'; // Import the Explorer component

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cityInfo: null,
      isLoading: false,
    };
  }

  fetchCityInfo = (cityName) => {
    if (cityName) {
      this.setState({ isLoading: true });

      const apiKey = process.env.REACT_APP_API_KEY;
      const apiUrl = `https://us1.locationiq.com/v1/search.php?key=${apiKey}&q=${cityName}&format=json`;

      axios
        .get(apiUrl)
        .then((response) => {
          this.setState({ cityInfo: response.data[0], isLoading: false });
        })
        .catch((error) => {
          console.error('Error fetching city info:', error);
          this.setState({ cityInfo: null, isLoading: false });
        });
    }
  };

  render() {
    const { cityInfo, isLoading } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <h1>City Explorer</h1>
          <Explorer onExplore={this.fetchCityInfo} />
          {isLoading && <p>Loading...</p>}
          {cityInfo && (
            <div>
              <h2>{cityInfo.display_name}</h2>
              <p>Latitude: {cityInfo.lat}</p>
              <p>Longitude: {cityInfo.lon}</p>
              {cityInfo.lat && cityInfo.lon && (
                <img
                  src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_API_KEY}&center=${cityInfo.lat},${cityInfo.lon}&zoom=10`}
                  alt="City Map"
                />
              )}
            </div>
          )}
        </header>
      </div>
    );
  }
}

export default App;
