// import { getDefaultConfig, mergeConfig } from '@react-native/metro-config';

// // const {getDefaultConfig, mergeConfig} = requ

// /**
//  * Metro configuration
//  * https://reactnative.dev/docs/metro
//  *
//  * @type {import('@react-native/metro-config').MetroConfig}
//  */
// const config = {};

// export default mergeConfig(getDefaultConfig(__dirname), config);

// // module.exports = mergeConfig(getDefaultConfig(__dirname), config);


import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { getDefaultConfig, mergeConfig } from '@react-native/metro-config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config = {};

export default mergeConfig(getDefaultConfig(__dirname), config);

