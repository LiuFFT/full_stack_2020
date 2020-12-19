import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Header = (props) => {
    return (
        <h1>{props.course}</h1>
    )
}

const Part = (props) => {
    return (
        <p>{props.part} {props.exercises}</p>
    )
}

const Content = (props) => {
    return (
            [
                <Part part={props.parts[0].part} exercises={props.parts[0].exercises}/>,
                <Part part={props.parts[1].part} exercises={props.parts[1].exercises}/>,
                <Part part={props.parts[2].part} exercises={props.parts[2].exercises}/>
            ]
    )
}
const Total = (props) => {
    return (
        <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises }</p>
    )
}


const App = () => {
    const course = 'Half Stack application development'
    // const part1 = 'Fundamentals of React'
    // const exercises1 = 10
    // const part2 = 'Using props to pass data'
    // const exercises2 = 7
    // const part3 = 'State of a component'
    // const exercises3 = 14
    const content_parts = [
        {
            part : 'Fundamentals of React',
            exercises: 10
        },
        {
            part : 'Using props to pass data',
            exercises: 7
        },
        {
            part : 'State of a component',
            exercises: 14
        }
    ]
    return (
        <div>
            <Header course={course} />
            <Content parts={content_parts} />
            <Total  parts={content_parts}/>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
