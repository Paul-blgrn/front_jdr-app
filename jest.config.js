module.exports = {
    // Dossier de tests
    roots: ['<rootDir>/src/tests'],

    // Utilisation de Babel pour transformer le code avant les tests
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },

    // Ne pas ignorer certains modules dans node_modules
    transformIgnorePatterns: [
      "<rootDir>/node_modules/(?!axios|react-router-dom)"  // Ajoutez d'autres modules si nécessaire
    ],

    moduleNameMapper: {
      '^axios$': require.resolve('axios'), // Mapper axios correctement pour éviter les erreurs d'importation
    },

    // Configurer les extensions de fichiers
    moduleFileExtensions: ['js', 'jsx', 'json'],

    // Si vous avez un fichier de setupTests
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],

    // Vous pouvez aussi ajuster les directories de test
    testMatch: [
      '**/test/pages/boards/**/*.test.js',
    ],

    testEnvironment: "jsdom",
  };