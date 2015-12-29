# MongoDB 

## Install Mongo
```
brew install mongodb
```

## Local Set Up
```
$ mkdir [database name folder]
``` 
for example:  
```
$ mkdir database
```

To start the mongo server run:
```
$ mongod --dbpath [database name folder]
```
This keeps the database server running in the terminal. To quite the database type Control-C: ^c.

## Interact With The Database
To interact with the database from the command line client, go to another terminal window and run:
```
$ mongo
```
If you see on your mac a warning when starting the database server:
"WARNING: soft rlimits too low. Number of files is 256, should be at least 1000"
If that occurs, execute the following command before running the daemon. Quite mongod and run:
```
$ ulimit -n 2048
```
In the mongo command line client, to get the list of available commands, run: 
```
$ help
```
To exit the mongo command line run:
> exit




