const {
    override,
    fixBabelImports,
    addLessLoader,
} = require("customize-cra");

module.exports = override(
    fixBabelImports("import", {
        libraryName: "antd", libraryDirectory: "es", style: true // change importing css to less
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {
            "@font-size-base": "16px",
            "@line-height-base": "24px"
        }
    })
);