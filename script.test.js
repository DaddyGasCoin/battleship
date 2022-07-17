
import { ship, gameboard } from './script'
const shipObject = ship([0, 1, 2, 3,], 4)
const boardObject = gameboard()
const timesHit = jest.fn();
timesHit.mockReturnValueOnce(1).mockReturnValueOnce(2).mockReturnValue(3);

// jest.spyOn(board, 'getBoard', 'get').mockReturnValue([0, 1, 1, 1, 0, 0])
// const something = new MyClass().something

describe.skip('ship tests,', () => {
    test('if ship not hit', () => {
        expect(shipObject.isHit(42)).toBe(false)

    })

    test('if ship hit', () => {
        expect(shipObject.isHit(1)).toBe(true)

    })

    test('if ship is not sunk', () => {
        expect(shipObject.isSunk()).toBe(false)

    })


    describe('check times hit', () => {

        test('ship hit once', () => {
            expect(timesHit()).toBe(1)


        })
        test('ship hit twice', () => {
            expect(timesHit()).toBe(2)


        })
        test('ship hit thrice and sunk', () => {
            expect(shipObject.len).toBeLessThanOrEqual(timesHit());


        })
    })

})

describe('gameboard tests', () => {
    test('set ship position', () => {
        expect(boardObject.setShip(shipObject)).toEqual([1, 1, 1, 1, 0, 0])
    })

    describe('test attacks', () => {

        beforeEach(() => {
            Object.defineProperty(boardObject, 'board', {
                value: [1, 1, 1, 1, 0, 0],
                writable: true
            });
        })

        test('check is attack hit', () => {
            expect(boardObject.receiveAtk(2)).toBe(true)
        })

        test('check is attack miss', () => {
            expect(boardObject.receiveAtk(5)).toBe(false)
        })
    })



})