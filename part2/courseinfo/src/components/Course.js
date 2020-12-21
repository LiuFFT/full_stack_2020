import React from 'react';

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

export default Courses