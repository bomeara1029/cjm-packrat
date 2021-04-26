import { gql } from 'apollo-server-express';

const getAssetDetailsForSystemObject = gql`
    query getAssetDetailsForSystemObject($input: GetAssetDetailsForSystemObjectInput!) {
        getAssetDetailsForSystemObject(input: $input) {
          assetDetails {
                idSystemObject
                idAsset
                name
                path
                assetType
                version
                dateCreated
                size
            }
        }
    }
`;

export default getAssetDetailsForSystemObject;
