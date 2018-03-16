# Ridibooks CMS UI
This project provides UI components to be used with [Ridibooks CMS SDK](https://github.com/ridi/cms-sdk).

## Development

### Setup
Install all dependencies.
```bash
yarn install
```
> We use [*Yarn*](https://yarnpkg.com) instead of *npm*
> to leverage the [*workspaces*](https://yarnpkg.com/en/docs/workspaces)
> to link the library source code to the example app
> so that any changes of the source code to be applied to the example app on the fly!

### Build
To build *cms-ui* module, please run:
```bash
yarn build
```
The output file will be generated in `lib/lib` directory.

### Run Example App
To compile and run example app, please run:
```bash
yarn start
```
> To compile the example app initially,
> the module file `lib/lib/cms-ui.js` is required even if it's empty file! 
