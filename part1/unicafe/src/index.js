import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
        {text}
    </button>
)

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
            <h1>Statistics</h1>
            <p>good {good}</p>
            <p>neutral {neutral}</p>
            <p>bad {bad}</p>
            <p>all {bad + neutral + good}</p>
            <p>average {(good - bad)/(bad + neutral + good)}</p>
            <p>positive {(good * 100)/(bad + neutral + good)}%</p>
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

            <Statistics good={good} bad={bad} neutral={neutral}/>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
