import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <h1>Formulário Frontend 2BB</h1>
      <div class="questoes">
        <h2>Seus dados</h2>
        <p>Nome</p>
          <input type="text" class="textarea" />
        <p>Matrícula</p>
          <input type="text" class="textarea"/>
      </div>
      <div class="questoes">
        <h1>Questão 1</h1>
        <h2> Para usarmos css podemos usá-lo diretamente no html, ou referência-lo, mas não podemos usar os dois ao mesmo tempo.</h2>
        <p>Certo</p>
        <input type="radio" class="textarea" />
        <p>Errado</p>
        <input type="radio" class="textarea"/>
      </div>

    </>
  )
}

export default App