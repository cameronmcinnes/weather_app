import React from 'react';

import ForecastItem from './forecast_item';

class ForecastContainer extends React.Component {
  constructor(props) {
    super();
    this.state = {
      weather: null,
      celsius: true
    };

    // binding toggleTempScale because it will be invoked function
    // style as a callback
    this.toggleTempScale = this.toggleTempScale.bind(this);
  }

  componentDidMount() {
    // using 'dotenv' npm package to set up gitignore .env file and add
    // ENV variable API_KEY to webpack and keep api key secret on client
    const clientId = 'JkftORcsiuyjbRwpj4YKf'
    const apiKey = `&client_secret=${API_KEY}`;
    const url = `https://api.aerisapi.com/forecasts/11101?client_id=${clientId}${apiKey}`

    // could also use jQuery for AJAX requests but since there's only
    // one simple request vanilla JS will do
    let xmlhttp = new XMLHttpRequest();

    // update components state to store data on succesful response
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.status === 200 &&
        xmlhttp.readyState === XMLHttpRequest.DONE) {
        const data = JSON.parse(xmlhttp.responseText)
        const forecast = data.response[0].periods;
        this.setState({weather: forecast});
      }
    };

    xmlhttp.open('GET', url, true);
    xmlhttp.send();
  }

  parseWeather() {
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
          date={new Date (day.dateTimeISO)}
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
      componentBody = (
        <div className='forecast-container'>
          { this.parseWeather() }
        </div>
      );
    } else {
      componentBody = <div className='loading'><span>loading</span></div>;
    }

    const buttonText = this.state.celsius ?
      'show farenheit' : 'show celsius'

    return (
      <section>
        <h1>Weather Forecast</h1>
        { componentBody }
        <button onClick={ this.toggleTempScale }>{buttonText}</button>
      </section>
    );
  }
}

export default ForecastContainer;
