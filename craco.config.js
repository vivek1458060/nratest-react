const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: { 
                            '@font-size-base': '16px',
                            '@line-height-base': 1.796,
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};