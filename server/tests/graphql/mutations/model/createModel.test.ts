import { CreateModelInput } from '../../../../types/graphql';
import GraphQLApi from '../../../../graphql';
import TestSuiteUtils from '../../utils';

const createModelTest = (utils: TestSuiteUtils): void => {
    let graphQLApi: GraphQLApi;

    beforeAll(() => {
        graphQLApi = utils.graphQLApi;
    });

    describe('Mutation: createModel', () => {
        test('should work with valid input', async () => {
            const vocabularySetArgs = {
                Name: 'Test Vocabulary Set',
                SystemMaintained: false
            };

            const { VocabularySet } = await graphQLApi.createVocabularySet(vocabularySetArgs);
            expect(VocabularySet).toBeTruthy();

            if (VocabularySet) {
                const vocabularyArgs = {
                    idVocabularySet: VocabularySet.idVocabularySet,
                    SortOrder: 0
                };

                const { Vocabulary } = await graphQLApi.createVocabulary(vocabularyArgs);
                expect(Vocabulary).toBeTruthy();

                if (Vocabulary) {
                    const modelArgs: CreateModelInput = {
                        Authoritative: true,
                        idVCreationMethod: Vocabulary.idVocabulary,
                        idVModality: Vocabulary.idVocabulary,
                        idVPurpose: Vocabulary.idVocabulary,
                        idVUnits: Vocabulary.idVocabulary,
                        Master: true
                    };

                    const { Model } = await graphQLApi.createModel(modelArgs);
                    expect(Model).toBeTruthy();
                }
            }
        });
    });
};

export default createModelTest;
