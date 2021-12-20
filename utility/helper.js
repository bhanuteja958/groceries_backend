async function checkIfUserExists(username,usersCollection){
    const user = await usersCollection.findOne({
        username: username
    });

    return user ? true : false;
}


module.exports = {
    checkIfUserExists,
}