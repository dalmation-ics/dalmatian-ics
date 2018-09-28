const storage = require('.');
const DataManager = require('./DataManager/index');
const sinon = require('sinon');

describe('storage should ', () => {

    it('have formManager', () => {
        expect(storage).toHaveProperty('formManager');
    });

    it('have stateManager', () => {
        expect(storage).toHaveProperty('stateManager');
    });

    it('have exportManager', () => {
        expect(storage).toHaveProperty('exportManager');
    });

    it('have method init that returns DataManager.initRoot', async () => {

        // Arrange
        const stub = sinon.stub(DataManager, 'initRoot');
        stub.resolves('hello');

        // Act
        const result = await storage.init();

        // Assert
        expect(result).toEqual('hello');

    });

});
