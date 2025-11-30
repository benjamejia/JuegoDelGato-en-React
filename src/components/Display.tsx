type props = {
    turno : string
    winner: string | null
    nombreJuego:string
    cronometro: string
    gameStarted : boolean
    tableroLleno: boolean
}

export function Display({ turno, winner, nombreJuego, cronometro, gameStarted,tableroLleno }: props) {
    return (
        <div className="relative w-100 h-32 rounded-2xl inset-shadow-sm inset-shadow-black border border-slate-600 overflow-hidden text-white font-arcade">
            

            <div className="absolute top-0 w-full p-3 grid grid-cols-3 items-start z-10">
                
                <div className="text-left">
                    {gameStarted && !winner && (
                        <span className="text-sm font-bold bg-black/20 px-2 py-1 rounded">
                            {cronometro}
                        </span>
                    )}
                </div>

                <div className="text-center">
                    {gameStarted && !winner && (
                        <span className="text-lg font-bold uppercase tracking-widest">
                            Turno: <span className="text-yellow-300">{turno}</span>
                        </span>
                    )}
                </div>
                <div className="text-right"></div>
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20">
                
                {!gameStarted && (
                    <h1 className="text-2xl font-arcade text-white drop-shadow-md animate-pulse">
                        {nombreJuego}
                    </h1>
                )}
                {tableroLleno && (
                    <div className="bg-black/60 backdrop-blur-sm p-4 rounded-xl border border-white/20 shadow-xl transform scale-110">
                        <h1 className="text-1xl font-arcade text-white text-shadow-lg">
                            ¡Nigun Ganador!
                        </h1>
                    </div>
                )}
                {winner && (
                    <div className="bg-black/60 backdrop-blur-sm p-4 rounded-xl border border-white/20 shadow-xl transform scale-110">
                        <h1 className="text-2xl font-arcade text-green-400 text-shadow-lg">
                            ¡Ganador:{winner}!
                        </h1>
                    </div>
                )}
            </div>
        </div>
    );
}