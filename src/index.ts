import { consola } from "consola";
import { colors } from "consola/utils";
import { defineCommand, runMain } from "citty";
import path from "node:path";
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import { copy, formatTargetDir, pkgFromUserAgent } from "./utils/kit";

const DEFAULT_TARGETDIR = 'wow-app'
const DEFAULT_TEMPLATE_NAME = 'vue'
const templateOptions = ['vue', 'react']

const cwd = process.cwd()
const renameFiles: Record<string, string | undefined> = {
  _gitignore: '.gitignore',
  // '_eslintrc.cjs': '.eslintrc.cjs'
}

const main = defineCommand({
  meta: {
    name: "create-wow-app",
    version: "0.1.0",
  },
  args: {
    dir: {
      type: 'positional',
      description: 'Project directory',
      required: false
    },
    template: {
      type: 'string',
      alias: 't',
      description: 'Template name',
    },
  },
  run: async (ctx) => {

    consola.info(`${colors.bgCyan(colors.black(' create-wow-app '))}`)

    const { dir, template } = ctx.args

    let argTargetDir = formatTargetDir(dir)
    let targetDir = argTargetDir || DEFAULT_TARGETDIR

    let packageName

    const getProjectName = () =>
      targetDir === '.' ? path.basename(path.resolve()) : targetDir

    if (!argTargetDir) {
      try {
        packageName = await consola.prompt('Project Name: ', {
          type: 'text',
          placeholder: DEFAULT_TARGETDIR,
        })

        //TODO Operation cancelled

        //TODO Overwrite not empty directory

      
        targetDir = formatTargetDir(packageName) || DEFAULT_TARGETDIR
      } catch (error) {
        consola.error(error)
        process.exit(1)
      }
    }

    // Get template name

    let framework = template
    if (typeof template !== 'string') {
      try {
        framework = await consola.prompt('Select a framework: ', {
          type: 'select',
          options: templateOptions,
          initial: DEFAULT_TEMPLATE_NAME
        })
      } catch (error) {
        consola.error(error)
        process.exit(1)
      }
    } else {
      if (!templateOptions.includes(template)) {
        try {
          framework = await consola.prompt(`"${template}" isn't a valid template. Please choose from below: `, {
            type: 'select',
            options: templateOptions,
            initial: DEFAULT_TEMPLATE_NAME
          })
        } catch (error) {
          consola.error(error)
          process.exit(1)
        }
      }
    }

    const templateDir = path.resolve(
      fileURLToPath(import.meta.url),
      '../../templates',
      framework,
    )

    // Write files
    const root = path.join(cwd, targetDir)

    // if (overwrite === 'yes') {
    //   emptyDir(root)
    // } else 
    if (!fs.existsSync(root)) {
      fs.mkdirSync(root, { recursive: true })
    }

    const write = (file: string, content?: string) => {
      const targetPath = path.join(root, renameFiles[file] ?? file)
      if (content) {
        fs.writeFileSync(targetPath, content)
      } else {
        copy(path.join(templateDir, file), targetPath)
      }
    }

    const files = fs.readdirSync(templateDir)
    for (const file of files.filter((f) => f !== 'package.json')) {
      write(file)
    }

    const pkg = JSON.parse(
      fs.readFileSync(path.join(templateDir, `package.json`), 'utf-8'),
    )

    pkg.name = packageName || getProjectName()

    write('package.json', JSON.stringify(pkg, null, 2) + '\n')

    const cdProjectName = path.relative(cwd, root)

    consola.success(`Creation completed. Now run:`)

    const commands = []
    if (root !== cwd) {
      commands.push(`cd ${cdProjectName.includes(' ') ? `"${cdProjectName}"` : cdProjectName}`)
    }

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
  }
});

runMain(main);
