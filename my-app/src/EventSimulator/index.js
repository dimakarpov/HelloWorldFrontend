import React from 'react';
import ReactDOM from 'react-dom';
import './EventSimulator.css';

export default class EventSimulator extends React.Component {
    render() {
      return (
        <div>
          <div>
                <label>Last pleading date:
                    <input type="date" name="last-pleading-date" placeholder='dd-mm-yyyy' />
                </label>
            <br />
                <label>Pre trial date:
                    <input type="date" name="pre-trial-date" placeholder='dd-mm-yyyy' />
                </label>
            <br />
            <button onClick={GetEventSimulation}>Run Simulation</button>
          </div>
        </div>
      );
    }
  }

  function GetEventSimulation() {
    alert("!");
  }