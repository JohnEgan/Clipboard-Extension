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
  setTimeout(() => setCopied(false), 750)
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

