#!/bin/bash
HOST="127.0.0.1"
DB="blog"
USER="root"
PASS="flrshe!@!!1211"
PORT="3306"
DIR="./model"
JSON_DEFINED="./model"
LANG="ts"
EXEC="egg-sequelize-auto -o ${DIR} -d ${DB} -h ${HOST} -u ${USER} -p ${PORT} -x ${PASS} -e mysql "

#执行
$EXEC
function pause(){
        read -n 1 -p "$*" INP
        if [ $INP != '' ] ; then
                echo -ne '\b \n'
        fi
}
 
pause 'Press any key to continue...'