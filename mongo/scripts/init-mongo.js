conn = new Mongo();
db = conn.getDB("ase-authentication");

db.createCollection('users');

db.users.insert([
    { "email": "admin@tum.de" , "password": "$2a$10$xwS9yyz1f/rI1fUAd9noPeWq7gdC.jQp0UFFLksQk9WycuKnBIRoy", "userType": "DISPATCHER"}
]);