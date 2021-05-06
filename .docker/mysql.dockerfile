FROM mysql:5.7

ENV MYSQL_ROOT_PASSWORD root123
ENV MYSQL_DATABASE app
ENV MYSQL_USER zenklub
ENV MYSQL_PASSWORD zenklub123

RUN apt-get update && apt-get -y install vim

EXPOSE 3306

CMD ["mysqld"]