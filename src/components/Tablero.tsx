import { useEffect, useState } from "react"
import { Display } from "./Display"

export function Tablero(){
    
    const[tablero,setTablero] = useState(Array(9).fill(""))
    const[turno, setTurno] = useState(true)
    const[gameOver,setGameOver] = useState(false)
    const[winner,setWinner] = useState< string | null>(null)
    const turnoActual = turno ? "x" : "o"
    
    
    const combinacionesGanadoras = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas  
        [0, 4, 8], [2, 4, 6]             // Diagonales
    ]   

    //Manejador cuando se llena el tablero
    useEffect(() => {
        const tableroLleno = tablero.every(casilla => casilla !== "")
            if (tableroLleno){
                setGameOver(true)
                }
        }, [tablero])


    //Manejador del ganador    
    useEffect(() => {
        const currentWinner = verificarGanador()
        if(currentWinner){
            setWinner(currentWinner)
        }
    },[tablero])    

    const verificarGanador = () => {
        for(let combinaciones of combinacionesGanadoras){
            const [a,b,c] = combinaciones
            if(tablero[a] !== "" &&
                tablero[a] === tablero[b] &&
                tablero[b] === tablero[c]){
                return tablero[a]
            }
        }
        return null
    }

    const reinciarJuego = () => {
        setTablero(Array(9).fill(""))
        setTurno(true)
        setGameOver(false)
        setWinner(null)
    }

    const handleClickTablero = (index: number) => {
        if(tablero[index] || gameOver || winner){ return }

        const nuevoTablero = [...tablero]

        if(turno === true){
            nuevoTablero[index] = "×"
            setTurno(!turno)
        }else{
            nuevoTablero[index] = "o"
            setTurno(!turno)
        } 

        setTablero(nuevoTablero)

    }
    
    return(
        <div className="flex flex-col justify-center items-center bg-orange-300 rounded-3xl p-5 gap-2.5 border-2 border-t-4 border-l-4 
                border-gray-200 border-t-gray-300 border-l-gray-300
                border-b-gray-600 border-r-gray-600
                shadow-inner">
            <Display turno={turnoActual} winner={winner} nombreJuego="Juego del Gato" cronometro={1} gameStarted={false}/>
            <div className=" bg-amber-100 grid grid-cols-3 grid-rows-3 aspect-square border-2 h-2/3 w-2/3 min-[500px] ">
                {tablero.map((casilla,index) => (
                    <button className="flex justify-center items-center text-5xl border-2 hover:bg-amber-200" key={index} value={casilla} disabled={gameOver} onClick={() => handleClickTablero(index)}>{casilla}</button>
                ))}
            </div>
            <button className="text-3xl text-white bg-orange-500 rounded-2xl p-1 hover:bg-orange-600" onClick={reinciarJuego}> Reiniciar Juego </button>
        </div>
    )
}