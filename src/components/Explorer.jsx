import React, { Component } from 'react';

class Explorer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: '',
    };
  }

  handleCityInputChange = (event) => {
    this.setState({ cityName: event.target.value });
  };

  render() {
    const { cityName } = this.state;
    const { onExplore } = this.props;

    return (
      <div>
        <input
          type="text"
          value={cityName}
          onChange={this.handleCityInputChange}
          placeholder="Enter a city name"
        />
        <button onClick={() => onExplore(cityName)}>Explore!</button>
      </div>
    );
  }
}

export default Explorer;
