# Project structure

```
dist/                        compiled version
docs/                        project docs and coding guides
e2e/                         end-to-end tests
src/                         project source code
|- app/                      app components
|  |- @core/                 core module (singleton services and single-use components)
|  |- @shared/               shared module  (common components, directives and pipes)
|  |- app.component.*        app root component (shell)
|  |- app.module.ts          app root module definition
|  |- app-routing.module.ts  app routes
|  +- ...                    additional modules and components
|- assets/                   app assets (images, fonts, sounds...)
|- environments/             values for various build environments
|- theme/                    app global scss variables and theme
|- translations/             translations files
|- index.html                html entry point
|- main.scss                 global style entry point
|- main.ts                   app entry point
|- polyfills.ts              polyfills needed by Angular
+- test.ts                   unit tests entry point
reports/                     test and coverage reports
proxy.conf.js                backend proxy configuration
```

# Main tasks

Task automation is based on [NPM scripts](https://docs.npmjs.com/misc/scripts).

| Tasks                         | Description                                                                     |
| ----------------------------- | ------------------------------------------------------------------------------- |
| npm start                     | Run development server on `http://localhost:4200/`                              |
| npm run build [-- --env=prod] | Lint code and build app for production in `dist/` folder                        |
| npm test                      | Run unit tests via [Karma](https://karma-runner.github.io) in watch mode        |
| npm run test:ci               | Lint code and run unit tests once for continuous integration                    |
| npm run e2e                   | Run e2e tests using [Protractor](http://www.protractortest.org)                 |
| npm run lint                  | Lint code                                                                       |
| npm run translations:extract  | Extract strings from code and templates to `src/app/translations/template.json` |
| npm run docs                  | Display project documentation                                                   |

When building the application, you can specify the target environment using the additional flag `--env <name>` (do not
forget to prepend `--` to pass arguments to npm scripts).

The default build environment is `prod`.

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change
any of the source files.
You should not use `ng serve` directly, as it does not use the backend proxy configuration by default.

## Code scaffolding

Run `npm run generate -- component <name>` to generate a new component. You can also use
`npm run generate -- directive|pipe|service|class|module`.

If you have installed [angular-cli](https://github.com/angular/angular-cli) globally with `npm install -g @angular/cli`,
you can also use the command `ng generate` directly.

## Additional tools

Tasks are mostly based on the `angular-cli` tool. Use `ng help` to get more help or go check out the
[Angular-CLI README](https://github.com/angular/angular-cli).

# What's in the box

The app template is based on [HTML5](http://whatwg.org/html), [TypeScript](http://www.typescriptlang.org) and
[Sass](http://sass-lang.com). The translation files use the common [JSON](http://www.json.org) format.

#### Libraries

- [Angular](https://angular.io)
- [Bootstrap 4](https://getbootstrap.com)
- [Font Awesome](http://fontawesome.io)
- [RxJS](http://reactivex.io/rxjs)
- [ng-bootstrap](https://ng-bootstrap.github.io)
- [ngx-translate](https://github.com/ngx-translate/core)
- [Lodash](https://lodash.com)

#### Coding guides

- [Angular](docs/coding-guides/angular.md)
- [TypeScript](docs/coding-guides/typescript.md)
- [Sass](docs/coding-guides/sass.md)
- [HTML](docs/coding-guides/html.md)
- [Unit tests](docs/coding-guides/unit-tests.md)
- [End-to-end tests](docs/coding-guides/e2e-tests.md)

#### Other documentation

- [I18n guide](docs/i18n.md)
- [Working behind a corporate proxy](docs/corporate-proxy.md)
- [Updating dependencies and tools](docs/updating.md)
- [Using a backend proxy for development](docs/backend-proxy.md)
- [Browser routing](docs/routing.md)

Copyright and Licensing
----------------------------------------------------------------

Copyright © 2021 by ‘University of Basel’ and mhira-project (https://github.com/mhira-project; https://mhira-project.org/).

MHIRA is licensed under (an unmodified) Mozilla Public License (MPL) 2.0, the terms of which are included in [LICENSE.md](LICENSE.md). The license applies to all files in the repository. 

Please note that MHIRA is using other open source packages and libraries which are, to our knowledge, compatible with the chosen license. 
