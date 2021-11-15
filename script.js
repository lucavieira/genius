let order = []
let clickedOrder = []
let resultado = []
let score = 0

// 0 - verde
// 1 - vermelho
// 2 - amarrelo
// 3 - azul

const blue = document.querySelector('.blue')
const red = document.querySelector('.red')
const green = document.querySelector('.green')
const yellow = document.querySelector('.yellow')

// cria ordem aleatoria de cores
let shuffleOrder = () => {
  let colorOrder = Math.floor(Math.random() * 4)
  order[order.length] = colorOrder
  clickedOrder = []

  for (let i in order) {
    let elementColor = createColorElement(order[i])
    lightColor(elementColor, Number(i) + 1)
  }
}

//acende a proxima cor
let lightColor = (element, number) => {
  number = number * 1000
  setTimeout(() => {
    element.classList.add('selected')
  }, number - 250)
  setTimeout(() => {
    element.classList.remove('selected')
  }, number)
}

//verifica se os botoes clicados sao os mesmos da ordem gerada
let checkOrder = () => {
  for (let i in clickedOrder) {
    if (clickedOrder[i] != order[i]) {
      gameOver()
      break
    }
  }

  if (clickedOrder.length == order.length) {
    for (let i in order) {
      if (clickedOrder[i] == order[i]) {
        resultado[resultado.length] = clickedOrder[i] == order[i]
      }
    }

    let result = resultado.every(e => e == true)
    if (result) {
      alert(`Pontuação: ${score}\nVocê acertou! Iniciando próximo nivel`)
      nextLevel()
    }
  }
}

//funcao para o clique do usuario
let click = color => {
  clickedOrder[clickedOrder.length] = color
  createColorElement(color).classList.add('selected')

  setTimeout(() => {
    createColorElement(color).classList.remove('selected')
    checkOrder()
  }, 250)
}

//funcao que retorna a cor
let createColorElement = color => {
  if (color == 0) {
    return green
  } else if (color == 1) {
    return red
  } else if (color == 2) {
    return yellow
  } else if (color == 3) {
    return blue
  }
}

// funcao para o proximo nivel do jogo
let nextLevel = () => {
  score++
  shuffleOrder()
}

// funcao para quando o usuario errar a sequencia
let gameOver = () => {
  alert(`Pontuação: ${score}\nGame Over! Ok para um novo jogo`)
}

//funcao para iniciar o jogo
let startGame = () => {
  order = []
  clickedOrder = []
  alert('Bem vindo ao GENIUS')
  score = 0

  nextLevel()
}

green.onclick = () => click(0)
red.onclick = () => click(1)
yellow.onclick = () => click(2)
blue.onclick = () => click(3)
