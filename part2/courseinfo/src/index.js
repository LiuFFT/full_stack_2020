import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ course }) => {
    return (
        <h2>{course.name}</h2>
    )
}

const Total = ({ course }) => {
    const parts_list = course.parts.map(part => part.exercises)
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const total = parts_list.reduce(reducer,0)

    return(
        <h4>total of {total} exercises</h4>
    )
}

const Part = (prop) => {
    return (
        <p>
            {prop.name} {prop.exercises}
        </p>
    )
}

const Content = ({ course }) => {
    const part_list = course.parts.map((p) => {
        return <Part key={p.id} name={p.name} exercises={p.exercises} />
    })

    return (
        <div>
            {part_list}
        </div>
    )
}

const Course = ({course}) => {
    return (
        <div>
            <h1>Web development curriculum</h1>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
        </div>
    )
}

const Courses = ({ courses }) => {
    const cs = courses.map((course) => {
        return <Course key={course.id} course={course}/>
    })

    return cs
}

const App = () => {
    const courses = [
        {
            name: 'Half Stack application development',
            id: 1,
            parts: [
                {
                    name: 'Fundamentals of React',
                    exercises: 10,
                    id: 1
                },
                {
                    name: 'Using props to pass data',
                    exercises: 7,
                    id: 2
                },
                {
                    name: 'State of a component',
                    exercises: 14,
                    id: 3
                },
                {
                    name: 'Redux',
                    exercises: 11,
                    id: 4
                }
            ]
        },
        {
            name: 'Node.js',
            id: 2,
            parts: [
                {
                    name: 'Routing',
                    exercises: 3,
                    id: 1
                },
                {
                    name: 'Middlewares',
                    exercises: 7,
                    id: 2
                }
            ]
        }
    ]


    return <Courses courses={courses} />

}

ReactDOM.render(<App />, document.getElementById('root'))