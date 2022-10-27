import { useRouter } from 'next/router'

const Game = () => {
  const router = useRouter()
  const { code } = router.query
  
  return <p>Game: {code}</p>
}

export default Game