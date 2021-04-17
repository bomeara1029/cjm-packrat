import { gql } from 'apollo-server-express';

const uploadAsset = gql`
    mutation uploadAsset($file: Upload!, $type: Int!) {
        uploadAsset(file: $file, type: $type) {
            status
            idAssetVersions
            error
        }
    }
`;

export default uploadAsset;