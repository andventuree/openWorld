import React from 'react'

import { Navbar, SearchBar} from './components'
import Routes from './routes'


const App = () => {
  return (
    <div>
      <Navbar />
      <SearchBar />
      <Routes />
    </div>
  )
}

export default App
