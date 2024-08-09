## Install:
- Nodejs 22.02
- Yarn
- Docker

## Setup:

- Copy `.env.local.example` to `.env.local`

- Run command line as below to build source code, and start environment to develop in root folder:
  
```shell
$ yarn install
$ yarn build
$ yarn start
$ chmod +x .shellscripts/build.sh
```
- After doing all the above steps, you can access website with link: `http://localhost:3000` or `http://localhost:3003`

## Deploy:

- To deploy on `production` just copy `.env.production.example` to `.env.production`

```shell
$ yarn build 
```

- Or run this to copy assets to root folder

```shell
$ sh .shellscripts/build.sh
```
