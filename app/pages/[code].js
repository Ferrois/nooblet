import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import { PlayerContext } from '../context/PlayerContext'
import { toastError } from '../utilities/toastResponses'

const Game = () => {
  const router = useRouter()
  const { code } = router.query
  const {socket, userData} = useContext(PlayerContext);
  useEffect(()=>{
    if (!socket) return toastError("Websocket Disconnected");
    socket.emit("")
  },[socket])
  
  return <p>Game: {code}</p>
}

export default Game