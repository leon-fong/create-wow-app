import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { consola } from 'consola'
import { colors } from 'consola/utils'
import { defineCommand, runMain } from 'citty'
import pkg from '../package.json'
import { prompt } from './utils/prompt'
import { conclusions } from './utils/conclusion'
import { copy, formatTargetDir, pkgFromUserAgent, sample } from './utils/kit'

const DEFAULT_TARGETDIR = 'wow-app'
const DEFAULT_FRAMEWORK = 'vue'
const DEFAULT_PROJECT_TYPE = 'web'
const version = `v${pkg.version}`

interface Option {
  label: string
  value: string
  hint?: string
}

const frameworkOptions: Option[] = [
  { label: 'Vue', value: 'vue' },
  { label: 'React', value: 'react' },
]

const projectTypeOptions: Option[] = [
  { label: 'Web', value: 'web' },
  { label: 'Mobile Web', value: 'mobile-web', hint: 'Only running by mobile browser' },
  { label: 'Desktop App', value: 'desktop-app' },
  { label: 'Mini Program', value: 'mini-program' },
  { label: 'Browser Extension', value: 'browser-extension' },
  { label: 'VSCode Extension', value: 'vscode-extension' },
]

const cwd = process.cwd()
const renameFiles: Record<string, string | undefined> = {
  _gitignore: '.gitignore',
}

const main = defineCommand({
  meta: {
    name: pkg.name,
    version: pkg.version,
    description: pkg.description,
  },
  args: {
    dir: {
      type: 'positional',
      description: 'Project directory',
      required: false,
    },
    framework: {
      type: 'string',
      alias: 'f',
      description: 'Framework',
    },
    projectType: {
      type: 'string',
      alias: 't',
      description: 'Project type',
    },
  },
  run: async (ctx) => {
    console.log('\n')
    consola.log(`✨ ${colors.white('create-wow-app')} ${colors.cyan(version)}`)

    // Get directory
    const argTargetDir = formatTargetDir(ctx.args.dir)
    let targetDir = argTargetDir || DEFAULT_TARGETDIR
    const getProjectName = () =>
      targetDir === '.' ? path.basename(path.resolve()) : targetDir

    let packageName
    if (!argTargetDir) {
      try {
        packageName = await prompt('Project Name: ', {
          type: 'text',
          placeholder: DEFAULT_TARGETDIR,
        })

        // TODO Overwrite not empty directory

        targetDir = formatTargetDir(packageName) || DEFAULT_TARGETDIR
      }
      catch (error) {
        consola.error(error)
        process.exit(1)
      }
    }

    // Get framework name
    const framework = ctx.args.framework
    const filterFrameworkOptions = frameworkOptions.map(item => item.value)
    if (typeof framework !== 'string' || !filterFrameworkOptions.includes(framework)) {
      try {
        ctx.args.framework = (await prompt(
          typeof framework !== 'string'
            ? 'Select a framework: '
            : `"${framework}" isn't a valid framework. Please choose from below: `,
          {
            type: 'select',
            options: frameworkOptions,
            initial: DEFAULT_FRAMEWORK,
          },
        )) as any
      }
      catch (error) {
        consola.error(error)
        process.exit(1)
      }
    }

    // Get project type
    const projectType = ctx.args.projectType
    const filterProjectTypeOptions = projectTypeOptions.map(item => item.value)
    if (typeof projectType !== 'string' || !filterProjectTypeOptions.includes(projectType)) {
      try {
        ctx.args.projectType = (await prompt(
          typeof projectType !== 'string'
            ? 'Project Type: '
            : `"${projectType}" isn't a valid project type. Please choose from below: `,
          {
            type: 'select',
            options: projectTypeOptions,
            initial: DEFAULT_PROJECT_TYPE,
          },
        )) as any
      }
      catch (error) {
        consola.error(error)
        process.exit(1)
      }
    }

    // Write files
    const templateDir = path.resolve(
      fileURLToPath(import.meta.url),
      `../../templates/${ctx.args.framework}`,
      ctx.args.projectType,
    )

    if (!fs.existsSync(templateDir)) {
      consola.info('Coming soon!')
      process.exit(0)
    }

    const root = path.join(cwd, targetDir)

    // if (overwrite === 'yes') {
    //   emptyDir(root)
    // } else
    if (!fs.existsSync(root))
      fs.mkdirSync(root, { recursive: true })

    const write = (file: string, content?: string) => {
      const targetPath = path.join(root, renameFiles[file] ?? file)
      if (content)
        fs.writeFileSync(targetPath, content)
      else
        copy(path.join(templateDir, file), targetPath)
    }

    const files = fs.readdirSync(templateDir)
    for (const file of files.filter(f => f !== 'package.json'))
      write(file)

    const pkg = JSON.parse(
      fs.readFileSync(path.join(templateDir, `package.json`), 'utf-8'),
    )

    pkg.name = packageName || getProjectName()

    write('package.json', `${JSON.stringify(pkg, null, 2)}\n`)

    const cdProjectName = path.relative(cwd, root)

    consola.log(`\nCreation completed. Now run:`)

    const commands = []
    if (root !== cwd)
      commands.push(`cd ${cdProjectName.includes(' ') ? `"${cdProjectName}"` : cdProjectName}`)

    const pkgInfo = pkgFromUserAgent(process.env.npm_config_user_agent)
    const pkgManager = pkgInfo ? pkgInfo.name : 'npm'
    switch (pkgManager) {
      case 'yarn':
        commands.push('\nyarn', '\nyarn dev')
        break
      default:
        commands.push(`\n${pkgManager} install`, `\n${pkgManager} run dev`)
        break
    }

    consola.box(commands.join(' '))
    consola.log(colors.gray(sample(conclusions)))
    console.log('\n')
  },
})

runMain(main)
