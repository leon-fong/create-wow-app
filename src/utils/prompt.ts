import process from 'node:process'
import consola from 'consola'
import { colors } from 'consola/utils'

/**
 * Wrapper to exit the process if the user presses CTRL+C.
 */
export const prompt: typeof consola.prompt = async (message, options) => {
  const response = await consola.prompt(message, options)
  if (response.toString() === 'Symbol(clack:cancel)') {
    consola.log(`${colors.red('✖')} Aborting...`)
    process.exit(0)
  }
  return response
}
