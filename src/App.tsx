import './App.css'
import { Permutacion } from './Components/Puermutacion/Permutacion'
import { Transpocision } from './Components/Transposicion/Transpocision'

function App() {

  return (
    <div className='min-h-screen bg-red-600'>
      <Transpocision />
      <Permutacion />
    </div>
  )
}

export default App
