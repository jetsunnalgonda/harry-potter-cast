import './App.css'
import axios from 'axios'
import React, {useState, useEffect} from 'react'
import Header from './components/ui/Header'
import CharacterGrid from './components/characters/CharacterGrid'
import Search from './components/ui/Search'

const App = () => {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [query, setQuery] = useState('')

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true)
      
      const result = await axios(`https://hp-api.onrender.com/api/characters?name=${query}`)

      const filteredItems = result.data.filter(item => item.name.toLowerCase().startsWith(query))
      
      setItems(filteredItems)
      setIsLoading(false)
    }
    fetchItems()

  }, [query])

  // const queryFunction = (q) =>{
  //   setQuery(q)
  // }

  return (
    <div className="container">
      <Header />
      <Search getQuery = {(q) => setQuery(q)} />
      {/* <Search getQuery={queryFunction} /> */}
      <CharacterGrid isLoading={isLoading} items={items} />
    </div>
  )
}

export default App
