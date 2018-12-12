const assert = require('chai').assert
const boardState = require('../boardState')

const gameState = {
  game: { id: '622216f2-4dc4-4360-ae41-0bbd91b65ed8' },
  turn: 0,
  board:
  {
    height: 5,
    width: 5,
    food: [
      { x: 0, y: 0 },
      {x: 3, y: 0}
    ],
    snakes:
      [
        {
          id: 'db20a95d-454d-46ec-a200-90bc368b994f',
          name: 'test-one',
          health: 100,
          body: [
            { x: 1, y: 0 },
            { x: 2, y: 0 },
            { x: 3, y: 0 }
          ]
        },
        {
          id: '9046af6e-28fc-4ebb-aa0d-3085d9dc896e',
          name: 'test-two',
          health: 100,
          body: [
            { x: 0, y: 2 }, 
            { x: 0, y: 3 }, 
            { x: 0, y: 4 }
          ]
        }
      ]
  },
  you:
  {
    id: 'db20a95d-454d-46ec-a200-90bc368b994f',
    name: 'test-one',
    health: 100,
    body: [
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 3, y: 0 }
    ]
  }
}

const gameStateFormatted = {
  game: { id: '622216f2-4dc4-4360-ae41-0bbd91b65ed8' },
  turn: 0,
  board:
  {
    height: 5,
    width: 5,
    food: [
      { x: 0, y: 0},
      {x: 3, y: 0}
    ],
    snakes:
      [
        {
          id: 'db20a95d-454d-46ec-a200-90bc368b994f',
          name: 'test-one',
          health: 100,
          body: [
            { x: 1, y: 0 },
            { x: 2, y: 0 },
            { x: 3, y: 0 }
          ]
        },
        {
          id: '9046af6e-28fc-4ebb-aa0d-3085d9dc896e',
          name: 'test-two',
          health: 100,
          body: [
            { x: 0, y: 2 }, 
            { x: 0, y: 3 }, 
            { x: 0, y: 4 }
          ]
        }
      ]
  },
  you:
  {
    id: 'db20a95d-454d-46ec-a200-90bc368b994f',
    name: 'test-one',
    health: 100,
    body: [
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 3, y: 0 }
    ]
  },
  parsedBoardPoints: [ { x: 0, y: 0, type: 'food', meal: true },
  { x: 3, y: 0, type: 'food', meal: true },
  { x: 1, y: 0, type: 'you', isCollision: false, part: 'head' },
  { x: 2, y: 0, type: 'you', isCollision: true, part: 'neck' },
  { x: 3, y: 0, type: 'you', isCollision: false, part: 'tail' },
  { x: 0, y: 2, type: 'snake', isCollision: true, part: 'head' },
  { x: 0, y: 3, type: 'snake', isCollision: true },
  { x: 0, y: 4, type: 'snake', isCollision: true, part: 'tail' } ],
  boardArray: [ [ 4, 1, 5, 5, 0 ],
  [ 0, 0, 0, 0, 0 ],
  [ 3, 0, 0, 0, 0 ],
  [ 5, 0, 0, 0, 0 ],
  [ 5, 0, 0, 0, 0 ] ]
}

describe('boardState.parseFood', () => {
  let formattedFood = gameStateFormatted.parsedBoardPoints.filter((point) => point.type === 'food')
  it('Is an array', () => {
    assert.isArray(boardState.parseFood(gameState.board))
  })
  it('Is formatted correctly', () => {
    assert.deepEqual(boardState.parseFood(gameState.board), formattedFood)
  })
})

describe('boardState.parseSnakes', () => {
  const formattedSnakes = gameStateFormatted.parsedBoardPoints.filter((point) => point.type === 'you' || point.type === 'snake')
  it('Is an array', () => {
    assert.isArray(boardState.parseSnakes(gameState))
  })
  it('Is formatted correctly', () => {
    assert.deepEqual(boardState.parseSnakes(gameState), formattedSnakes)
  })
})

describe('boardState.parseBoardPoints', () => {
  it('Is an array', () => {
    assert.isArray(boardState.parseBoardPoints(gameState))
  })
  it('Is formatted correctly', () => {
    assert.deepEqual(boardState.parseBoardPoints(gameState), gameStateFormatted.parsedBoardPoints)
  })
})

describe('boardState.createBoardMap', () => {
  it('Is an array', () => {
    assert.isArray(boardState.createBoardMap(gameStateFormatted.parsedBoardPoints, gameState.board.width, gameState.board.height))
  })
  it('Is formatted correctly', () => {
    assert.deepEqual(boardState.createBoardMap(gameStateFormatted.parsedBoardPoints, gameState.board.width, gameState.board.height), gameStateFormatted.boardArray)
  })
})

describe('boardState.visualize', () => {
  it('Correctly parsed game state and created map visualizer array', () => {
    assert.deepEqual(boardState.visualize(gameState, {addBoard:true}), gameStateFormatted, 'Is correctly formatted')
  })
})