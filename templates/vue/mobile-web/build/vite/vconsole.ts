import path from 'node:path'
import { viteVConsole } from 'vite-plugin-vconsole'

export function createViteVConsole() {
  return viteVConsole({
    entry: [path.resolve('src/main.ts')],
    enabled: false,
    config: {
      maxLogNumber: 1000,
      theme: 'light',
    },
    // https://github.com/vadxq/vite-plugin-vconsole/issues/21
    dynamicConfig: {
      theme: `document.documentElement.classList.contains('dark') ? 'dark' : 'light'`,
    },
    eventListener: `
      const targetElement = document.querySelector('html');
      const observerOptions = {
        attributes: true, 
        attributeFilter: ['class']
      };

      function handleAttributeChange(mutationsList) {
        for(let mutation of mutationsList) {
          if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            if (window && window.vConsole) {
              window.vConsole.dynamicChange.value = new Date().getTime();
            }
          }
        }
      }

      const observer = new MutationObserver(handleAttributeChange);

      observer.observe(targetElement, observerOptions);

      // observer.disconnect();
    `,
  })
}
