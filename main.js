import { ship, gameboard, player } from "./script.js"
import { randomShip1 } from "./random.js"

const startBtn = document.querySelector('.start')

startBtn.addEventListener('click', () => {
    const mainpage = document.querySelector('.main')
    const gameContainer = document.querySelector('.container')
    mainpage.style.display = 'none'
    gameContainer.style.display = 'flex'

    startgame()
})
const display = document.querySelector('.winner-display')
const displayWinner = function (winner) {

    const winnername = document.querySelector('.winner-name')
    winnername.textContent = `${winner} wins`
    display.style.display = 'block'

}
const startgame = function () {
    const container = document.querySelector('.gameboard-container')
    const container_2 = document.querySelector('.gameboard-2')
    for (let index = 0; index < 100; index++) {
        const div = document.createElement('button')
        const div2 = document.createElement('button')
        div.classList.add('box')
        div2.classList.add('box', 'user')
        div.setAttribute('id', index)
        div2.setAttribute('id', (index + 100))
        container.appendChild(div)
        container_2.appendChild(div2)

    }

    const shipslength = [5, 4, 3, 3, 2, 2, 1]
    const boxs = document.querySelectorAll('.user')
    const boardarr = (Array.from(Array(100).keys()))
    let usedCoord = []
    const getRandom = function () {
        const rand = boardarr[Math.floor(Math.random() * boardarr.length)]
        return rand
    }


    let blockeditems = []

    //Block ships being placed parrallel to other ships
    const blockedcoord = function (arr, type) {

        if (type) {
            arr.forEach(element => {
                if (element == arr[0]) {
                    blockeditems.push(element - 10)
                }
                if (element == arr.slice(-1)) {
                    blockeditems.push(element + 10)
                }
                blockeditems.push(element + 1, element - 1)
            })
        }
        else {
            arr.forEach(element => {
                if (element == arr[0]) {
                    blockeditems.push(element - 1)
                }
                if (element == arr.slice(-1)) {
                    blockeditems.push(element + 1)
                }
                blockeditems.push(element + 10, element - 10)
            })
        }
        const filter = blockeditems.filter((item) => {
            if (item >= 1 && item < 100) {
                return true
            }
        })
        usedCoord.push(...filter)
    }

    const randomShip = (length) => {

        const type = Math.random() < 0.2 //chance for ship being placed horizonatally

        let start = getRandom()
        let coord = boardarr.slice(start, (start + length))
        let flag = false
        if (coord.some(el => el >= 99)) {
            return randomShip(length)
        }

        //coord for horizontal coordinates
        const linecoord = function (start, length) {
            const out = []
            let val;
            for (let index = 1; index <= length; index++) {
                if (start > 50) {
                    val = start - (index * 10)
                }
                else {
                    val = start + (index * 10)
                }

                out.push(val)
            }
            return out
        }

        if (type) {
            coord = linecoord(start, length)
        }

        coord.forEach(element => {
            if (usedCoord.includes(element)) {
                flag = true
            }
        })
        coord.slice(0, -1).forEach(element => {
            if ((element + 1) % 10 == 0) {
                flag = true
            }
        })

        //validation for generating valid coordiantes
        if (flag) {
            return randomShip(length)
        }
        else {
            blockedcoord(coord, type)
            usedCoord.push(...coord)
            return coord
        }

    }

    let UserBoard = gameboard()
    let CPUBoard = gameboard()
    let User = player(CPUBoard)
    let CPU = player(UserBoard)

    for (let index = 0; index < shipslength.length; index++) {
        const x = ship(randomShip1(shipslength[index]), shipslength[index])
        CPUBoard.setShip(x)
    }

    const random = document.querySelector('.random')
    random.addEventListener('click', () => {
        UserBoard.newBoard()
        UserBoard = gameboard()
        CPU = player(UserBoard)
        usedCoord = []
        blockeditems = []
        for (let index = 0; index < shipslength.length; index++) {
            const y = ship(randomShip(shipslength[index]), shipslength[index])
            UserBoard.setShip(y)
        }
    })


    boxs.forEach(box => {
        box.addEventListener('click', () => {
            const position = box.id
            box.disabled = true
            User.placeAtk(position)
            if (UserBoard.isGameOver()) {
                displayWinner('CPU')
            }
            CPU.placeAtk(CPU.randomAtk())
            if (CPUBoard.isGameOver()) {
                displayWinner('USER')
            }
        })
    });

    const begin = document.querySelector('.begin')
    begin.addEventListener('click', () => {
        begin.parentElement.style.display = 'none'
        random.parentElement.style.display = 'none'
        container_2.style.display = 'grid'
        CPUBoard.newBoard()

    })


}

