import { useEffect, useState } from "react"
import { Display } from "./Display"
import iconReset from '../assets/reiniciar.png'

export function Tablero(){
    
    const[tablero,setTablero] = useState(Array(9).fill(""))
    const[turno, setTurno] = useState(true)
    const[gameOver,setGameOver] = useState(false)
    const[winner,setWinner] = useState< string | null>(null)
    const[gameStarted,setGameStarted] = useState(false)
    const [tiempo, setTiempo] = useState(0) // Tiempo en segundos
    const [cronometroActivo, setCronometroActivo] = useState(false)
    const[tableroLleno,setTableroLleno] = useState(false)
    const turnoActual = turno ? "x" : "o"
    
    const combinacionesGanadoras = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas  
        [0, 4, 8], [2, 4, 6]             // Diagonales
    ]   

    // Control del cronómetro
    useEffect(() => {
        let intervalo: number | null = null
        
        if (cronometroActivo) {
            intervalo = window.setInterval(() => {
                setTiempo((tiempoAnterior) => tiempoAnterior + 1)
            }, 1000)
        }
        
        return () => {
            if (intervalo) clearInterval(intervalo)
        }
    }, [cronometroActivo])

    // Formatear el tiempo para mostrar
    const formatearTiempo = () => {
        if (tiempo < 60) {
            return `${tiempo}s` // Solo segundos
        } else {
            const minutos = Math.floor(tiempo / 60)
            const segundos = tiempo % 60
            return `${minutos}:${segundos.toString().padStart(2, '0')}`
        }
    }

    //Manejador cuando se llena el tablero
    useEffect(() => {
        const tableroLleno = tablero.every(casilla => casilla !== "")
        if (tableroLleno){
            setGameOver(true)
            setCronometroActivo(false)
            setTableroLleno(true)
        }
    }, [tablero])

    //Manejador del ganador    
    useEffect(() => {
        const currentWinner = verificarGanador()
        if(currentWinner){
            if(currentWinner === "✕"){ setWinner("x")}else{
            setWinner("o")}
            setCronometroActivo(false) // Detener cronómetro cuando hay ganador
        }
    },[tablero])    

    // Controlar inicio del cronómetro cuando el juego comienza
    useEffect(() => {
        if (gameStarted && !cronometroActivo && !winner && !gameOver) {
            setCronometroActivo(true)
        }
    }, [gameStarted, cronometroActivo, winner, gameOver])

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
        setGameStarted(false)
        setTiempo(0)
        setCronometroActivo(false)
        setTableroLleno(false)
    }

    const handleClickTablero = (index: number) => {
        if(tablero[index] || gameOver || winner){ return }

        setGameStarted(true)
        const nuevoTablero = [...tablero]

        if(turno === true){
            nuevoTablero[index] = "✕"
            setTurno(!turno)
        }else{
            nuevoTablero[index] = "○"
            setTurno(!turno)
        } 

        setTablero(nuevoTablero)
    }
    
    return(
        <div className=" flex flex-col gap-6 m-auto shadow-[5px_5px_5px_-1px_rgba(88,88,88,0.8)]  outline-black/10 p-7 rounded-2xl">
            <Display 
                turno={turnoActual} 
                winner={winner} 
                nombreJuego="Juego del Gato" 
                cronometro={formatearTiempo()} 
                gameStarted={gameStarted}
                tableroLleno={tableroLleno}
            />
            <img 
                className="size-10 bg-gray-600 rounded-full p-2 hover:bg-gray-500 shadow-[inset_-2px_-3px_0px_-1px_rgba(0,0,0,1)]" 
                src={iconReset} 
                onClick={reinciarJuego} 
                alt="Reiniciar juego"
            />
            <div className=" grid grid-cols-3 grid-rows-3 aspect-square border-4">
                {tablero.map((casilla,index) => (
                    <button 
                        className="flex justify-center items-center text-8xl pb-3 border-2 hover:bg-white/15" 
                        key={index} 
                        value={casilla} 
                        disabled={gameOver} 
                        onClick={() => handleClickTablero(index)}
                    >
                        {casilla}
                    </button>
                ))}
            </div>
        </div>
    )
}