import React, { useState, useEffect, useCallback } from "react"
import firebaseActions from "../libs/firebaseActions"
import AddEditItemForm from "./addEditForm";
import Notification from './notification';

const FORM_MODE = {
    ADD: 'add',
    EDIT: 'edit'
};

export default () => {

    const [players, setPlayers] = useState([]);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [formMode, setFormMode] = useState(FORM_MODE.ADD)
    const [notification, setNotification] = useState({ title: '', message: '' })

    useEffect(() => {
        firebaseActions.getPlayers((res) => {
            setPlayers(res);
        });
        return () => {
            firebaseActions.unsubcribe();
        }
    }, []);

    const onSuccessHandler = useCallback((mode, player) => {
        if (mode = FORM_MODE.EDIT) {
            setNotification({
                title: "UPDATE SUCCESS!", message: `Player ${player.name} has been updated`
            });
        } else {
            setNotification({
                title: "ADD SUCCESS!", message: `A Player ${player.name}  has been added`
            });
        }
        setFormMode(FORM_MODE.ADD);
        setSelectedPlayer({ playerName: '', jersey: '', position: '', team: '' });
    }, []);

    const onDeleteHandler = useCallback((player) => {
        firebaseActions.deletePlayer(player.id, () => {
            setNotification({
                title: "DELETE SUCCESS!", message: `Player ${player.name} has been deleted`
            });
        })
    }, []);

    const onErrorHandler = useCallback((message) => {
        setNotification({
            title: "ERROR!", message, type: 'error'
        });
    }, []);

    const onEditHandler = useCallback((player) => {
        window.scrollTo(0, 0);
        setFormMode(FORM_MODE.EDIT)
        setSelectedPlayer(player);
    }, []);

    return (
        <>
            {!!notification.message && <Notification {...notification} />}
            <AddEditItemForm onSuccess={onSuccessHandler} onError={onErrorHandler} data={selectedPlayer} mode={formMode} />
            <table className="table-auto">
                <thead>
                    <tr>
                        <th className="px-4 py-2"></th>
                        <th className="px-4 py-2">Team</th>
                        <th className="px-4 py-2">Player Name</th>
                        <th className="px-4 py-2">Jersey</th>
                        <th className="px-4 py-2">Position</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        (players).map((item, key) => (
                            <tr key={key}>
                                <td className="border px-4 py-2">{key + 1}</td>
                                <td className="border px-4 py-2">{item.team}</td>
                                <td className="border px-4 py-2">{item.playerName}</td>
                                <td className="border px-4 py-2">{item.jersey}</td>
                                <td className="border px-4 py-2">{item.position}</td>
                                <td className="border px-4 py-2">
                                    <button
                                        onClick={() => onEditHandler(item)}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-4 rounded">Edit</button>
                                    <button
                                        onClick={() => onDeleteHandler(item)}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" >
                                        Delete
                                    </button>
                                </td>

                            </tr>
                        ))
                    }
                </tbody>
            </table>

        </>
    )
}