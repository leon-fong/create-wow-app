import { consola } from "consola";
import { defineCommand, runMain } from "citty";
import path from "node:path";
import { fileURLToPath } from 'node:url'

const DEFAULT_TEMPLATE_NAME = 'vue'

const main = defineCommand({
  meta: {
    name: "create-wow-app",
    version: "0.1.0",
  },
  args: {
    dir: {
      type: 'positional',
      description: 'Project directory',
      default: '',
    },
    template: {
      type: 'string',
      alias: 't',
      description: 'Template name',
    },
  },
  run(ctx) {

    // Get template name
    const templateName = ctx.args.template || DEFAULT_TEMPLATE_NAME

    if (typeof templateName !== 'string') {
      consola.error('Please specify a template!')
      process.exit(1)
    }

    const templateDir = path.resolve(
      fileURLToPath(import.meta.url),
      '../../templates',
      templateName,
    )

    consola.info('arg:', templateDir)

    // Write files

  },
});

runMain(main);
