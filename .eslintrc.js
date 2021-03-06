module.exports = {
    "env": {
        "es6": true,
        "node": true,
        "jest/globals": true
    },
    "plugins": ["jest"],
    "extends": ["eslint:recommended","plugin:jest/recommended"],
    "parserOptions": {
        "sourceType": "module",
        "ecmaVersion": 2017
    },
    "rules": {
        "no-constant-condition":"off",
        "no-console": "off",
        "indent": [
            "error",
            "tab"
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};