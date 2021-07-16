# dev-starter
A starter template for a React Next.js component library. 

## Setup
```bash 
# Install Next.js
$ yarn create next-app --typescript .
```

## Development and building
```bash 
# Start Next.js for development
$ yarn dev

# Build library
$ yarn build
```

## Publishing
Create an `ACCESS_TOKEN` at `github > Settings > Developer settings > Personal access tokens > Generate new token`, enable `write:packages` and `delete:packages`, `Generate token`.

Publish package to npm registry
```bash
$ yarn npm:login
#> $ npm login --scope=@webx-components --registry=https://npm.pkg.github.com

#> Username: GITHUB_USERNAME
#> Password: ACCESS_TOKEN
#> Email: (this IS public) ingoandelhofs@gmail.com
```

```bash
$ yarn publish:lib
```

## Installing
Add the `.npmrc` file to your project where you want to install the package.
```bash
# .npmrc
@webx-components:registry=https://npm.pkg.github.com
```

Install package
```bash
$ yarn add @webx-components/dev-starter
```