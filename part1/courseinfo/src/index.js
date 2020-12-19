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
        /* exercises 1.1 */
            // <div>
            //     <p>
            //         {props.part1} {props.exercises1}
            //     </p>
            //     <p>
            //         {props.part2} {props.exercises2}
            //     </p>
            //     <p>
            //         {props.part3} {props.exercises3}
            //     </p>
            // </div>

        /* exercises 1.2 */
            // <div>
            //     <Part part={props.part1} exercises={props.exercises1}/>
            //     <Part part={props.part2} exercises={props.exercises2}/>
            //     <Part part={props.part3} exercises={props.exercises3}/>
            // </div>

        /* exercises 1.3 */
        // <div>
        //     <Part part={props.part1.name} exercises={props.part1.exercises}/>
        //     <Part part={props.part2.name} exercises={props.part2.exercises}/>
        //     <Part part={props.part3.name} exercises={props.part3.exercises}/>
        // </div>

        /* exercises 1.4-1.5 */
        <div>
            <Part part={props.parts[0].name} exercises={props.parts[0].exercises}/>
            <Part part={props.parts[1].name} exercises={props.parts[1].exercises}/>
            <Part part={props.parts[2].name} exercises={props.parts[2].exercises}/>
        </div>

    )
}
const Total = (props) => {
    return (
        /* exercises 1.1-1.3 */
        // <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>

        /* exercises 1.4-1.5 */
        <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
    )
}


const App = () => {
    /* exercises 1.1-1.2 */
    // const course = 'Half Stack application development'
    // const part1 = 'Fundamentals of React'
    // const exercises1 = 10
    // const part2 = 'Using props to pass data'
    // const exercises2 = 7
    // const part3 = 'State of a component'
    // const exercises3 = 14

    /* exercises 1.3 */
    // const course = 'Half Stack application development'
    // const part1 = {
    //     name: 'Fundamentals of React',
    //     exercises: 10
    // }
    // const part2 = {
    //     name: 'Using props to pass data',
    //     exercises: 7
    // }
    // const part3 = {
    //     name: 'State of a component',
    //     exercises: 14
    // }

    /* exercises 1.4 */
    // const course = 'Half Stack application development'
    // const parts = [
    //     {
    //         name: 'Fundamentals of React',
    //         exercises: 10
    //     },
    //     {
    //         name: 'Using props to pass data',
    //         exercises: 7
    //     },
    //     {
    //         name: 'State of a component',
    //         exercises: 14
    //     }
    // ]

    /* exercises 1.5 */
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            }
        ]
    }


    return (
        /* exercises 1.1-1.2 */
        // <div>
        //     <Header course={course} />
        //     <Content part1={part1.name} exercises1={part1.exercises} part2={part2.name} exercises2={part2.exercises} part3={part3.name} exercises3={part3.exercises} />
        //     <Total  exercises1={part1.exercises} exercises2={part2.exercises} exercises3={part3.exercises}/>
        // </div>

        /* exercises 1.3 */
        // <div>
        //     <Header course={course} />
        //     <Content part1={part1} part2={part2}  part3={part3} />
        //     <Total  exercises1={part1.exercises} exercises2={part2.exercises} exercises3={part3.exercises}/>
        // </div>

        /* exercises 1.4 */
        // <div>
        //     <Header course={course} />
        //     <Content parts={parts} />
        //     <Total  parts={parts} />
        // </div>

        /* exercises 1.5 */
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total  parts={course.parts} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
