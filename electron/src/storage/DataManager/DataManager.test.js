const DataManager = require('.');
const sinon = require('sinon');
const fs = require('fs-extra');

const {
    IncorrectTypeError,
    MissingArgumentError,
    FileNotFoundError,
} = require('../../../_core/error');

describe('DataManager should ', () => {

    it('resolve true to be true', () => {

        expect(true).toBe(true);

    });

    it('throw MissingArgumentError if no constructor argument is passed', () => {

        expect(() => {
            new DataManager();
        }).toThrow(MissingArgumentError);

    });

    it('throws IncorrectTypeError when folder is incorrect type', ()=>{

        expect(() => {
            new DataManager(0);
        }).toThrow(IncorrectTypeError);

    });

    describe('have method normalize that ', () => {

        it('exists', () => {

            // Arrange
            const sut = new DataManager('.');

            // Act
            // Assert
            expect(sut).toHaveProperty('normalize');

        });

        it('returns expected path', () => {

            // Arrange
            const stub = sinon.stub(DataManager, 'root').value('a');
            const SUT = new DataManager('b');

            // Act
            const result = SUT.normalize('c');

            // Assert
            expect(result).toEqual('a/b/c');

            stub.restore();

        });

        it('throws MissingArgumentError if name is not passed', () => {

            // Arrange
            const SUT = new DataManager('.');

            expect(() => {
                // Act
                SUT.normalize();

                // Assert
            }).toThrow(MissingArgumentError);

        });

        it('throws IncorrectTypeError if name in wrong type', () => {

            // Arrange
            const SUT = new DataManager('.');

            expect(() => {
                // Act
                SUT.normalize(1);

                //Assert
            }).toThrow(IncorrectTypeError);

        });

    });

    describe('have method initRoot that ', () => {

        it('exists', () => {

            expect(DataManager.initRoot).toBeDefined();

        });

        it('attempts to create root directory if it does not exist',
            async () => {

                expect.assertions(2);

                // Arrange
                // Stub fs exist should resolve false
                const existsStub = sinon.stub(fs, 'exists');
                existsStub.resolves(false);

                // Stub fs mkdir should resolve
                const mkdirStub = sinon.stub(fs, 'mkdir');
                mkdirStub.resolves();

                // Act
                return new Promise(resolve => {

                    DataManager.initRoot().then(() => {

                        // Assert
                        expect(existsStub.callCount).toBe(1);
                        expect(mkdirStub.getCall(0).args[0]).
                            toEqual(DataManager.root);

                        existsStub.restore();
                        mkdirStub.restore();
                        resolve();

                    });

                });

            },
        );

        it('does not attempt to create root directory if it exists',
            async () => {

                expect.assertions(2);

                // Arrange
                // Stub fs exist should resolve false
                const existsStub = sinon.stub(fs, 'exists');
                existsStub.resolves(true);

                // Stub fs mkdir should resolve
                const mkdirStub = sinon.stub(fs, 'mkdir');
                mkdirStub.resolves();

                // Act
                return new Promise(resolve => {

                    DataManager.initRoot().then(() => {

                        // Assert
                        expect(existsStub.callCount).toBe(1);
                        expect(mkdirStub.calledOnce).toBeFalsy();

                        existsStub.restore();
                        mkdirStub.restore();
                        resolve();

                    });

                });

            },
        );

    });

    describe('have method init that ', () => {

        it('exists', () => {

            const SUT = new DataManager('test');
            expect(SUT).toHaveProperty('init');

        });

        it('attempts to create a folder if it does not exist', async () => {

            expect.assertions(2);

            // Arrange
            const SUT = new DataManager('test');

            // Stub fs exist should resolve false
            const existsStub = sinon.stub(fs, 'exists');
            existsStub.resolves(false);

            // Stub fs mkdir should resolve
            const mkdirStub = sinon.stub(fs, 'mkdir');
            mkdirStub.resolves();

            // Act
            return new Promise(resolve => {

                SUT.init().then(() => {

                    // Assert
                    expect(existsStub.callCount).toBe(1);
                    expect(mkdirStub.getCall(0).args[0]).
                        toEqual(DataManager.root + '/test/');

                    existsStub.restore();
                    mkdirStub.restore();
                    resolve();

                });

            });

        });

        it('does not attempt to create a folder if it exists', async () => {

            expect.assertions(2);

            // Arrange
            const SUT = new DataManager('test');

            // Stub fs exist should resolve false
            const existsStub = sinon.stub(fs, 'exists');
            existsStub.resolves(true);

            // Stub fs mkdir should resolve
            const mkdirStub = sinon.stub(fs, 'mkdir');
            mkdirStub.resolves();

            // Act
            return new Promise(resolve => {

                SUT.init().then(() => {

                    // Assert
                    expect(existsStub.callCount).toBe(1);
                    expect(mkdirStub.calledOnce).toBeFalsy();

                    existsStub.restore();
                    mkdirStub.restore();
                    resolve();

                });

            });
        });

    });

    describe('have method exists that ', () => {

        it('exists', () => {

            const SUT = new DataManager('test');
            expect(SUT).toHaveProperty('exists');

        });

        it('throws MissingArgumentError if name is not passed', () => {

            const SUT = new DataManager('test');

            expect(() => {

                SUT.exists();

            }).toThrow(MissingArgumentError);

        });

        it('throws IncorrectTypeError if name is wrong type', () => {

            const SUT = new DataManager('test');

            expect(() => {

                SUT.exists(0);

            }).toThrow(IncorrectTypeError);

        });

        it('calls init before checking', async () => {

            expect.assertions(1);

            // Arrange
            const SUT = new DataManager('test');

            // Stub fs exists to resolve
            const stubExists = sinon.stub(fs, 'exists');
            stubExists.resolves();

            // Stub init method of DataManger
            const stubInit = sinon.stub(SUT, 'init');
            stubInit.resolves();

            return new Promise(resolve => {

                SUT.exists('test').then(() => {

                    expect(stubInit.callCount).toBe(1);

                    stubExists.restore();
                    stubInit.restore();
                    resolve();

                });

            });

        });

        it('return if the folder exists in the normalized path', async () => {

            expect.assertions(2);

            // Arrange
            const SUT = new DataManager('test');

            // Stub fs exists to resolve
            const stubExists = sinon.stub(fs, 'exists');
            stubExists.resolves();

            // Stub init method of DataManager
            const stubInit = sinon.stub(SUT, 'init');
            stubInit.resolves();

            return new Promise(resolve => {

                // Act
                SUT.exists('test').then(() => {

                    // Assert
                    expect(stubExists.callCount).toBe(1);
                    expect(stubExists.getCall(0).args[0]).
                        toBe(`${DataManager.root}/test/test`);

                    stubExists.restore();
                    stubInit.restore();
                    resolve();

                });

            });

        });

    });

    describe('have method read that ', () => {

        it('exists', () => {

            const SUT = new DataManager('test');
            expect(SUT.read).toBeDefined();

        });

        it('throws MissingArgumentError if name is not passed', () => {

            // Arrange
            const SUT = new DataManager('test');

            expect(() => {

                // Act
                SUT.read();

                // Assert
            }).toThrow(MissingArgumentError);

        });

        it('throws IncorrectTypeError if incorrect type is passed', () => {

            // Arrange
            const SUT = new DataManager('test');

            expect(() => {

                // Act
                SUT.read(0);

                // Assert
            }).toThrow(IncorrectTypeError);

        });

        it('rejects FileNotFound error if folder does not exist', async () => {

            expect.assertions(1);

            // Arrange
            const SUT = new DataManager('test');

            // Stub DataManager exists to resolve false
            const stubExists = sinon.stub(SUT, 'exists');
            stubExists.resolves(false);

            return new Promise(resolve => {

                // Act
                SUT.read('debug').catch(e => {

                    // Assert
                    expect(e).toBeInstanceOf(FileNotFoundError);

                    stubExists.restore();
                    resolve();
                });

            });

        });

        it('calls readFile with normalized path if file does exist',
            async () => {

                expect.assertions(4);

                // Arrange
                const SUT = new DataManager('test');

                // Stub DataManager exists to resolve true
                const stubExists = sinon.stub(SUT, 'exists');
                stubExists.resolves(true);

                // Stub fs readFile to resolve Hello
                const stubReadFile = sinon.stub(fs, 'readFile');
                stubReadFile.resolves('Hello');

                return new Promise(resolve => {

                    SUT.read('debug').then(result => {

                        expect(stubExists.callCount).toBe(1);
                        expect(stubReadFile.callCount).toBe(1);
                        expect(result).toBe('Hello');
                        expect(stubReadFile.getCall(0).args[0]).
                            toBe(SUT.normalize('debug'));

                        stubExists.restore();
                        stubReadFile.restore();

                        resolve();

                    });

                });

            },
        );

    });

    describe('have method dir that ', () => {

        it('exists ', () => {

            const SUT = new DataManager('test');

            expect(SUT.dir).toBeDefined();

        });

        it('calls init then reads dir ', () => {

            // Arrange
            const SUT = new DataManager('test');

            // Stub init to resolve
            const stubInit = sinon.stub(SUT, 'init');
            stubInit.resolves();

            // Stub fs readdir to resolve
            const stubReadDir = sinon.stub(fs, 'readdir');
            stubReadDir.resolves();

            return new Promise(resolve => {

                SUT.dir().then(() => {

                    expect(stubInit.callCount).toBe(1);
                    expect(stubReadDir.callCount).toBe(1);
                    expect(stubReadDir.getCall(0).args[0]).
                        toEqual(SUT.normalize(''));

                    stubInit.restore();
                    stubReadDir.restore();

                    resolve();

                });

            });

        });

    });

    describe('have method write that ', () => {

        it('exists ', () => {

            const SUT = new DataManager('test');

            expect(SUT.write).toBeDefined();

        });

        it('throws MissingArgumentError if name is not passed ', () => {

            // Arrange
            const SUT = new DataManager('test');

            expect(() => {

                // Act
                SUT.write();

                // Assert
            }).toThrow(MissingArgumentError);

        });

        it('throws MissingArgumentError if content is not passed ', () => {

            // Arrange
            const SUT = new DataManager('test');

            expect(() => {

                // Act
                SUT.write('debug');

                // Assert
            }).toThrow(MissingArgumentError);

        });

        it('throws IncorrectTypeError if name is wrong type ', () => {

            // Arrange
            const SUT = new DataManager('test');

            expect(() => {

                // Act
                SUT.write(0);

                // Assert
            }).toThrow(IncorrectTypeError);

        });

        it('throws IncorrectTypeError if content is wrong type ', () => {

            // Arrange
            const SUT = new DataManager('test');

            expect(() => {

                // Act
                SUT.write('test', 0);

                // Assert
            }).toThrow(IncorrectTypeError);

        });

        it('calls init, checks existence of file, no file, writes ',
            async () => {

                // Arrange
                const SUT = new DataManager('test');

                // Stub init to resolve
                const stubInit = sinon.stub(SUT, 'init');
                stubInit.resolves();

                // Stub exists to resolve false
                const stubExists = sinon.stub(SUT, 'exists');
                stubExists.resolves(false);

                // Stub delete to resolve
                const stubDelete = sinon.stub(SUT, 'delete');
                stubDelete.resolves();

                // Stub write file to resolve
                const stubWriteFile = sinon.stub(fs, 'writeFile');
                stubWriteFile.resolves();

                return new Promise(resolve => {

                    SUT.write('delta', 'Hello World').then(() => {

                        expect(stubInit.callCount).toBe(1);
                        expect(stubExists.callCount).toBe(1);
                        expect(stubDelete.calledOnce).toBeFalsy();
                        expect(stubWriteFile.callCount).toBe(1);

                        expect(stubWriteFile.getCall(0).args[0]).
                            toBe(SUT.normalize('delta'));

                        expect(stubWriteFile.getCall(0).args[1]).
                            toBe('Hello World');

                        stubInit.restore();
                        stubExists.restore();
                        stubDelete.restore();
                        stubWriteFile.restore();

                        resolve();

                    });

                });

            },
        );

        it('calls init, checks existence of file, file exists, delete file, writes ',
            async () => {

                // Arrange
                const SUT = new DataManager('test');

                // Stub init to resolve
                const stubInit = sinon.stub(SUT, 'init');
                stubInit.resolves();

                // Stub exists to resolve false
                const stubExists = sinon.stub(SUT, 'exists');
                stubExists.resolves(true);

                // Stub delete to resolve
                const stubDelete = sinon.stub(SUT, 'delete');
                stubDelete.resolves();

                // Stub write file to resolve
                const stubWriteFile = sinon.stub(fs, 'writeFile');
                stubWriteFile.resolves();

                return new Promise(resolve => {

                    SUT.write('delta', 'Hello World').then(() => {

                        expect(stubInit.callCount).toBe(1);
                        expect(stubExists.callCount).toBe(1);
                        expect(stubDelete.callCount).toBe(1);
                        expect(stubWriteFile.callCount).toBe(1);

                        expect(stubWriteFile.getCall(0).args[0]).
                            toBe(SUT.normalize('delta'));

                        expect(stubWriteFile.getCall(0).args[1]).
                            toBe('Hello World');

                        stubInit.restore();
                        stubExists.restore();
                        stubDelete.restore();
                        stubWriteFile.restore();

                        resolve();

                    });

                });

            },
        );

    });

    describe('have method delete that', () => {

        it('exists ', () => {

            const SUT = new DataManager('test');
            expect(SUT.delete).toBeDefined();

        });

        it('throws MissingArgumentError when name is not passed', () => {

            // Arrange
            const SUT = new DataManager('test');

            expect(() => {

                // Act
                SUT.delete();

                // Assert
            }).toThrow(MissingArgumentError);

        });

        it('throws IncorrectTypeError when name is not string', () => {

            // Arrange
            const SUT = new DataManager('test');

            expect(() => {

                // Act
                SUT.delete(0);

                // Assert
            }).toThrow(IncorrectTypeError);

        });

        it('removes file ', async () => {

            // Arrange
            const SUT = new DataManager('test');

            // Stub remove to resolve
            const stubRemove = sinon.stub(fs, 'remove');
            stubRemove.resolves();

            return new Promise(resolve => {

                SUT.delete('hello').then(() => {

                    expect(stubRemove.callCount).toBe(1);
                    expect(stubRemove.getCall(0).args[0]).
                        toEqual(SUT.normalize('hello'));

                    stubRemove.restore();

                    resolve();

                });

            });

        });

    });

});