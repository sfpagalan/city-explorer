import React from 'react';
import PropTypes from 'prop-types';

class Explorer extends React.Component {
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

Explorer.propTypes = {
  onExplore: PropTypes.func.isRequired,
};

export default Explorer;
