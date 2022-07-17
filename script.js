
//coordinates is an array of numbers representing position of ship,
// lenth is length of ship to check if it has been desroyed or onot
const ship = (coordinates, len) => {

    let timesHit = 0
    let validblock = [...coordinates]
    const isHit = (hitTarget) => {

        if (validblock.includes(hitTarget)) {
            validblock = validblock.filter(item => item !== hitTarget)
            timesHit++
            return true

        }
        else {
            return false
        }
    }

    const isSunk = () => {
        if (timesHit <= len) {
            return false
        }
        else {
            return true
        }
    }

    return { isHit, isSunk, len }
}

export { ship }