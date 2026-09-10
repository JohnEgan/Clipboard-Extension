import { useState, useEffect } from 'react'

function CopyMode({categories, segments, onCopy}) {

    const [catIndex, setCatIndex] = useState(0);
    const [segIndex, setSegIndex] = useState(0)

    const currentCat = categories[catIndex];
    const currentSegs = segments.filter(seg => seg.category === currentCat);
    useEffect(() => {

        function handleKey(e){

            //TODO: s || arrowkey?
            if(e.key === 's' && currentSegs.length > 0) {
                e.preventDefault();
                //go through this later 
                setSegIndex(i => (i + 1) % currentSegs.length);
            } else if(e.key === 'w' && currentSegs.length > 0) {
                e.preventDefault();
                setSegIndex(i => (i - 1 + currentSegs.length) % currentSegs.length);
            //TODO: shit+tab for backwards?
            } else if(e.key === 'Tab'){
                e.preventDefault();
                setCatIndex(i => (i + 1) % categories.length);
                //currentCat = categories[catIndex]
                //currentSegs = segments.filter(seg => seg.category === currentCat);
                setSegIndex(0);
            }else if(e.key === 'Enter' && currentSegs.length > 0){
                e.preventDefault();
                navigator.clipboard.writeText(currentSegs[segIndex].value)
                onCopy();
            }
            
        }
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey)
    }, [catIndex, categories, segments, segIndex])

    if(!currentSegs[segIndex]){
        return <div>No Data Yet Switch To Edit mode</div>
    }

    return(
        <div className="copy-view">
            <div className="copy-cat">{currentCat}</div>
            <div className="copy-value">{currentSegs[segIndex].value}</div>
        </div>
    )
}

export default CopyMode

