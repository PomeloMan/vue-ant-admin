const fs = require('fs');
const path = require('path');
const { generateTheme } = require('antd-theme-generator');

const themeVariables = ['@primary-color'];
const root = path.resolve(__dirname, '../');
const tmpVarFilePath = path.join(root, 'scripts/var.less');
const outputFilePath = path.join(root, './public/color.less');

const options = {
  stylesDir: path.join(root, './src/assets/styles/themes'),
  antdStylesDir: path.join(root, './node_modules/ant-design-vue/lib'),
  varFile: path.join(root, './scripts/var.less'),
  mainLessFile: path.join(root, './src/assets/styles/empty.less'),
  themeVariables,
  outputFilePath
};

function genVarFile() {
  const ALLVAR = `
    @import '~ant-design-vue/lib/style/themes/default.less';
  `;

  fs.writeFileSync(tmpVarFilePath, ALLVAR);
}

function removeVarFile() {
  fs.unlinkSync(tmpVarFilePath);
}

function removeOutputFile() {
  if (fs.existsSync(outputFilePath)) {
    fs.unlinkSync(outputFilePath);
  }
}

genVarFile();
removeOutputFile();
generateTheme(options)
  .then(() => {
    removeVarFile();
    console.log('Theme generated successfully');
  })
  .catch(error => {
    removeVarFile();
    console.error('Error', error);
  });
