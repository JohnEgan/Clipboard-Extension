import { useState } from 'react'
import CategoryBlock from './CategoryBlock';

function EditMode({ categories, segments, onAdd, onRemove, onAddCategory, onDeleteCategory}){

    const [userInputCategory, setUserInputCategory] = useState('');


    return(
        <div>
            <h1>Edit mode</h1>
            {
                categories.map(cat => (

                <CategoryBlock
                    key = {cat}
                    category = {cat}
                    segments = {segments.filter(seg =>seg.category === cat)}
                    onAdd={onAdd}
                    onRemove={onRemove}
                    onDeleteCategory={onDeleteCategory}
                />

                
                ))
            }
            <div>
                <input
                value={userInputCategory}
                onChange={e => setUserInputCategory(e.target.value)}
                placeholder="Category"
                />
                <button onClick={() => onAddCategory(userInputCategory)}>Add Category</button>
            </div>
        </div>
    )
}

export default EditMode;