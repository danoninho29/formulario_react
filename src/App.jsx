import React, { useState } from 'react';

function QuestionarioCertoErrado() {
  // Lista de perguntas e respostas corretas
  const perguntas = [
    {
      id: 1,
      tipo: 'multiplaEscolha',
      texto: 'Em css, para definir a cor de um texto usamos:',
      respostaCerta: 'c',
      opcoes: {
        a: 'text-color: red;',
        b: 'font-color: red;',
        c: 'color: red;',
        d: 'background-color: red;',
      },
    },

    {
      id: 2,
      tipo: 'certoErrado',
      texto:
        'Para usarmos css no html, podemos usá-lo diretamente no html, ou referência-lo, mas não podemos usar os dois ao mesmo tempo.',
      respostaCerta: 'errado',
      explicação:
        'Em css podemos sim, usa-lo referencialmente e direto no html ao mesmo tempo.',
    },

    {
      id: 3,
      tipo: 'multiplaEscolha',
      texto:
        'Qual o resultado so código em js? var carros = [ Porsche,Honda,BMW] console.log(carros.push(Uno));',
      respostaCerta: 'b',
      opcoes: {
        a: '["Porsche", "Honda", "BMW", "Uno"]',
        b: '4',
        c: '["Porsche", "Honda"]',
        d: '["BMW"]',
      },
    },

    {
      id: 4,
      tipo: 'certoErrado',
      texto:
        'De acordo a META, o react é uma biblioteca open-source que cria interfaces de usuário com JavaScript.',
      respostaCerta: 'certo',
    },

    {
      id: 5,
      tipo: 'multiplaEscolha',
      texto: 'Qual é a capital da Alemanha?',
      respostaCerta: 'c',
      opcoes: {
        a: 'false, true, false',
        b: 'boolean, number, number',
        c: '2 , "2", 2',
        d: 'erro, true , false',
      },
    },
  ];

  const [respostas, setRespostas] = useState({});
  const [feedback, setFeedback] = useState({});

  const handleOptionChange = (event, perguntaId) => {
    const respostaSelecionada = event.target.value;
    setRespostas({
      ...respostas,
      [perguntaId]: respostaSelecionada,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let novoFeedback = {};

    perguntas.forEach((pergunta) => {
      if (respostas[pergunta.id] === pergunta.respostaCerta) {
        novoFeedback[pergunta.id] = 'Correto!';
      } else {
        novoFeedback[pergunta.id] = 'Errado';
      }
    });

    setFeedback(novoFeedback);
  };

  return (
    <form onSubmit={handleSubmit}>
      {perguntas.map((pergunta) => (
        <div key={pergunta.id}>
          <p>{pergunta.texto}</p>
          {pergunta.tipo === 'certoErrado' ? (
            <>
              <label>
                <input
                  type="radio"
                  value="certo"
                  checked={respostas[pergunta.id] === 'certo'}
                  onChange={(event) => handleOptionChange(event, pergunta.id)}
                />
                Certo
              </label>
              <label>
                <input
                  type="radio"
                  value="errado"
                  checked={respostas[pergunta.id] === 'errado'}
                  onChange={(event) => handleOptionChange(event, pergunta.id)}
                />
                Errado
              </label>
            </>
          ) : (
            <>
              {Object.entries(pergunta.opcoes).map(([key, value]) => (
                <label key={key}>
                  <input
                    type="radio"
                    value={key}
                    checked={respostas[pergunta.id] === key}
                    onChange={(event) => handleOptionChange(event, pergunta.id)}
                  />
                  {value}
                </label>
              ))}
            </>
          )}
          {feedback[pergunta.id] && <p>{feedback[pergunta.id]}</p>}
        </div>
      ))}
      <button type="submit">Enviar</button>
    </form>
  );
}

export default QuestionarioCertoErrado;
