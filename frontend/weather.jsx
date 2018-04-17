import React from 'react';

import ForecastItem from './forecast_item';

class Weather extends React.Component {
  constructor(props) {
    super();
    this.state = {
      weather: null,
      celsius: true
    };
    this.toggleTempScale = this.toggleTempScale.bind(this);
  }

  componentDidMount() {
    const clientId = 'JkftORcsiuyjbRwpj4YKf'
    const apiKey = `&client_secret=${API_KEY}`;

    const url = `http://api.aerisapi.com/forecasts/11101?client_id=${clientId}${apiKey}`

    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.status === 200 && xmlhttp.readyState === XMLHttpRequest.DONE) {
        const data = JSON.parse(xmlhttp.responseText)
        const forecast = data.response[0].periods;
        this.setState({weather: forecast});
      }
    };

    xmlhttp.open('GET', url, true);
    xmlhttp.send();
  }

  parseResp() {
    return Object.values(this.state.weather).map( (day, idx) => {
      let high, low;

      if (this.state.celsius) {
        high = `${day.maxTempC} °C`;
        low = `${day.minTempC} °C`;
      } else {
        high = `${day.maxTempF} °F`;
        low = `${day.minTempF} °F`;
      }

      return (
        <ForecastItem
          key={idx}
          date={day.dateTimeISO.slice(0, 10)}
          high={high}
          low={low}
          iconSrc={`assets/icons/${day.icon}`}
          />
      );
    });
  }

  toggleTempScale() {
    // using functional set state because we're reading and writing
    // state at the same time, best practice to avoid race conditions
    this.setState( prevState => {
      return {celsius: !prevState.celsius}
    });
  }

  render() {
    let componentBody;

    if (this.state.weather) {
      componentBody = <div> { this.parseResp() } </div>
    } else {
      componentBody = <div className='loading'>loading</div>;
    }

    return (
      <div>
        { componentBody }
        <button onClick={ this.toggleTempScale }>click me</button>
      </div>
    );
  }
}

export default Weather;
