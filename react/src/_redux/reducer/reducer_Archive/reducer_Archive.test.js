import SUT from '.';
import * as actionStatus from 'src/_core/redux/actionStatus';
import * as action_Archive_Load
    from '../../actions/action_Archive/action_Archive_Suite_Load';
import * as action_Archive_Save
    from '../../actions/action_Archive/action_Archive_Suite_Save';
import * as action_Archive_Add_New
    from '../../actions/action_Archive/action_Archive_Item_New';
import * as action_Archive_Suite_Select
    from '../../actions/action_Archive/action_Archive_Item_Select';
import * as action_Archive_Suite_Delete
    from '../../actions/action_Archive/action_Archive_Item_Delete';
import * as action_Archive_Suite_Rename
    from '../../actions/action_Archive/action_Archive_Item_Rename';
import * as action_Archive_Blank
    from '../../actions/action_Archive/action_Archive_Suite_Blank';
import * as action_Archive_Suite_Update
    from '../../actions/action_Archive/action_Archive_Item_Update';
import * as action_Archive_CheckPassedFile
    from '../../actions/action_Archive/action_Archive_Suite_CheckPassedFile';
import {
    typicalArchive,
    loneFile,
} from 'src/_core/test/mock/archiveStore/archive';
import UUID from 'uuid';
import _ from 'lodash';

