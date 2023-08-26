import React, { Component } from 'react';
import Axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';
import Explorer from '@/components/Explorer';
import ErrorComponent from '@/components/ErrorComponent';
import Weather from '@/components/Weather';
import Movies from '@/components/Movies';

const apiKey = import.meta.env.VITE_LOCATIONIQ_API_KEY;
const weatherbitApiKey = import.meta.env.VITE_WEATHERBIT_API_KEY;
const moviesApiKey = import.meta.env.VITE_MOVIES_API_KEY;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityInfo: null,
      isLoading: false,
      error: null,
      weatherData: null,
      moviesData: null,
    };
  }

  fetchCityInfo = (cityName) => {
    if (cityName) {
      this.setState({ isLoading: true, error: null });
    

      const apiURL = `https://us1.locationiq.com/v1/search.php?key=${apiKey}&q=${cityName}&format=json`;
      
      Axios.get(apiURL)
      .then((response) => {
        this.setState({ cityInfo: response.data[0], isLoading: false });
        
        const weatherbitApiUrl = `https://api.weatherbit.io/v2.0/current?lat=${response.data[0].lat}&lon=${response.data[0].lon}&key=${weatherbitApiKey}`;
        const moviesApiUrl = `/movies?cityName=${cityName}&apiKey=${moviesApiKey}`;
        

        Axios.get(weatherbitApiUrl)
          .then((weatherResponse) => {
            this.setState({ weatherData: weatherResponse.data });
          })
          .catch((error) => {
            console.error('Error fetching weather data:', error);
          });
    
          Axios.get(moviesApiUrl)
            .then((moviesResponse) => {
              this.setState({ moviesData: moviesResponse.data });
            })
            .catch((error) => {
              console.error('Error fetching movies data:', error);
            });
        })
        .catch((error) => {
          console.error('Error fetching city info:', error);
          this.setState({ cityInfo: null, isLoading: false, error });
        });
    }
  };

  render() {
    const { cityInfo, isLoading, error, weatherData, moviesData } = this.state;
    
    return (
      <div className="App" style={{ display: 'block', width: 700, padding: 30 }}>
        <h4>City Explorer</h4>
        <Explorer onExplore={this.fetchCityInfo} />
        {isLoading && <p>Loading...</p>}
        {error && <ErrorComponent statusCode={error.response ? error.response.status : 'N/A'} errorMessage={error.message || 'An error occurred'} />}
        {cityInfo && (
          <div>
            <Card className="mt-4">
              <Card.Body>
                <Card.Title>{cityInfo.display_name}</Card.Title>
                <Card.Text>
                  <strong>Latitude:</strong> {cityInfo.lat}<br />
                  <strong>Longitude:</strong> {cityInfo.lon}
                </Card.Text>
                {cityInfo.lat && cityInfo.lon && (
                  <img src={`https://maps.locationiq.com/v3/staticmap?key=${apiKey}&center=${cityInfo.lat},${cityInfo.lon}&zoom=10`} alt="City Map" />
                    )}
              </Card.Body>
            </Card>
            {weatherData && <Weather lat={cityInfo.lat} lon={cityInfo.lon} searchQuery={cityInfo.display_name} />}
            {moviesData && <Movies cityName={cityInfo.display_name} moviesData={moviesData} />}
          </div>
        )}
      </div>
    );
  }
}

export default App;
