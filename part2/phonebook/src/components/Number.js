import Person from "./Person";
import React from "react";

const Number = (prop) => {
    return (
        <div>
            <ul>
                {prop.filterPerson.map(person =>
                    <Person key={person.name} name={person.name} phone={person.number}/>
                )}
            </ul>
        </div>
    )
}

export default Number