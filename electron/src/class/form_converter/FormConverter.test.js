const SUT = require('.');

describe('FormConverter should ', () => {

    describe('', () => {

        it('resolve true to be true', () => {
            expect(true).toBe(true);
        });

    });

    describe('have method convert that ', ()=>{

        expect(SUT.convert).toBeDefined();

    });

});