import React from 'react';
import axios from 'axios';
import './App.css';
import Explorer from './components/Explorer';
import ErrorComponent from './components/ErrorComponent';
import Weather from './components/Weather';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityInfo: null,
      isLoading: false,
      error: null,
      weatherData: null, // Add weatherData state
    };
  }

  fetchCityInfo = (cityName) => {
    if (cityName) {
      this.setState({ isLoading: true, error: null });
// eslint-disable-next-line no-unused-vars
      const apiKey = process.env.REACT_APP_API_KEY;
      const apiUrl = `https://us1.locationiq.com/v1/search.php?key=${apiKey}&q=${cityName}&format=json`;

      axios
        .get(apiUrl)
        .then((response) => {
          this.setState({ cityInfo: response.data[0], isLoading: false });

          axios
            .get(`/weather?lat=${response.data[0].lat}&lon=${response.data[0].lon}&searchQuery=${response.data[0].display_name}`)
            .then((weatherResponse) => {
              this.setState({ weatherData: weatherResponse.data });
            })
            .catch((error) => {
              console.error('Error fetching weather data:', error);
            });
        })
        .catch((error) => {
          console.error('Error fetching city info:', error);
          this.setState({ cityInfo: null, isLoading: false, error });
        });
    }
  };

  render() {
    const { cityInfo, isLoading, error, weatherData } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <h1>City Explorer</h1>
          <Explorer onExplore={this.fetchCityInfo} />
          {isLoading && <p>Loading...</p>}
          {error && (
            <ErrorComponent
              statusCode={error.response ? error.response.status : 'N/A'}
              errorMessage={error.message || 'An error occurred'}
            />
          )}
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
              {weatherData && (
                <Weather
                  lat={cityInfo.lat}
                  lon={cityInfo.lon}
                  searchQuery={cityInfo.display_name}
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
