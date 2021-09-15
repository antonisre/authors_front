import React from 'react';
import { AiFillEdit, AiFillCheckCircle } from 'react-icons/ai';
import { GiCancel } from 'react-icons/gi';

const toggleEditing = (event) => {
    for (let i = 0; i < event.target.length; i++) {
        if (event.target[i].type == "text") event.target[i].disabled = !event.target[i].disabled
    }
}

const createApiBody = (event) => {
    const params = {};
    for (let i = 0; i < event.target.length; i++) {
        if (event.target[i].type == "text" && event.target[i].value) params[event.target[i].id] = event.target[i].value
    }
    return params;
}

export default function EditableList(props): React.ReactElement {
    let status = null;
  
    const submitActions = async (event) => {
        event.preventDefault()
        
        if (status == "edit") { //clicked button toggle editing
            toggleEditing(event);
        } else if (status == "submit") { //clicked button update

            const bodyParams = createApiBody(event)
            await props.onSubmitFunc(bodyParams, event.target.id);
            toggleEditing(event);
        } else { //clicked button delete user

            await props.onDeleteFunc(event.target.id)
            props.updateEntities(previous => previous.filter(element => { return element.id != event.target.id }));
        } 
    }
    console.log("my book",props.entities)
    return(
        <div>
            {props?.entities?.map((entity) => {
                if (entity.id) {
                    return <form onSubmit={submitActions} id={entity.id}>
                    {Object.keys(entity).map(entityKey => {
                        if (entityKey !== "id" && entityKey !== "author") {
                            return <input type="text" id={entityKey} placeholder={entity[entityKey]} disabled={true} />
                        }
                    })}
                    <button type="submit" onClick={() => { status = "edit" }} title="Toggle editing">
                        <AiFillEdit />
                    </button>
                    <button type="submit" onClick={() => { status = "submit" }} title="Update user">
                        <AiFillCheckCircle />
                    </button>
                    <button type="submit" onClick={() => { status = "delete" }} title="Delete user">
                        <GiCancel />
                    </button>
                </form>
                }
            })}
        </div>
    )
}