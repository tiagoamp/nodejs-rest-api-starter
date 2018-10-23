var usersRepo = [];

module.exports = {

    insert : function(user) {
        usersRepo.push(user);
        return user;
    },

    update : function(user) {
        let index = usersRepo.findIndex(u => u.id === user.id);
        usersRepo[index] = user;
        return user;
    },

    delete : function(id) {
        let index = usersRepo.findIndex(u => u.id === id);
        usersRepo.splice(index,1);
    }, 

    findAll : function() {
        return usersRepo;
    }, 

    findById : function(id) {
        return usersRepo.find(u => u.id == id);
    }, 

    removeAll : function() {
        usersRepo = [];
    }

};