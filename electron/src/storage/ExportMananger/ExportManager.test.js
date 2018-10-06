const ExportManager = require('.');
const sinon = require('sinon');
const {dialog, shell} = require('electron');

const {
    FileNotFoundError,
    MissingArgumentError,
    IncorrectTypeError,
} = require('../../../_core/error');

describe('ExportManager should ', () => {

    describe('', () => {

        it('resolve true to be true', () => {
            expect(true).toBe(true);
        });

        it('throws MissingArgumentError when dataManager is not passed', () => {

            expect(() => {

                new ExportManager();

            }).toThrow(MissingArgumentError);

        });

        it('sets property dataManager to constructor arg', () => {

            const SUT = new ExportManager("Hello");

            expect(SUT.dataManager).toBe("Hello");
            expect(SUT.lastPath).toBe("~");

        });

    });

    // describe('has method showInFolder that ', () => {
    //
    //     it('exists', () => {
    //
    //         const SUT = new ExportManager('test');
    //
    //         expect(SUT.showInFolder).toBeDefined();
    //
    //     });
    //
    //     it('calls shell.showItemInFolder', () => {
    //
    //         // Arrange
    //         const SUT = new ExportManager('test');
    //
    //         // Stub showItemInFolder to resolve
    //         const stubShowItemInFolder = sinon.stub(shell, 'showItemInFolder');
    //         stubShowItemInFolder.returns(0);
    //
    //
    //
    //     });
    //
    // }fdddd connor is funny looking HJA HAHAHA


});