import { program } from 'commander';
import { commandSync } from 'execa';
import fs from 'fs-extra';
import path from 'path';
import inquirer from 'inquirer';

const init = (): void => {
  const templateDir = path.resolve(__dirname, '../template/commit')
  const templateHuskyDir = path.resolve(__dirname, '../template/husky')
  const projectDir = `${process.cwd()}`
  const packageJson = require('../package.json')
  if (!packageJson) {
    console.log('package.json 不存在！')
    process.exit(0)
  }
  program
    .version(packageJson.version, '-v')
    .description(packageJson.description)
    .action(async () => {
      const answer = await inquirer.prompt([
        {
          name: 'check_tool',
          type: 'list',
          message: 'Choose a check git hook:',
          choices: ['Husky', 'Yorkie']
        }
      ])
      // Copy the commitlint configuration to the project
      fs.copySync(templateDir, projectDir)
      if (answer.check_tool === 'Husky') {
        fs.copySync(templateHuskyDir, projectDir)
        initHusky(projectDir)
      }
      if (answer.check_tool === 'Yorkie') {
        initYorkie(projectDir)
      }
    })
    
  program.parse(process.argv);
}

// husky config
function initHusky(projectDir) {
  const origin = JSON.parse(fs.readFileSync(`${projectDir}/package.json`, 'utf8'))

  const config = {
    ...origin,
    scripts: {
      ...origin.scripts,
      commit: 'git cz'
    },
    config: origin.config
      ? {
          ...origin.config,
          commitizen: {
            path: 'cz-customizable'
          }
        }
      : {
          commitizen: {
            path: 'cz-customizable'
          }
        }
  }
  fs.writeFileSync(`${projectDir}/package.json`, JSON.stringify(config))

  commandSync(
    'yarn add commitizen cz-customizable @commitlint/cli commitlint-config-cz husky -D -W',
    {
      shell: true,
      stdout: 'inherit',
      stderr: 'inherit'
    }
  )
}

// yorkie config
function initYorkie(projectDir) {
  const origin = JSON.parse(fs.readFileSync(`${projectDir}/package.json`, 'utf8'))

  const config = {
    ...origin,
    scripts: {
      ...origin.scripts,
      commit: 'git cz'
    },
    config: origin.config
      ? {
          ...origin.config,
          commitizen: {
            path: 'cz-customizable'
          }
        }
      : {
          commitizen: {
            path: 'cz-customizable'
          }
        },
    gitHooks: origin.gitHooks
      ? {
          ...origin.gitHooks,
          'commit-msg': 'commitlint --edit $1'
        }
      : {
          'commit-msg': 'commitlint --edit $1'
        }
  }
  fs.writeFileSync(`${projectDir}/package.json`, JSON.stringify(config))

  commandSync(
    'yarn add commitizen cz-customizable @commitlint/cli commitlint-config-cz yorkie -D -W',
    {
      shell: true,
      stdout: 'inherit',
      stderr: 'inherit'
    }
  )
}

export = { init };
