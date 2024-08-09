## Install:
- Nodejs 22.02
- Yarn
- Docker

## Setup:

- Copy `.env.example` to `.env`

- Run command line as below to build source code, and start environment to develop in root folder:
  
```shell
$ docker-compose -f docker-compose.yml build
$ docker-compose -f docker-compose.yml up -d --build
```

- You can use configuration as below to connect db via database management tool:
    - Host: `host.docker.internal` or `localhost`
    - Port: `4374`
    - Username: `root`
    - Password: `***`

- After doing all the above steps, you can access website with link: http://localhost:8074

## Setup source into Ubuntu VM - On Windows - WSL ##

- Default path `\\wsl.localhost\{Ubuntu version}\home\{user folder}`
- Copy `.ssh` folder in windows to default path
- Copy `.gitconfig` file in windows to default path
- Run command line `chmod 600 ~/.ssh/id_rsa` into project folder in Ubuntu VM

## Deploy:

- To deploy on `production` just copy `.env.production.example` to `.env.production`

```shell
$ yarn build 
```

- Or run this to copy assets to root folder

```shell
$ sh .shellscripts/build.sh
```
