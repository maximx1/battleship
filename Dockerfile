# battleship
#
# Version     master
FROM          ubuntu
MAINTAINER    Justin Walrath <walrathjaw@gmail.com>

# Update Box and obtain dependencies
RUN           apt-get update && apt-get install -y git curl python make g++
RUN           curl -sL https://deb.nodesource.com/setup | sudo bash -
RUN           apt-get install -y nodejs

# Set up environment variables
ENV           PORT              3000
ENV           APP_NAME          battleship
ENV           APP_INSTALL_DIR   /tmp/$APP_NAME
ENV           INSTALL_VERSION   master
ENV           REPOSITORY        https://github.com/maximx1/battleship

# Install the application
RUN           git clone --branch $INSTALL_VERSION $REPOSITORY $APP_INSTALL_DIR
WORKDIR       $APP_INSTALL_DIR
RUN           npm install && npm run build-js

# Expose contained OS outside of docker
EXPOSE        $PORT

# Set run command
CMD           node index.js
