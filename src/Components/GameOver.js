import "./GameOver.css"

import React from 'react'

const GameOver = ({initGame}) => {
  return (
    <div>GameOver
        <button onClick={initGame}>Provisório, game Init</button>
    </div>
  )
}

export default GameOver