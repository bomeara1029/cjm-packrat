import { gql } from 'apollo-server-express';

const getScene = gql`
    query getScene($input: GetSceneInput!) {
        getScene(input: $input) {
            Scene {
                idScene
                HasBeenQCd
                IsOriented
                Name
                CountCamera
                CountScene
                CountNode
                CountLight
                CountModel
                CountMeta
                CountSetup
                CountTour
                EdanUUID
                ModelSceneXref {
                    idModelSceneXref
                    idModel
                    idScene
                    Name
                    Usage
                    Quality
                    FileSize
                    UVResolution
                    BoundingBoxP1X
                    BoundingBoxP1Y
                    BoundingBoxP1Z
                    BoundingBoxP2X
                    BoundingBoxP2Y
                    BoundingBoxP2Z
                }
            }
        }
    }
`;

export default getScene;
