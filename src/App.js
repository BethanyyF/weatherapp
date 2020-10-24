import React from 'react';
import DisplayCards from './DisplayCards';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar'
import CardGroup from 'react-bootstrap/CardGroup';
import { ApiClient } from './ApiClient'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: "",
      weather: []
    }
    this.apiClient = new ApiClient()
  }


  fetchWeatherData() {
    this.setState({
      loading: "....loading",
      fetching: true
    })

    //execute an api request to api.weather
    this.apiClient.getWeather() //calling function
      .then((response) => //handling response
      { this.updateWeather(response.data.daily) }) //sending the rsponse to state
      .finally(() => {
        this.setState({
          loading: ""
        }, console.log(this.state.weather))
      })
  }

  updateWeather(response) {
    this.setState({
      weather: response
    })
  }

  buildCards() {
    return this.state.weather.slice(1, 8).map((current, i) => ( //return data, slice data for number of days wanted
      <Col key={i} md="6" lg="3">
        <CardGroup className="custom-card">
          <DisplayCards dateString={current.dt} img={current.weather[0].icon} alt={current.weather[0].description} text={current.weather[0].description} max={current.temp.max} min={current.temp.min} wind={current.wind_speed} />
        </CardGroup>
      </Col>

    )
    )
  }

  //lifecycle function
  componentDidMount() {
    this.fetchWeatherData() //gets weather data

  }

  render() { //lifecycle function
    return (
      <>

        <Container>
          <Navbar className="top-bar">
            <Navbar.Brand href="#home">What's the weather this week? {this.state.loading}</Navbar.Brand>
          </Navbar>
          <Row>
            {this.buildCards()}
          </Row>
        </Container>
      </>
    );
  }


}

export default App;
