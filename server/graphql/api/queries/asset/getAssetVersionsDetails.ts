import { gql } from 'apollo-server-express';

const getAssetVersionsDetails = gql`
    query getAssetVersionsDetails($input: GetAssetVersionsDetailsInput!) {
        getAssetVersionsDetails(input: $input) {
            valid
            Details {
                idAssetVersion
                SubjectUnitIdentifier {
                    idSubject
                    SubjectName
                    UnitAbbreviation
                    IdentifierPublic
                    IdentifierCollection
                }
                Project {
                    idProject
                    Name
                }
                Item {
                    idItem
                    Name
                    EntireSubject
                }
                CaptureDataPhoto {
                    idAssetVersion
                    dateCaptured
                    datasetType
                    systemCreated
                    description
                    cameraSettingUniform
                    datasetFieldId
                    itemPositionType
                    itemPositionFieldId
                    itemArrangementFieldId
                    focusType
                    lightsourceType
                    backgroundRemovalMethod
                    clusterType
                    clusterGeometryFieldId
                    directory
                    folders {
                        name
                        variantType
                    }
                    identifiers {
                        identifier
                        identifierType
                        idIdentifier
                    }
                }
                Model {
                    idAssetVersion
                    systemCreated
                    name
                    authoritative
                    creationMethod
                    modality
                    purpose
                    units
                    dateCaptured
                    modelFileType
                    directory
                    identifiers {
                        identifier
                        identifierType
                        idIdentifier
                    }
                }
                Scene {
                    idAssetVersion
                    identifiers {
                        identifier
                        identifierType
                        idIdentifier
                    }
                }
            }
        }
    }
`;

export default getAssetVersionsDetails;
