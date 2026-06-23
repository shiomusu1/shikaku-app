import { useState } from 'react'
import './Battle1.css'
import questions from '../data/battle1'

function Battle1() {

  const quiz = questions[0]

  const [result, setResult] = useState('')

  function answer(num) {

    if (num === quiz.answer) {
      setResult("正解！")
    }
    else {
      setResult("不正解！")
    }

  }

  return (
    <div className="game">
      <h1>テスト</h1>

      <img
        src="/image/zakokyara.jpg"
        className="enemy-img"
        alt="敵キャラクター"
      />

      <div className="enemy-name">
        {quiz.title}
      </div>

      <div className="question">
        {quiz.question}
      </div>

      <div className="choices">
        {quiz.choices.map((choice, index) => (
    <button
      key={index}
      className="choice-btn"
      onClick={() => answer(index)}
    >
      {choice}
    </button>
  ))}
</div>

      <h2>{result}</h2>

    </div>
  )
}

export default Battle1