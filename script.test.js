
import { ship } from './script'
const shipObject = ship([1, 2, 3], 3)
const timesHit = jest.fn();
timesHit.mockReturnValueOnce(1).mockReturnValueOnce(2).mockReturnValue(3);


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

