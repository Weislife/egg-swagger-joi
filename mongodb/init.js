db = db.getSiblingDB("admin");
db.auth('root', 'root123456');

db = db.getSiblingDB("game-platform");
db.createUser({
    user: "user",
    pwd: "user123456",
    roles: [{role: "readWrite", db: "game-platform"}]
});

db.admins.insert({
    "username": "admin",
    "password": "27b49d5a1fee5b87655419eb1ad7d84e8067834cdd26f13f913325f4c25b6c657965f1e1d8b10b85970b5d467b09e4fc43a4258936d478ef0dc19b619ed165df",
    "salt": "750e2fc2e3b6961fcf55e3038dcff2f0",
    "create_time": ISODate("2018-08-13T10:10:24.841Z"),
    "update_time": ISODate("2018-08-15T11:39:33.276Z"),
});
