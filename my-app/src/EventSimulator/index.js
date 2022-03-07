import React from 'react';
import ReactDOM from 'react-dom';
import './EventSimulator.css';

export default class EventSimulator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            last_leading_date: '',
            pre_trial_date: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: event.target.value
        });
    }

    handleSubmit(event) {
      const eventSimulatorUri = 'https://localhost:7296/EventSimulator';
      fetch(eventSimulatorUri + '?lastPleadingDate=' + this.state.last_leading_date + '&preTrialDate=' + this.state.pre_trial_date)
      .then(response => response.json())
      .then(data => { 
        console.log(data);
        this.renderResult(data);
      })
      //.then(data => )

      event.preventDefault();
    }

    renderResult(data) {
      //https://reactjs.org/docs/lists-and-keys.html
      const events = data.map((event) =>
        <li>{event.description + ' ' + event.dateString}</li>
      );

      ReactDOM.render(
        <ul>{events}</ul>,
        document.getElementById('simulatedEvents')
      );
    }

    render() {
      return (
        <div>
          <form  onSubmit={this.handleSubmit}>
                <label>Last pleading date:
                    <input type="date" name="last_leading_date" value={this.state.value} onChange={this.handleChange} placeholder='dd-mm-yyyy' />
                </label>
                <br />
                <label>Pre trial date:
                    <input type="date" name="pre_trial_date" value={this.state.value} onChange={this.handleChange} placeholder='dd-mm-yyyy' />
                </label>
                <br />
            <input type="submit" value="Run Simulation" />
          </form>
          <br />
          <div id='simulatedEvents'></div>
        </div>
      );
    }
  }