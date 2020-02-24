import firebase from './firebase';

export const getPlayers = (onSuccess, collectionName = 'players', ) => {
    firebase
        .firestore()
        .collection(collectionName)
        .onSnapshot(snapshot => {
            onSuccess(snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            })));
        })
}

export const addItem = (item, onSuccess, collectionName = "players") => {
    firebase
        .firestore()
        .collection(collectionName)
        .add(item)
        .then(ref => {
            onSuccess(ref);
        })
}

export const unsubcribe = (onSuccess, collectionName = 'players') => {
    firebase
        .firestore()
        .collection(collectionName)
        .onSnapshot(snapshot => {
            onSuccess(snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            })))
        })
}

export const addPlayer = (body, onSuccess, collectionName = 'players') => {
    firebase
        .firestore()
        .collection(collectionName)
        .add(body)
        .then((res) => {
            onSuccess(res);
        })
}

export const deletePlayer = (id, onSuccess, collectionName = 'players') => {
    firebase
        .firestore()
        .collection(collectionName)
        .doc(id)
        .delete()
        .then((res) => {
            onSuccess(res);
        })
}

export const updatePlayer = (id, body, onSuccess, collectionName = 'players') => {
    firebase
        .firestore()
        .collection(collectionName)
        .doc(id)
        .update(body)
        .then((res) => {
            onSuccess(res);
        })
}




export default {
    getPlayers,
    addItem,
    unsubcribe,
    addPlayer,
    deletePlayer,
    updatePlayer
}