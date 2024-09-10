import React, { useState } from 'react';

function Questionario() {
  const [matricula, setMatricula] = useState('');
  const [nome, setNome] = useState('');
  const [respostas, setRespostas] = useState({});
  const [feedback, setFeedback] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [resultado, setResultado] = useState(null);

  const perguntas = [
    {
      id: 1,
      tipo: 'multiplaEscolha',
      texto: '<h1>Questão 1</h1>Em css, para definir a cor de um texto usamos:',
      respostaCerta: 'c',
      opcoes: {
        a: 'text-color: red;',
        b: 'font-color: red;',
        c: 'color: red;',
        d: 'background-color: red;',
      },
      explicacao: {
        a: 'Este comando não existe no CSS.',
        b: 'Este comando não existe no CSS.',
        c: 'color: red - Altera a cor da fonte.',
        d: 'Este comando muda a cor de fundo.',
      },
    },
    {
      id: 2,
      tipo: 'certoErrado',
      texto:
        '<h1>Questão 2</h1>Para usarmos css no html, podemos usá-lo diretamente no html, ou referência-lo, mas não podemos usar os dois ao mesmo tempo.',
      respostaCerta: 'errado',
      explicacao:
        'Em css podemos sim, usá-lo referencialmente e diretamente no HTML ao mesmo tempo.',
    },
    {
      id: 3,
      tipo: 'multiplaEscolha',
      texto:
        '<h1>Questão 3</h1>Qual o resultado do código em JS? <br />var carros = ["Banana", "Mamão", "Uva"]; <br />console.log(carros.push("Uno"));',
      respostaCerta: 'b',
      opcoes: {
        a: '["Banana", "Mamão", "Uva", "Melancia"]',
        b: '4',
        c: '["Banana", "Mamão"]',
        d: '["Uva"]',
      },
      explicacao: {
        a: '["Banana", "Mamão", "Uva", "Melancia"] - Este é o estado do array após o push, mas o método push retorna o comprimento do array.',
        b: '4 - O método push adiciona um item ao array e retorna o novo comprimento do array, que é 4.',
        c: '["Banana", "Mamão"] - Esse é o estado do array antes do push.',
        d: '["Uva"] - Este seria o resultado de pop( ).',
      },
    },
    {
      id: 4,
      tipo: 'certoErrado',
      texto:
        '<h1>Questão 4</h1>De acordo com a Meta, o React é uma biblioteca opensource que cria interfaces de usuário com JavaScript.',
      respostaCerta: 'certo',
      explicacao:
        'O React é mantido pela Meta (antiga Facebook) e é usado para construir interfaces de usuário.',
    },
    {
      id: 5,
      tipo: 'multiplaEscolha',
      texto:
        '<h1>Questão 5</h1>Qual o resultado do código em js? <br />console.log(2 = 2); <br />console.log(2 == "2"); <br />console.log(2 === "2");',
      respostaCerta: 'd',
      opcoes: {
        a: 'false, true, false;',
        b: 'boolean, number, number',
        c: '2 , "2", 2',
        d: 'erro, true , false',
      },
      explicacao: {
        a: 'O primeiro console.log gera um erro.',
        b: 'Estes são os tipos(typeOf), não o que  console imprimiria',
        c: 'O console.log( ) não mostrará numeros, e sim seus resultados em booleanos.',
        d: 'O primeiro console.log( ) gera um erro, os outros são comparações de igualdade e estrita.',
      },
    },
  ];

  const handleOptionChange = (event, perguntaId) => {
    const respostaSelecionada = event.target.value;
    setRespostas({
      ...respostas,
      [perguntaId]: respostaSelecionada,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitAttempted(true);

    const todasRespondidas = perguntas.every((pergunta) =>
      respostas.hasOwnProperty(pergunta.id)
    );

    if (!nome || !matricula) {
      alert('Por favor, preencha o nome e a matrícula antes de enviar.');
      return;
    }

    if (!todasRespondidas) {
      alert('Por favor, responda todas as perguntas antes de enviar.');
      return;
    }

    let novoFeedback = {};
    let corretas = 0;
    let erradas = 0;

    perguntas.forEach((pergunta) => {
      const respostaSelecionada = respostas[pergunta.id];
      const respostaCorreta = pergunta.respostaCerta;

      if (respostaSelecionada === respostaCorreta) {
        corretas++;
      } else {
        erradas++;
      }

      if (pergunta.tipo === 'multiplaEscolha') {
        const explicacaoCorreta = pergunta.explicacao[respostaCorreta];
        const explicacaoSelecionada = respostaSelecionada
          ? pergunta.explicacao[respostaSelecionada]
          : '';

        novoFeedback[pergunta.id] =
          respostaSelecionada === respostaCorreta
            ? `<p style="color: green;">Acertou! ${explicacaoCorreta}</p>`
            : `<p style="color: red;">Errou! ${explicacaoSelecionada}</p>`;
      } else if (pergunta.tipo === 'certoErrado') {
        novoFeedback[pergunta.id] =
          respostaSelecionada === respostaCorreta
            ? `<p style="color: green;">Acertou! ${pergunta.explicacao}</p>`
            : `<p style="color: red;">Errou! ${pergunta.explicacao}</p>`;
      }
    });

    setFeedback(novoFeedback);
    setResultado({
      nome,
      matricula,
      corretas,
      erradas,
    });
  };

  return (
    <div className="formulario">
      <form onSubmit={handleSubmit}>
        <div className="header">
          <h1>Teste frontend</h1>
          <label id="box">
            Nome
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              placeholder="Digite seu nome"
            />
          </label>
          <label id="box">
            Matrícula
            <input
              type="number"
              value={matricula}
              onChange={(e) => setMatricula(e.target.value)}
              required
              placeholder="Digite sua matrícula"
            />
          </label>
          <p>
            Responda o seguinte formulário abaixo, contendo 5 questões com o
            conteúdo do nosso curso de Frontend.
          </p>
        </div>
      </form>
      <form onSubmit={handleSubmit}>
        {perguntas.map((pergunta) => (
          <div key={pergunta.id}>
            <p dangerouslySetInnerHTML={{ __html: pergunta.texto }} />
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
                      onChange={(event) =>
                        handleOptionChange(event, pergunta.id)
                      }
                    />
                    {value}
                  </label>
                ))}
              </>
            )}
            {submitAttempted && !respostas[pergunta.id] && (
              <p style={{ color: 'red' }}>Por favor, responda esta pergunta.</p>
            )}
            {feedback[pergunta.id] && (
              <div
                dangerouslySetInnerHTML={{
                  __html: feedback[pergunta.id],
                }}
              />
            )}
          </div>
        ))}
        <button type="submit">Enviar</button>
        {resultado && (
          <div>
            <h2>Resultado</h2>
            <p>Nome: {resultado.nome}</p>
            <p>Matrícula: {resultado.matricula}</p>
            <p style={{ color: 'green' }}>Acertou: {resultado.corretas}</p>
            <p style={{ color: 'red' }}>Errou: {resultado.erradas}</p>
          </div>
        )}
      </form>
    </div>
  );
}

export default Questionario;
