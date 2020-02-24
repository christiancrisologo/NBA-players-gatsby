import React, { useState, useCallback, useEffect } from "react"
import firebaseActions from "../libs/firebaseActions";

const TextFieldControl = ({ label, caption, ...props }) => {
    return (
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"  >
                {label}
            </label>
            <input
                {...props}
                className="appearance-none block w-full  text-gray-700 border   rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-yellow-200" />
            {caption && <p className="text-red-500 text-xs italic">{caption}</p>}
        </div>
    )
}

const SelectOptions = ({ label, caption, options = [], ...props }) => {
    return (
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"  >
                {label}
            </label>
            <div className="relative">
                <select {...props} className="block appearance-none w-full  border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-yellow-200 focus:border-gray-500" id="grid-state">
                    {
                        options.map((opt, key) => (<option key={key} value={opt}>{opt}</option>))
                    }
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
            </div>
        </div>
    )
}

const initialState = {
    playerName: '', jersey: '', position: '', team: ''
};

const AddItemForm = ({ onSuccess, onError, data, mode }) => {

    const [fields, setFields] = useState(initialState);

    useEffect(() => {
        if (mode === 'edit') {
            setFields({ ...data });
            document.getElementById("playerName").focus();
        } else {
            setFields(initialState);
        }
    }, [data]);

    const onChange = useCallback(
        ({ target }) => {
            setFields({ ...fields, [target.name]: target.value })
        },
        [setFields, fields],
    )

    const onSubmit = useCallback(
        () => {
            if (mode === 'edit') {
                const { id, ...updatedItem } = fields;
                firebaseActions.updatePlayer(id, updatedItem, () => onSuccess('update', fields.playerName))
            } else {
                if (fields.playerName) {
                    firebaseActions.addPlayer(fields, () => onSuccess('add', fields.playerName));
                } else {
                    onError('Player name is a required field!')
                }
            }
        }, [fields])

    console.log('#CC : data ', data);

    return (
        <div className=" w-full  px-4 py-4 mb-10    border-t-4 rounded-b px-4 py-3 shadow-md bg-gray-200">
            <div className="flex flex-wrap -mx-3 mb-6">
                <TextFieldControl
                    name='playerName'
                    placeholder='Player Name'
                    caption="This field is required"
                    required={true}
                    onChange={onChange}
                    autoFocus={!!data}
                    id='playerName'
                    value={fields.playerName}
                    type='text'
                />
                <SelectOptions
                    name='team'
                    placeholder='Team'
                    onChange={onChange}
                    value={fields.team}
                    options={[
                        "Utah Jazz",
                        "Miami Heat",
                        "LA Lakers",
                        "Cleveland Cavs"
                    ]}
                />
                <TextFieldControl
                    name='jersey'
                    placeholder='Jersey No'
                    onChange={onChange}
                    value={fields.jersey}
                    type='text'
                />
                <SelectOptions
                    name='position'
                    placeholder='Position'
                    onChange={onChange}
                    value={fields.position}
                    options={[
                        "Center",
                        "Power forward",
                        "Small forward",
                        "Shooting guard",
                        "Point guard"
                    ]}
                />

            </div>
            <button onClick={onSubmit}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                {mode === 'edit' ? 'UPDATE PLAYER' : 'ADD PLAYER'}
            </button>


        </div >)
}

export default AddItemForm;