

let boardarr = (Array.from(Array(100).keys()))
boardarr = boardarr.map((x) => x + 100)
let usedCoord = []
let boardarr2 = (Array.from(Array(100).keys()))

const getRandom = function () {
    const rand = boardarr2[Math.floor(Math.random() * boardarr.length)]
    return rand
}

//Block ships being placed parrallel to other ships
const blockedcoord = function (arr, type) {
    let blockeditems = []
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
        if (item >= 100 && item < 200) {
            return true
        }
    })
    usedCoord.push(...filter)
}

const randomShip1 = (length) => {
    const type = Math.random() < 0.2

    let start = getRandom()

    let coord = boardarr.slice(start, (start + length))
    let flag = false
    if (coord.some(el => el >= 199)) {
        return randomShip1(length)
    }

    //coordinates for horizontal function
    const linecoord = function (start, length) {
        const out = []
        let val;
        for (let index = 1; index <= length; index++) {
            if (boardarr[start] > 150) {
                val = boardarr[start] - (index * 10)
            }
            else {
                val = boardarr[start] + (index * 10)
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
        if ((element.toString().slice(-1)) == 9) {
            flag = true
        }
    })

    if (flag) {
        return randomShip1(length)
    }
    else {
        blockedcoord(coord, type)
        usedCoord.push(...coord)
        return coord
    }

}

export { randomShip1 }