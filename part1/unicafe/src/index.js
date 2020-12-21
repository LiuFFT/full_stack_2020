import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
        {text}
    </button>
)

const Statistic = (props) => {
    const {text, value} = props
    if (text === "positive"){
        return (
            [
                <td key={text}>{text}</td>,
                <td key={value}>{value}%</td>
            ]
        )
    }

    return (
        [
            <td key={text}>{text}</td>,
            <td key={value}>{value}</td>
        ]
    )
}

const Statistics = (props) => {
    const {good, neutral, bad} = props

    if ((good + neutral + bad) === 0){
        return (
            <div>
                No feedback given
            </div>
        )
    }

    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <Statistic text="good" value={good}/>
                    </tr>
                    <tr>
                        <Statistic text="neutral" value={neutral}/>
                    </tr>
                    <tr>
                        <Statistic text="bad" value={bad}/>
                    </tr>
                    <tr>
                        <Statistic text="all" value={bad + neutral + good}/>
                    </tr>
                    <tr>
                        <Statistic text="average" value={(good - bad)/(bad + neutral + good)}/>
                    </tr>
                    <tr>
                        <Statistic text="positive" value={(good * 100)/(bad + neutral + good)}/>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}




const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleGoodClick = () => {
        setGood(good+1)
    }

    const handleNeutralClick = () => {
        setNeutral(neutral+1)
    }

    const handleBadClick = () => {
        setBad(bad+1)
    }


    return (
        <div>
            <h1>Give feedback</h1>
            <Button onClick={handleGoodClick} text="good"/>
            <Button onClick={handleNeutralClick} text="neutral"/>
            <Button onClick={handleBadClick} text="bad"/>

            <h1>Statistics</h1>
            <Statistics good={good} bad={bad} neutral={neutral}/>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
