import React from 'react';

import Select from 'react-select';
import {useData} from "./Components/DataContext";


function MySelect() {

    const {persons} = useData();
    const personsMapped = persons.map((person) => ({value: person.id, label: person.name}));

    return (
        <>
            <Select
                className="basic-single"
                classNamePrefix="select"
                // defaultValue={colourOptions[0]}
                isClearable={true}
                isSearchable={true}
                // name="color"
                options={personsMapped}
            />
        </>
    );
}

export default MySelect;
