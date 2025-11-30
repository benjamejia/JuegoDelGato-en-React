type props = {
    turno : string
    winner: string | null
    nombreJuego:string
    cronometro: number
    gameStarted : boolean
}

export function Display({turno,winner,nombreJuego, cronometro, gameStarted}:props){
    return(
        <div className="flex w-auto h-1/6 rounded-2xl bg-gray-400 inset-shadow-sm inset-shadow-black">  
            <h1 className={`text-2xl font-arcade text-white text-shadow-lg ${gameStarted ? "hidden" : ""}`}>{nombreJuego}</h1>
            {gameStarted ? 
            <h1>
                {cronometro} + {turno}
            </h1>
            : ""}
            {winner ? <h1>El ganado es: {winner}</h1>:""}    
        </div>
    )
}