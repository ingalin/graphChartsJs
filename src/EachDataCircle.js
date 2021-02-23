import { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';


class EachDataCircle extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usersChoice: "Quality Score"
        }
    }

    // If clicked on a circle, the circle color changes
    componentDidUpdate() {
        if (this.state.usersChoice !== this.props.dataParentToChild) {
            this.setState({
                usersChoice: this.props.dataParentToChild
            });
        }
    }

    render() {
        const { name, score, vsly, sample } = this.props;
        // Circle not selected:
        const data = {
            datasets: [
                {
                    // Import data (100% - value for the rest of the circle)
                    data: [score, 100-score],
                    backgroundColor: [
                        "#0071c5",
                        "#d7d7d7",
                    ],
                    borderWidth: 0.5,
                },
            ],
        }
        // Circle selected:
        const data2 = {
            datasets: [
                {
                    // Import data (100% - value for the rest of the circle)
                    data: [score, 100 - score],
                    backgroundColor: [
                        "#00aeef",
                        "#d7d7d7",
                    ],
                    borderWidth: 0.5,
                },
            ],
        };

        return (
            <div>
                {/* Display data */}
                <h4>{name}</h4>
                <div className="textInside">
                    <p className="amountStyle">{score} %</p>
                    {/* If null, display N/A, else value */}
                    {vsly === null ? <p>N/A</p> : <p>{vsly}</p>}
                </div>
                {/* Doughnut chart */}
                <Doughnut 
                    data={this.state.usersChoice === name ? data2 : data}
                    width={130} 
                    options={{
                        // Circle thickness
                        cutoutPercentage: 87,
                        plugins: {
                            datalabels: {
                                // hide datalabels for all datasets
                                display: false
                            }
                        },
                        tooltips: {
                            // Hide labels:
                            enabled: false, 
                        }
                    }}
                />
                <p>Sample: {sample}</p>
            </div>
        )
    }
}

export default EachDataCircle;