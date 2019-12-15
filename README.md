# Node JS Boilerplate

Node JS application with
  - Express js
  - APIs for Login and other sample tables with middlewares
  - Token authentication

# Features!

  - Socket Communication using socket.io
  - Creation of rooms and broadcast to particular clients
  - REST apis with token authentication with JWT
  - Token expiry in 24h
  - Basic security with Helmet
  - Mysql db


### Installation

```sh
$ cd nodejs
$ npm install -d
```
For production environments...
Install ansible https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html
```sh
$ npm start # to start the local instance hosted on localhost:3000
$ npm install pm2
$ NODE_ENV=production node app
$ ansible-playbook scripts/setup.yml -i scripts/inventory.ini 
```
To anisble work on your VM machine AWS/GCP or AZURE, copy your public key to the authorised keys files in the VM machine(ubuntu machine). 

Insdie scripts folder there are 2 files, inventory.ini, where the VM machines IP address is added to which the code is deployed. Deploy.ym will be having the necessary functions where you can add your scripts functions etc.