describe('reducer_Archive should ', () => {
    const initialState = SUT(undefined, {});

    describe('Basics', () => {
        it('resolves true to be true ', () => {
            expect(true).toBe(true);
        });
    });

    describe('have a happy path that ', () => {
        it('does nothing when fed irrelevant action ', () => {
            // Arrange
            let newState;
            const dummyAction = 'ThisIsATestAction_874587459782323+doNotUse';
            const uselessAction = {
                type: dummyAction,
            };

            // Act
            newState = SUT(initialState, uselessAction);

            // Assert
            expect(newState).toEqual(initialState);
        });
    });
    describe('resolves properly when fed action ', () => {
        it('action_Archive_Blank ', () => {
            // Arrange
            let newState;
            //set up state
            let startState = initialState;
            startState.archive = ['this', 'is', 'full'];
            startState.suiteSelectedUUID = UUID.v4();

            const dummyAction = {type: action_Archive_Blank.TYPE};

            // Act
            newState = SUT(startState, dummyAction);

            // Assert
            expect(startState.archive.length).toEqual(3);
            expect(startState.suiteSelectedUUID).not.toBeNull();
            expect(newState.archive.length).toEqual(0);
            expect(newState.suiteSelectedUUID).toBeNull();
        });
        describe('action_Archive_Save', () => {
            it('STARTED ', () => {
                // Arrange
                let newState;
                //set up state
                let startState = initialState;

                startState.archive = _.cloneDeep(typicalArchive);
                startState.suiteSelectedUUID = typicalArchive[1].uuid;

                const dummyAction = {
                    type: action_Archive_Save.TYPE,
                    status: actionStatus.STARTED,
                };

                // Act
                newState = SUT(startState, dummyAction);

                // Assert
                expect(newState.saveArchiveError).toBeNull();
                expect(newState.saveArchiveStatus).
                    toEqual(actionStatus.STARTED);
            });
            // it('COMPLETE ', () => {
            //     // Arrange
            //     let newState;
            //     //set up state
            //     let startState = initialState;
            //     let expectedFile = _.cloneDeep(typicalArchive);
            //     let expectedFilePath = 'c:/test';
            //
            //     startState.archive = [];
            //     startState.suiteSelectedUUID = typicalArchive[1].uuid;
            //
            //     const dummyAction = {
            //         type: action_Archive_Suite_Save.TYPE,
            //         status: actionStatus.COMPLETE,
            //         payload: expectedFile,
            //         filePath: expectedFilePath,
            //     };
            //
            //     // Act
            //     newState = SUT(startState, dummyAction);
            //
            //     // Assert
            //     expect(newState.archive).toEqual(expectedFile);
            //     expect(newState.saveArchiveStatus).
            //         toEqual(actionStatus.COMPLETE);
            //     expect(newState.filePath).
            //         toEqual(expectedFilePath);
            // });
            it('ERROR ', () => {
                // Arrange
                let newState;
                //set up state
                let startState = initialState;
                let expected = 'new_test_name_from_update';

                startState.archive = _.cloneDeep(typicalArchive);
                startState.suiteSelectedUUID = typicalArchive[1].uuid;

                const dummyAction = {
                    type: action_Archive_Save.TYPE,
                    status: actionStatus.ERROR,
                    payload: expected,
                };

                // Act
                newState = SUT(startState, dummyAction);

                // Assert
                expect(newState.saveArchiveError).
                    toEqual(expected);
                expect(newState.saveArchiveStatus).
                    toEqual(actionStatus.ERROR);
            });
        });
        describe('action_Archive_Load', () => {
            it('STARTED ', () => {
                // Arrange
                let newState;
                //set up state
                let startState = initialState;

                startState.archive = _.cloneDeep(typicalArchive);
                startState.suiteSelectedUUID = typicalArchive[1].uuid;

                const dummyAction = {
                    type: action_Archive_Load.TYPE,
                    status: actionStatus.STARTED,
                };

                // Act
                newState = SUT(startState, dummyAction);

                // Assert
                expect(newState.loadArchiveError).toBeNull();
                expect(newState.loadArchiveStatus).
                    toEqual(actionStatus.STARTED);
            });
            it('COMPLETE ', () => {
                // Arrange
                let newState;
                //set up state
                let startState = initialState;
                let expectedFile = _.cloneDeep(typicalArchive);
                let expectedFilePath = 'c:/test';

                startState.archive = [];
                startState.suiteSelectedUUID = typicalArchive[1].uuid;

                const dummyAction = {
                    type: action_Archive_Load.TYPE,
                    status: actionStatus.COMPLETE,
                    payload: expectedFile,
                    filePath: expectedFilePath,
                };

                // Act
                newState = SUT(startState, dummyAction);

                // Assert
                expect(newState.archive).toEqual(expectedFile);
                expect(newState.loadArchiveStatus).
                    toEqual(actionStatus.COMPLETE);
                expect(newState.filePath).
                    toEqual(expectedFilePath);
            });
            it('ERROR ', () => {
                // Arrange
                let newState;
                //set up state
                let startState = initialState;
                let expected = 'new_test_name_from_update';

                startState.archive = _.cloneDeep(typicalArchive);
                startState.suiteSelectedUUID = typicalArchive[1].uuid;

                const dummyAction = {
                    type: action_Archive_Load.TYPE,
                    status: actionStatus.ERROR,
                    payload: expected,
                };

                // Act
                newState = SUT(startState, dummyAction);

                // Assert
                expect(newState.loadArchiveError).
                    toEqual(expected);
                expect(newState.loadArchiveStatus).
                    toEqual(actionStatus.ERROR);
            });
        });
        describe('action_Archive_CheckPassedFile', () => {
            it('STARTED ', () => {
                // Arrange
                let newState;
                //set up state
                let startState = initialState;

                startState.archive = _.cloneDeep(typicalArchive);
                startState.suiteSelectedUUID = typicalArchive[1].uuid;

                const dummyAction = {
                    type: action_Archive_CheckPassedFile.TYPE,
                    status: actionStatus.STARTED,
                };

                // Act
                newState = SUT(startState, dummyAction);

                // Assert
                expect(newState.checkPassedFileError).toBeNull();
                expect(newState.checkPassedFileStatus).
                    toEqual(actionStatus.STARTED);
            });
            it('COMPLETE ', () => {
                // Arrange
                let newState;
                //set up state
                let startState = initialState;
                let expected = _.cloneDeep(loneFile);

                startState.archive = _.cloneDeep(typicalArchive);
                startState.suiteSelectedUUID = typicalArchive[1].uuid;

                const dummyAction = {
                    type: action_Archive_CheckPassedFile.TYPE,
                    status: actionStatus.COMPLETE,
                    payload: expected,
                };

                // Act
                newState = SUT(startState, dummyAction);

                // Assert
                expect(newState.archive).toEqual(expected);
                expect(newState.checkPassedFileStatus).
                    toEqual(actionStatus.COMPLETE);
            });
            it('ERROR ', () => {
                // Arrange
                let newState;
                //set up state
                let startState = initialState;
                let expected = 'new_test_name_from_update';

                startState.archive = _.cloneDeep(typicalArchive);
                startState.suiteSelectedUUID = typicalArchive[1].uuid;

                const dummyAction = {
                    type: action_Archive_CheckPassedFile.TYPE,
                    status: actionStatus.ERROR,
                    payload: expected,
                };

                // Act
                newState = SUT(startState, dummyAction);

                // Assert
                expect(newState.checkPassedFileError).
                    toEqual(expected);
                expect(newState.checkPassedFileStatus).
                    toEqual(actionStatus.ERROR);
            });
        });
        it('action_Archive_Suite_Select ', () => {
            // Arrange
            let newState;
            //set up state
            let startState = initialState;

            startState.archive = _.cloneDeep(typicalArchive);

            let expectedArchive = _.cloneDeep(typicalArchive);
            expectedArchive.shift(1);

            const dummyAction = {
                type: action_Archive_Suite_Select.TYPE,
                payload: typicalArchive[1].uuid,
            };

            // Act
            newState = SUT(startState, dummyAction);

            // Assert
            expect(newState.suiteSelectedUUID).toEqual(typicalArchive[1].uuid);
        });
        it('action_Archive_Suite_Delete ', () => {
            // Arrange
            let newState;
            //set up state
            let startState = initialState;

            startState.archive = _.cloneDeep(typicalArchive);
            startState.suiteSelectedUUID = typicalArchive[0].uuid;

            let expectedArchive = _.cloneDeep(typicalArchive);
            expectedArchive.shift(1);

            const dummyAction = {type: action_Archive_Suite_Delete.TYPE};

            // Act
            newState = SUT(startState, dummyAction);

            // Assert
            expect(startState.archive.length).toEqual(typicalArchive.length);
            expect(startState.suiteSelectedUUID).not.toBeNull();
            expect(newState.archive.length).toEqual(typicalArchive.length - 1);
            expect(newState.archive).toEqual(expectedArchive);
        });
        it('action_Archive_Suite_Rename ', () => {
            // Arrange
            let newState;
            //set up state
            let startState = initialState;
            let expected = 'new_test_name_from_rename';

            startState.archive = _.cloneDeep(typicalArchive);
            startState.suiteSelectedUUID = typicalArchive[1].uuid;

            const dummyAction = {
                type: action_Archive_Suite_Rename.TYPE,
                payload: expected,
            };

            // Act
            newState = SUT(startState, dummyAction);

            // Assert
            expect(newState.archive[1].fileName).toEqual(expected);
        });
        it('action_Archive_Suite_Update ', () => {
            // Arrange
            let newState;
            //set up state
            let startState = initialState;
            let expected = 'new_test_name_from_update';

            startState.archive = _.cloneDeep(typicalArchive);
            startState.suiteSelectedUUID = typicalArchive[1].uuid;

            const dummyAction = {
                type: action_Archive_Suite_Update.TYPE,
                payload: expected,
            };

            // Act
            newState = SUT(startState, dummyAction);

            // Assert
            expect(newState.archive[1].content).toEqual(expected);
        });
        describe('action_Archive_Add_New', () => {
            it('STARTED ', () => {
                // Arrange
                let newState;
                //set up state
                let startState = initialState;

                startState.archive = _.cloneDeep(typicalArchive);
                startState.suiteSelectedUUID = typicalArchive[1].uuid;

                const dummyAction = {
                    type: action_Archive_Add_New.TYPE,
                    status: actionStatus.STARTED,
                };

                // Act
                newState = SUT(startState, dummyAction);

                // Assert
                expect(newState.archiveAddNewError).toBeNull();
                expect(newState.archiveAddNewStatus).
                    toEqual(actionStatus.STARTED);
            });
            it('COMPLETE ', () => {
                // Arrange
                let newState;
                //set up state
                let startState = initialState;
                let expected = _.cloneDeep(loneFile);

                startState.archive = _.cloneDeep(typicalArchive);
                startState.suiteSelectedUUID = typicalArchive[1].uuid;

                const dummyAction = {
                    type: action_Archive_Add_New.TYPE,
                    status: actionStatus.COMPLETE,
                    payload: expected,
                };

                // Act
                newState = SUT(startState, dummyAction);

                // Assert
                expect(newState.archiveAddNewError).toBeNull();
                expect(newState.archiveAddNewStatus).
                    toEqual(actionStatus.COMPLETE);
            });
            it('ERROR ', () => {
                // Arrange
                let newState;
                //set up state
                let startState = initialState;
                let expected = 'new_test_name_from_update';

                startState.archive = _.cloneDeep(typicalArchive);
                startState.suiteSelectedUUID = typicalArchive[1].uuid;

                const dummyAction = {
                    type: action_Archive_Add_New.TYPE,
                    status: actionStatus.ERROR,
                    payload: expected,
                };

                // Act
                newState = SUT(startState, dummyAction);

                // Assert
                expect(newState.archiveAddNewError).
                    toEqual(expected);
                expect(newState.archiveAddNewStatus).
                    toEqual(actionStatus.ERROR);
            });
        });
    });
});
