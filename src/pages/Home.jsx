import React from 'react'
import CityTable from '../components/CityTable'

const Home = () => {
  return (
    <div>
        <h1 className="text-3xl font-bold underline">Weather Forecast App</h1>
        <CityTable/>
    </div>
  )
}

export default Home