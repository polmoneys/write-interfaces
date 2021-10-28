import { useEffect, useRef } from 'react';

/**

const wasEditing = usePrevious(isEditing);

useEffect(() => {
    if (!wasEditing && isEditing) {
        editFieldRef.current.focus();
    }
    if (wasEditing && !isEditing) {
        editButtonRef.current.focus();
    }
}, [wasEditing, isEditing]);

 */

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

export default usePrevious;
