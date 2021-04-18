export const updateObject = (oldObject, updatedProperties) => {

    // Updates what parameters that has changed some neat wierd trick.
    return{
        ...oldObject,
        ...updatedProperties
    }
}