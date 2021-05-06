#!/bin/sh
if [ "$NODE_ENV" == "development" ] 
then
    yarn sequelize db:migrate && yarn start:dev
else
    yarn sequelize db:migrate && yarn start:prod
fi