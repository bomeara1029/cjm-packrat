import { ModelMigrationFile } from './ModelMigrationFile';
import { SceneMigrationPackage } from './SceneMigrationPackage';
import { eVocabularyID } from '@dpo-packrat/common';

// hashes are computed using sha256
export const ModelMigrationFiles: ModelMigrationFile[] = [
    { uniqueID: 'fbx-stand-alone',   title: 'fbx-stand-alone',   path: '', fileName: 'eremotherium_laurillardi-150k-4096.fbx',                     filePath: '',                                                  hash: 'd81595f6e42c9162ddc32c4f358affeda6f1eb14cb7838cf5477536401b764d7', testData: true, geometry: true,  eVPurpose: eVocabularyID.eModelPurposeMaster, eVCreationMethod: eVocabularyID.eModelCreationMethodCAD, eVModality: eVocabularyID.eModelModalityMesh, eVUnits: eVocabularyID.eModelUnitsMillimeter },
    { uniqueID: 'fbx-with-support',  title: 'fbx-with-support',  path: '', fileName: 'eremotherium_laurillardi-150k-4096.fbx',                     filePath: 'eremotherium_laurillardi-150k-4096-fbx',            hash: 'cfcd541913a122a8d8b415c9b5bd45818d7f483b9e683e6c2e0c557de876e694', testData: true, geometry: true,  eVPurpose: eVocabularyID.eModelPurposeMaster, eVCreationMethod: eVocabularyID.eModelCreationMethodCAD, eVModality: eVocabularyID.eModelModalityMesh, eVUnits: eVocabularyID.eModelUnitsMillimeter },
    { uniqueID: 'fbx-with-support',  title: 'fbx-with-support',  path: '', fileName: 'eremotherium_laurillardi-150k-4096-diffuse.jpg',             filePath: 'eremotherium_laurillardi-150k-4096-fbx',            hash: '53a46d32ecc668cb07a2b7f9f8e197c14819db3354b021b551cbdd06f3b81488', testData: true, geometry: false, },
    { uniqueID: 'glb',               title: 'glb',               path: '', fileName: 'eremotherium_laurillardi-150k-4096.glb',                     filePath: '',                                                  hash: '08ddb4b90bace6ae9ef5c0b620f0e3f821c76cad89151d3c992dcd531ba4f498', testData: true, geometry: true,  eVPurpose: eVocabularyID.eModelPurposeMaster, eVCreationMethod: eVocabularyID.eModelCreationMethodCAD, eVModality: eVocabularyID.eModelModalityMesh, eVUnits: eVocabularyID.eModelUnitsMillimeter },
    { uniqueID: 'glb-draco',         title: 'glb-draco',         path: '', fileName: 'eremotherium_laurillardi-Part-100k-512.glb',                 filePath: '',                                                  hash: '9f9016cde5dba8ca138ba083ce616caf1f9bf424429fcd9d9af7bd112b61be8a', testData: true, geometry: true,  eVPurpose: eVocabularyID.eModelPurposeMaster, eVCreationMethod: eVocabularyID.eModelCreationMethodCAD, eVModality: eVocabularyID.eModelModalityMesh, eVUnits: eVocabularyID.eModelUnitsMillimeter },
    { uniqueID: 'obj',               title: 'obj',               path: '', fileName: 'eremotherium_laurillardi-150k-4096.obj',                     filePath: 'eremotherium_laurillardi-150k-4096-obj',            hash: '7da41672c635249a622dcc4e96a8e01747de55b091586dc49a10b465e36ec12b', testData: true, geometry: true,  eVPurpose: eVocabularyID.eModelPurposeMaster, eVCreationMethod: eVocabularyID.eModelCreationMethodCAD, eVModality: eVocabularyID.eModelModalityMesh, eVUnits: eVocabularyID.eModelUnitsMillimeter },
    { uniqueID: 'obj',               title: 'obj',               path: '', fileName: 'eremotherium_laurillardi-150k-4096.mtl',                     filePath: 'eremotherium_laurillardi-150k-4096-obj',            hash: 'a1f7b4c19ee36d68ec3746f4ac9696738076c249f8426fafd87a5a45f3fd8f32', testData: true, geometry: false, },
    { uniqueID: 'obj',               title: 'obj',               path: '', fileName: 'eremotherium_laurillardi-150k-4096-diffuse.jpg',             filePath: 'eremotherium_laurillardi-150k-4096-obj',            hash: '53a46d32ecc668cb07a2b7f9f8e197c14819db3354b021b551cbdd06f3b81488', testData: true, geometry: false, },
    { uniqueID: 'ply',               title: 'ply',               path: '', fileName: 'eremotherium_laurillardi-150k.ply',                          filePath: '',                                                  hash: 'd4825a2586cadb7ccbc40e8562dfb240d8b58669db1e06f4138d427ac6c14c15', testData: true, geometry: true,  eVPurpose: eVocabularyID.eModelPurposeMaster, eVCreationMethod: eVocabularyID.eModelCreationMethodCAD, eVModality: eVocabularyID.eModelModalityMesh, eVUnits: eVocabularyID.eModelUnitsMillimeter },
    { uniqueID: 'stl',               title: 'stl',               path: '', fileName: 'eremotherium_laurillardi-150k.stl',                          filePath: '',                                                  hash: '3984d9039384ba9881635a8c7503c75ffb333c2b27270f9beb87dfd0a26aa762', testData: true, geometry: true,  eVPurpose: eVocabularyID.eModelPurposeMaster, eVCreationMethod: eVocabularyID.eModelCreationMethodCAD, eVModality: eVocabularyID.eModelModalityMesh, eVUnits: eVocabularyID.eModelUnitsMillimeter },
    { uniqueID: 'usd',               title: 'usd',               path: '', fileName: 'eremotherium_laurillardi-150k-4096-5.usdc',                  filePath: 'eremotherium_laurillardi-150k-4096-usd',            hash: 'd73a56f429da81d9ed3338e4edb468ba346be138e93697a4d886dbf63533bc7f', testData: true, geometry: true,  eVPurpose: eVocabularyID.eModelPurposeMaster, eVCreationMethod: eVocabularyID.eModelCreationMethodCAD, eVModality: eVocabularyID.eModelModalityMesh, eVUnits: eVocabularyID.eModelUnitsMillimeter },
    { uniqueID: 'usd',               title: 'usd',               path: '', fileName: 'baseColor-1.jpg',                                            filePath: 'eremotherium_laurillardi-150k-4096-usd/0',          hash: '53a46d32ecc668cb07a2b7f9f8e197c14819db3354b021b551cbdd06f3b81488', testData: true, geometry: false, },
    { uniqueID: 'usdz',              title: 'usdz',              path: '', fileName: 'eremotherium_laurillardi-150k-4096.usdz',                    filePath: '',                                                  hash: 'ca689b07dc534f6e9f3dab7693bcdf894d65fca17f1fb6be34009ada3b6c5b8c', testData: true, geometry: true,  eVPurpose: eVocabularyID.eModelPurposeMaster, eVCreationMethod: eVocabularyID.eModelCreationMethodCAD, eVModality: eVocabularyID.eModelModalityMesh, eVUnits: eVocabularyID.eModelUnitsMillimeter },
    { uniqueID: 'wrl',               title: 'wrl',               path: '', fileName: 'eremotherium_laurillardi-150k-4096.x3d.wrl',                 filePath: 'eremotherium_laurillardi-150k-4096-wrl',            hash: '06192884a751101c02680babf6b676797867150c89a712ebaf83408f9769433b', testData: true, geometry: true,  eVPurpose: eVocabularyID.eModelPurposeMaster, eVCreationMethod: eVocabularyID.eModelCreationMethodCAD, eVModality: eVocabularyID.eModelModalityMesh, eVUnits: eVocabularyID.eModelUnitsMillimeter },
    { uniqueID: 'wrl',               title: 'wrl',               path: '', fileName: 'eremotherium_laurillardi-150k-4096-diffuse.jpg',             filePath: 'eremotherium_laurillardi-150k-4096-wrl',            hash: '53a46d32ecc668cb07a2b7f9f8e197c14819db3354b021b551cbdd06f3b81488', testData: true, geometry: false, },
    { uniqueID: 'x3d',               title: 'x3d',               path: '', fileName: 'eremotherium_laurillardi-150k-4096.x3d',                     filePath: 'eremotherium_laurillardi-150k-4096-x3d',            hash: '3d87c1d33849bed8a048f5235368ba7e36e3b21b27303bb959842de9c665b673', testData: true, geometry: true,  eVPurpose: eVocabularyID.eModelPurposeMaster, eVCreationMethod: eVocabularyID.eModelCreationMethodCAD, eVModality: eVocabularyID.eModelModalityMesh, eVUnits: eVocabularyID.eModelUnitsMillimeter },
    { uniqueID: 'x3d',               title: 'x3d',               path: '', fileName: 'eremotherium_laurillardi-150k-4096-diffuse.jpg',             filePath: 'eremotherium_laurillardi-150k-4096-x3d',            hash: '53a46d32ecc668cb07a2b7f9f8e197c14819db3354b021b551cbdd06f3b81488', testData: true, geometry: false, },
    { uniqueID: 'dae',               title: 'dae',               path: '', fileName: 'clemente_helmet.dae',                                        filePath: 'clemente_helmet-dae',                               hash: '114f1b090b548109cdeeaac8f570b2fee140229758826783079f84504409bb65', testData: true, geometry: true,  eVPurpose: eVocabularyID.eModelPurposeMaster, eVCreationMethod: eVocabularyID.eModelCreationMethodCAD, eVModality: eVocabularyID.eModelModalityMesh, eVUnits: eVocabularyID.eModelUnitsMillimeter },
    { uniqueID: 'dae',               title: 'dae',               path: '', fileName: 'Image_0.jpg',                                                filePath: 'clemente_helmet-dae',                               hash: '42646b00fc588ce37e9819e0f3611b4cdf9b38a34e924361f96ef198909f0d00', testData: true, geometry: false, },
    { uniqueID: 'gltf-stand-alone',  title: 'gltf-stand-alone',  path: '', fileName: 'clemente_helmet.gltf',                                       filePath: '',                                                  hash: 'af6a4707aaf9463c7511eeba9a00b7e2a62e5703bc08e585b00da7daeba44fb4', testData: true, geometry: true,  eVPurpose: eVocabularyID.eModelPurposeMaster, eVCreationMethod: eVocabularyID.eModelCreationMethodCAD, eVModality: eVocabularyID.eModelModalityMesh, eVUnits: eVocabularyID.eModelUnitsMillimeter },
    { uniqueID: 'gltf-with-support', title: 'gltf-with-support', path: '', fileName: 'nmah-1981_0706_06-clemente_helmet-150k-4096.gltf',           filePath: 'nmah-1981_0706_06-clemente_helmet-150k-4096-gltf',  hash: '07fd7e438cba575e41cb408e18f92255ee1789923930ce5e78c6d1f68e39528f', testData: true, geometry: true,  eVPurpose: eVocabularyID.eModelPurposeMaster, eVCreationMethod: eVocabularyID.eModelCreationMethodCAD, eVModality: eVocabularyID.eModelModalityMesh, eVUnits: eVocabularyID.eModelUnitsMillimeter },
    { uniqueID: 'gltf-with-support', title: 'gltf-with-support', path: '', fileName: 'nmah-1981_0706_06-clemente_helmet-150k-4096-diffuse.jpg',    filePath: 'nmah-1981_0706_06-clemente_helmet-150k-4096-gltf',  hash: '53858da74ae61e45039bff29752ea3ad9005f36c554d3520f8d40677635d94bd', testData: true, geometry: false, },
    { uniqueID: 'gltf-with-support', title: 'gltf-with-support', path: '', fileName: 'nmah-1981_0706_06-clemente_helmet-150k-4096-normals.jpg',    filePath: 'nmah-1981_0706_06-clemente_helmet-150k-4096-gltf',  hash: 'f2af32ccabf37328bc452926bc07abe824baa9c53b5be5d769b497e757b0f844', testData: true, geometry: false, },
    { uniqueID: 'gltf-with-support', title: 'gltf-with-support', path: '', fileName: 'nmah-1981_0706_06-clemente_helmet-150k-4096-occlusion.jpg',  filePath: 'nmah-1981_0706_06-clemente_helmet-150k-4096-gltf',  hash: '2d68c5832d2ca5bab941d6d08ad676577e56f47459c7470a3c975ce8ff23c51c', testData: true, geometry: false, },
    { uniqueID: 'gltf-with-support', title: 'gltf-with-support', path: '', fileName: 'nmah-1981_0706_06-clemente_helmet-150k-4096.bin',            filePath: 'nmah-1981_0706_06-clemente_helmet-150k-4096-gltf',  hash: '7aa6ad1a0c11a16adec395261d900e58eb50db238f2ce3a602f1033c0b24b4b2', testData: true, geometry: false, },
];

export const SceneMigrationPackages: SceneMigrationPackage[] = [
    { EdanUUID: 'ed99f44d-3c60-4111-b666-e2908e1b64ef', fetchRemote: true, PosedAndQCd: false, ApprovedForPublication: false, idSystemObjectItem: 658,  testData: true, SceneName: 'Morse Telegraph Key' },
    // { EdanUUID: '341c96cd-f967-4540-8ed1-d3fc56d31f12', fetchRemote: true, PosedAndQCd: false, ApprovedForPublication: false, idSystemObjectItem: 1411, testData: true, SceneName: 'Woolly Mammoth' },
    // { EdanUUID: 'd8c62e5e-4ebc-11ea-b77f-2e728ce88125', fetchRemote: true, PosedAndQCd: false, ApprovedForPublication: false, idSystemObjectItem: 552,  testData: true, SceneName: 'Wright Flyer (1903) Laser Scan' },
    // { EdanUUID: 'd8c64114-4ebc-11ea-b77f-2e728ce88125', fetchRemote: true, PosedAndQCd: false, ApprovedForPublication: false, idSystemObjectItem: 576,  testData: true, SceneName: 'Costume boots for the Wizard in The Wiz on Broadway, worn by Carl Hall' },
];
