import { Tablero } from './components/Tablero'
//bg-[url(./assets/fondo.png)] mask- mask-x-from-70% mask-x-to-90%
function App() {
  return (
    <>
      <div className='flex justify-center items-center bg-radial-[at_0%_0%] from-gray-700 to-gray-300 h-full w-full min-h-screen min-w-screen'>
        <Tablero/>
      </div>
    </>
  )
}

export default App
