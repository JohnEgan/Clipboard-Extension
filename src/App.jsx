import { useState, useEffect } from 'react'
import './App.css'
import EditMode from '../components/EditMode';
import CopyMode from '../components/CopyMode';

function App() {

  const [segments, setSegments] = useState([])
  
  const [copied, setCopied] = useState(false)

  const [loaded, setLoaded] = useState(false);

  const [categories, setCategories] = useState([]);
  
  //have this be a const value??
  const [appState, setAppState] = useState("copy");

  //takes in two values from the category now?
  function addUserTextInputToList(cat, label, value) {
      if(!label || !value){
        return;
      }

      const newSegment = {id: crypto.randomUUID(), label: label, value: value, category: cat}

      //TODO
      //this is a dunb way of saving these to fetch them to render
      //you cant easily traverse them 
      // use an array of objects for the category
      // {categoryName: "name", segmentArray: null}
      setSegments([...segments, newSegment])

  }

  function deleteCategory(categoryName){
    setCategories(prev => prev.filter(c => c !== categoryName))
    setSegments(prev => prev.filter(seg => seg.category !== categoryName))
  }

  function addCategoryToList(categoryNameToAdd){
    if(!categoryNameToAdd){
      return;
    }
    setCategories([...categories, categoryNameToAdd])
  }

  function removeSegment(idToRemove){
    setSegments(prev => prev.filter(segment => segment.id !== idToRemove))
  }

  useEffect(() => {
    chrome.storage.local.get(['segments', 'categories']).then(result => {
      if(result.segments){
        setSegments(result.segments)
      }
      if(result.categories){
        setCategories(result.categories)
      }
      setLoaded(true)
    })
  }, [])

  useEffect(() => {
    if (!loaded) return
    chrome.storage.local.set({segments})
  }, [segments, loaded])

  useEffect(() => {
    if (!loaded) return
    chrome.storage.local.set({categories})
  }, [categories, loaded])

function switchAppState(){
  setAppState(appState === 'edit' ? 'copy' : 'edit')
}

function onCopy(){
  setCopied(true);
  setTimeout(() => window.close(), 500)
}

  return (
    <div className="deck">
      <button onClick={() => switchAppState()}>Switch State</button>
      {copied && <div className="copied">Copied!</div>}
      {appState === 'edit'
        ? <EditMode
          categories={categories}
          segments={segments}
          onAdd={addUserTextInputToList}
          onRemove={removeSegment}
          onAddCategory={addCategoryToList}
          onDeleteCategory={deleteCategory}
        />
        : <CopyMode
          categories={categories}
          segments={segments}
          onCopy={onCopy}
        />
      }
    </div>
  )
}

export default App


/*

<h1>Copy Extension Thing</h1>
      {copied && <div className="copied">Copied!</div>}
      <ul className="segment-list">
        {categoryNames.map(cat => (
          <li key={cat}>
            <div className='category-header'>{cat}</div>
            <ul>
              {segments
              .filter(seg =>seg.category === cat)
              .map(seg => (
              <li 
                key={seg.id} 
                className="segment" 
                onClick={() => {
                navigator.clipboard.writeText(seg.value)
                setCopied(true)
                setTimeout(() => window.close(), 500)
              }}>
                <span className="label">{seg.label}</span>
                <span className="preview">{seg.value}</span>
                <button onClick={() => removeSegment(seg.id)}>Delete</button>
              </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <div>
        <input
          value={userInputCategory}
          onChange={e => setUserInputCategory(e.target.value)}
          placeholder="Category"
        />
        <input
          value={userInputLabel}
          onChange={e => setUserInputLabel(e.target.value)}
          placeholder="Label"
        />
        <textarea
          value={userInputValue}
          onChange={e => setUserInputValue(e.target.value)}
          placeholder="Paste Text Here"
        />
        <button onClick={addUserTextInputToList}>Add To List</button>
      </div>
      <div className="hint">↑↓ to move · Enter to copy</div>

*/