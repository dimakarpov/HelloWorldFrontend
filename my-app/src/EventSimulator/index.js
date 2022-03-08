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
          <form onSubmit={this.handleSubmit}>
            <table className='simulatorTable'>
            <tr>
              <td colSpan={2}><p className='simulatorHeader'>סימולטור מועדים</p></td>
            </tr>
            <tr>
              <td>תאריך תביעה אחרון:</td>
              <td><input type="date" name="last_leading_date" value={this.state.value} onChange={this.handleChange} className='simulatorInput' /></td>
            </tr>
            <tr>
              <td>תאריך קדם משפט:</td>
              <td><input type="date" name="pre_trial_date" value={this.state.value} onChange={this.handleChange} className='simulatorInput' /></td>
            </tr>
            <tr>
              <td colSpan={2} className='simulatorSubmitButtonContainer'><input type="submit" value="הצג מועדים" className='simulatorSubmitButton' /></td>
            </tr>
            </table>
                {/* <label>תאריך תביעה אחרון:
                    <input type="date" name="last_leading_date" value={this.state.value} onChange={this.handleChange} className='simulatorInput' />
                </label>
                <br />
                <label>תאריך קדם משפט:
                    <input type="date" name="pre_trial_date" value={this.state.value} onChange={this.handleChange} className='simulatorInput' />
                </label>
                <br /> */}
            {/* <input type="submit" value="הצג מועדים" /> */}
          </form>
          <br />
          <div id='simulatedEvents'></div>
        </div>
      );
    }
  }