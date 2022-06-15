import React, {useEffect, useRef, useState} from "react";

function DragAndDrop(props) {
    const [dragging, setDragging] = useState(false);

    const dropRef = useRef();
    let dragCounter = useRef(0);

    useEffect(() => {
        function handleDrag(e) {
            e.preventDefault()
            e.stopPropagation()
        }

        function handleDragIn(e) {
            e.preventDefault()
            e.stopPropagation()
            dragCounter.current++;
            if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
                setDragging(true)
            }
        }

        function handleDragOut(e) {
            e.preventDefault()
            e.stopPropagation()
            dragCounter.current--;
            if (dragCounter.current > 0) return
            setDragging(false)
        }

        function handleDrop(e) {
            e.preventDefault()
            e.stopPropagation()
            setDragging(false)
            if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                props.callback(e.dataTransfer.files)
                e.dataTransfer.clearData()
                dragCounter.current = 0
            }
        }

        let div = dropRef.current;
        div.addEventListener('dragenter', handleDragIn)
        div.addEventListener('dragleave', handleDragOut)
        div.addEventListener('dragover', handleDrag)
        div.addEventListener('drop', handleDrop)
        return (() => {
                div.removeEventListener('dragenter', handleDragIn)
                div.removeEventListener('dragleave', handleDragOut)
                div.removeEventListener('dragover', handleDrag)
                div.removeEventListener('drop', handleDrop)
            }
        )
    }, [props])

    return (
        <div className='counter-field__input-outer' ref={dropRef}>
            {dragging &&
            <div className='counter-field__input__drag-outer'>
                <div className='counter-field__input__drag-inner'>
                    <div>Drop here to upload a file</div>
                </div>
            </div>}
            {props.children}
        </div>
    )
}

export default DragAndDrop