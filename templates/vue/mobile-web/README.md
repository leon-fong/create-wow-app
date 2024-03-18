# mobile web

## `File-based Routing`

Routes will be auto-generated for Vue files in the  **src/pages** dir with the same file structure.
Check out [`unplugin-vue-router`](https://github.com/posva/unplugin-vue-router) for more details.


## `definePage`

We used macro [`definePage()`](https://github.com/posva/unplugin-vue-router?tab=readme-ov-file#extending-existing-routes) to define the route name and meta information for each page, making it easy to control the transition animations for each route.

## Components

Components in this dir will be auto-registered and on-demand, powered by [`unplugin-vue-components`](https://github.com/antfu/unplugin-vue-components).


## Layouts

Vue components in this dir are used as layouts.

By default, `default.vue` will be used unless an alternative is specified in the route meta.

With [`unplugin-vue-router`](https://github.com/posva/unplugin-vue-router) and [`vite-plugin-vue-layouts`](https://github.com/JohnCampionJr/vite-plugin-vue-layouts), you can specify the layout in the page's SFCs like this:

```vue
<route lang="yaml">
meta:
  layout: home
</route>
```
