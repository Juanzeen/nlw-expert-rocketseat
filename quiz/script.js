const template = document.querySelector('template');

const header = document.querySelector('header');
const main = document.querySelector('main');

const perguntas = [
    {
        pergunta: 1,
        enunciado: "Qual é a saída do seguinte código? console.log(2 + '2' - 1)",
        respostas: [
            "A) 22",
            "B) 3",
            "C) 21"
        ],
        correta: 2
    },
    {
        pergunta: 2,
        enunciado: "O que o método Array.prototype.map() faz?",
        respostas: [
            "A) Adiciona um novo elemento ao final do array.",
            "B) Remove um elemento do array.",
            "C) Aplica uma função a cada elemento do array e retorna um novo array com os resultados."
        ],
        correta: 2
    },
    {
        pergunta: 3,
        enunciado: "Qual é a saída do código a seguir?\nlet x = 1;\nfunction foo() {\n  console.log(x);\n  let x = 2;\n}\nfoo();",
        respostas: [
            "A) 1",
            "B) 2",
            "C) ReferenceError: Cannot access 'x' before initialization"
        ],
        correta: 3
    },
    {
        pergunta: 4,
        enunciado: "O que é uma closure em JavaScript?",
        respostas: [
            "A) Um tipo de estrutura de controle.",
            "B) Um tipo de função que é executada antes das outras funções no código.",
            "C) Uma função que tem acesso ao escopo léxico em que foi definida, mesmo quando é executada fora desse escopo."
        ],
        correta: 3
    },
    {
        pergunta: 5,
        enunciado: "Qual é a saída do seguinte código?\nconsole.log(typeof NaN);",
        respostas: [
            "A) 'number'",
            "B) 'NaN'",
            "C) 'undefined'"
        ],
        correta: 1
    },
    {
        pergunta: 6,
        enunciado: "O que é JSON?",
        respostas: [
            "A) Uma linguagem de programação.",
            "B) Uma forma de escrever comentários em JavaScript.",
            "C) Um formato de dados baseado em texto para representar objetos estruturados."
        ],
        correta: 3
    },
    {
        pergunta: 7,
        enunciado: "Qual é o operador utilizado para concatenar strings em JavaScript?",
        respostas: [
            "A) +",
            "B) -",
            "C) *"
        ],
        correta: 1
    },
    {
        pergunta: 8,
        enunciado: "O que é o DOM em JavaScript?",
        respostas: [
            "A) Um tipo de dado primitivo.",
            "B) Um método para declaração de variáveis.",
            "C) Uma interface de programação que representa documentos HTML e XML como árvores de objetos."
        ],
        correta: 3
    },
    {
        pergunta: 9,
        enunciado: "Qual é a função do operador 'new' em JavaScript?",
        respostas: [
            "A) Criar uma nova instância de uma classe.",
            "B) Acessar elementos de um array.",
            "C) Incrementar um valor numérico."
        ],
        correta: 1
    },
    {
        pergunta: 10,
        enunciado: "O que é o evento 'click' em JavaScript?",
        respostas: [
            "A) Um evento que ocorre quando um elemento é clicado com o botão direito do mouse.",
            "B) Um evento que ocorre quando um elemento é clicado com o botão esquerdo do mouse.",
            "C) Um evento que ocorre quando um elemento é clicado com qualquer botão do mouse."
        ],
        correta: 3
    }
];

const counter = new Set()
const totalQuests = perguntas.length;
const showCorrect = document.querySelector("#acertos-span");



for(const item of perguntas){
    const quizItem = template.content.cloneNode(true);
    quizItem.querySelector("h3").textContent = `${item.pergunta}) ${item.enunciado}`;

    for(let resposta of item.respostas){
        const dt = quizItem.querySelector('dl dt').cloneNode(true);
        dt.querySelector('span').textContent = resposta;
        dt.querySelector('input').setAttribute('name', 'pergunta - '+ perguntas.indexOf(item));
        dt.querySelector('input').value = item.respostas.indexOf(resposta);

        dt.querySelector('input').onchange = (e) =>{
            const itsCorrect =  e.target.value == item.correta;
            counter.delete(item);
            if(itsCorrect) {
                counter.add(item);
                console.log(counter);
            }

            showCorrect.textContent = counter.size + ' de ' + totalQuests;
        }

        quizItem.querySelector('dl').appendChild(dt);
    }

    quizItem.querySelector('dl dt').remove();

    main.appendChild(quizItem);
}





