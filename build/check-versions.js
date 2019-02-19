'use strict'
const chalk = require('chalk') // 引入显示终端颜色模块用于在控制台输出带颜色字体的插件
const semver = require('semver')//语义化版本检查插件（The semantic version parser used by npm）Semver 是 Github 起草的一个具有指导意义的，统一的版本号表示规则，称为 Semantic Versioning(语义化版本表示)。该规则规定了版本号如何表示，如何增加，如何进行比较，不同的版本号意味着什么。
const packageConfig = require('../package.json') //引入package.json
const shell = require('shelljs')// node版本的uninx shell命令
//执行命令函数，执行Unix系统命令后转成没有空格的字符串。
function exec (cmd) {
  return require('child_process').execSync(cmd).toString().trim()
}

const versionRequirements = [
  { 
    name: 'node',
    currentVersion: semver.clean(process.version),//使用semver格式化版本
    versionRequirement: packageConfig.engines.node//获取package.json中设置的node版本
  }
]

if (shell.which('npm')) {
  versionRequirements.push({
    name: 'npm',
    currentVersion: exec('npm --version'), //自动调用npm --version命令，并且把参数返回给exec函数，获取纯净的版本号
    versionRequirement: packageConfig.engines.npm
  })
}

module.exports = function () {
  const warnings = []

  for (let i = 0; i < versionRequirements.length; i++) {
    const mod = versionRequirements[i]

    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      //如果有npm或者node的版本比定义的版本低，则生成警告。
      warnings.push(mod.name + ': ' +
        chalk.red(mod.currentVersion) + ' should be ' +
        chalk.green(mod.versionRequirement)
      )
    }
  }

  if (warnings.length) {
    console.log('')
    console.log(chalk.yellow('To use this template, you must update following to modules:'))
    console.log()

    for (let i = 0; i < warnings.length; i++) {
      const warning = warnings[i]
      console.log('  ' + warning)
    }

    console.log()
    process.exit(1)//退出程序
  }
}
