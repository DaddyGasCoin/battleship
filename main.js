import { ship, gameboard, player } from "./script.js"

const container = document.querySelector('.gameboard-container')
const container_2 = document.querySelector('.gameboard-2')
for (let index = 0; index < 100; index++) {
    const div = document.createElement('button')
    const div2 = document.createElement('button')
    div.classList.add('box')
    div2.classList.add('box')
    div.setAttribute('id', index)
    div2.setAttribute('id', (index + 100))
    div.disabled = true
    container.appendChild(div)
    container_2.appendChild(div2)

}

const boxs = document.querySelectorAll('.box')


let x = ship([1, 2, 3], 3)
let new_ship = ship([116, 117, 118], 3)
let UserBoard = gameboard()
let CPUBoard = gameboard()
let User = player(CPUBoard)
let CPU = player(UserBoard)
UserBoard.setShip(x)
CPUBoard.setShip(new_ship)


boxs.forEach(box => {
    box.addEventListener('click', () => {
        const position = box.id
        box.disabled = true
        User.placeAtk(position)
        CPU.placeAtk(CPU.randomAtk())

    })
});



