import './App.css';
import React, { Component } from 'react'
import data from './data.json';
import options from './options.js';

import EachDataCircle from "./EachDataCircle";
import { Line } from "react-chartjs-2";
import 'chartjs-plugin-datalabels';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTasks } from '@fortawesome/free-solid-svg-icons'
import { faChartBar } from '@fortawesome/free-solid-svg-icons'
import { faMapPin } from '@fortawesome/free-solid-svg-icons'
import { faFileDownload } from '@fortawesome/free-solid-svg-icons'
import { faArrowAltCircleDown } from '@fortawesome/free-solid-svg-icons'
import { faPrint } from '@fortawesome/free-solid-svg-icons'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { faEnvelopeOpen } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faShapes } from '@fortawesome/free-solid-svg-icons'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'





class App extends Component {
  constructor() {
    super();
    this.state = {
      gaugeData: [],
      // Selected (by user) data set:
      selection: "Quality Score",
      // Data to display in a graph:
      dataGraph: [],
      date: [],
      score: [],
    }
  }

  componentDidMount() {
    //Add data from Json file to the state
    this.setState({
      gaugeData: data.gaugeData,
      dataGraph: data.areaData[this.state.selection],
    }, () => {
      // Transform data to display the graph
      this.updateDisplayData();
    });
  }

  // When user changes selection, change the graph:
  componentDidUpdate(prevProps, prevState) {
    if (prevState.selection !== this.state.selection) {
      this.updateDisplayData();
    }
  }


  // Change data format to diplay the graph
  updateDisplayData = () => {
    const { dataGraph } = this.state
    // Make 2 arrays for X and Y axes:
    let dateX = [];
    let scoreY = [];
    for (let i = 0; i < dataGraph.length; i++) {
      dateX.push(dataGraph[i].date);
      scoreY.push(dataGraph[i].score);
    }

    this.setState({
      date: dateX,
      score: scoreY
    }, () => {
      const data = (canvas) => {
        // Graph Fill gradient color:
        const ctx = canvas.getContext("2d")
        const gradient = ctx.createLinearGradient(0, 550, 0, 0);
        gradient.addColorStop(1, '#0e79c8');
        gradient.addColorStop(0, 'white');
        // Data for the graph
        return {
          // X axes
          labels: this.state.date,
          datasets: [
            {
              fill: 'start',
              backgroundColor: gradient,
              borderColor: "#0071c5",
              borderWidth: 2.5,
              // Y axes
              data: this.state.score,
              pointRadius: 8,
              pointHoverRadius: 10,
              pointBorderColor: "white",
              pointBackgroundColor: "#0071c5",
            }
          ]
        }
      }
      this.setState({
        display: data
      });
    });
  }

  // Show data on the user's selection
  showData = (name) => {
    this.setState({
      selection: name,
      dataGraph: data.areaData[name],
    });
  }


  render() {
    return (
      <div className="App">
        <nav className="emailNav">
          <ul>
            <a href="#"><FontAwesomeIcon icon={faMapPin} /></a>
            <a href="#"><FontAwesomeIcon icon={faChartBar} /></a>
            <a href="#"><FontAwesomeIcon icon={faEnvelopeOpen} /></a>
            <a href="#"><FontAwesomeIcon icon={faShapes} /></a>
            <a href="#"><FontAwesomeIcon icon={faEnvelope} /></a>
          </ul>
        </nav>
        <header>
          <div className="fileNav">
            <p>Logged In as General User</p>
            <nav>
              <ul>
                <a href="#"><FontAwesomeIcon icon={faTasks} /></a>
                <a href="#"><FontAwesomeIcon icon={faFileDownload} /></a>
                <a href="#"><FontAwesomeIcon icon={faArrowAltCircleDown} /></a>
                <a href="#"><FontAwesomeIcon icon={faPrint} /></a>
                <a href="#"><FontAwesomeIcon icon={faQuestionCircle} /></a>
              </ul>
            </nav>
          </div>
          <div className="wrapper">
            <h1>performance management</h1>
          </div>
          <div className="diagnostic">
            <div className="wrapper diagnosticIconsText">
              <div>
                <FontAwesomeIcon icon={faGlobe} />
                <h2>Diagnostic Tool</h2>
              </div>
              <FontAwesomeIcon icon={faMapPin} />
            </div>
          </div>
        </header>
        <main className="wrapper">
          <div className="details">
            <div className="filters">
              <h5>Filters</h5>
              <div className="legends">
                <div>
                  <div className="color1"></div>
                  <p>All CQA Results <FontAwesomeIcon icon={faInfoCircle} /></p>
                </div>
                <div>
                  <div className="color2"></div>
                  <p>CQAs with Closed Loop <FontAwesomeIcon icon={faInfoCircle} /></p>
                </div>
              </div>
            </div>
            <div className="time">
              <h3>{this.state.selection} trend</h3>
              <ul>
                <a className="day" href="#">Day</a>
                <a href="#">Week</a>
                <a className="month" href="#">Month</a>
                <a href="#">Quarter</a>
                <a href="#">Half</a>
                <a href="#">Year</a>
              </ul>
            </div>
          </div>
          {/* Each data circle */}
          <div className="circlesGraph">
            <ul className="circles">
              {
                this.state.gaugeData.map((each) => {
                  return (
                    <li key={each.name}>
                      {/* Keep the color of the selected item, show graph */}
                      <button className={each.name === this.state.selection ? "clicked" : null} onClick={() => this.showData(each.name)}>
                        <EachDataCircle dataParentToChild={this.state.selection}
                          name={each.name}
                          score={each.score}
                          vsly={each.vsly}
                          sample={each.sample}
                        />
                      </button>
                    </li>
                  );
                })
              }
            </ul>
            {/* Graph */}
            <div className="graph">
              {/* When data has finished loading, display the graph */}
              {this.state.display ? 
              <Line 
                data={this.state.display} 
                options={options} 
              /> : null}
            </div>
          </div>
        </main>
      </div>
    );
  }
}
export default App;
