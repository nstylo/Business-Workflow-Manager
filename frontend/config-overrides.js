const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      // general
      'font-size-base': '16px',
      'font-size-lg': '18',
      'font-size-sm': '14px',
      // input
      'input-height-base': '42px',
      'input-height-lg': '52px',
      'input-height-sm': '32px',
      // button
      'btn-height-base': '42px',
      'btn-height-lg': '52px',
      'btn-height-sm': '32px'
    }
  })
);
