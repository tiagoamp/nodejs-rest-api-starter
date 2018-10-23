var userDao = require("../../persistence/UserInMemoryDao.js");

describe('User DAO in memory (non-persistent)', () => {

    beforeEach(() => { 
        userDao.removeAll();  // cleaning test data
    })


    test('Insert', () => {
        const user = { id: 1, name: 'Ozzy Osbourne' }
        const result = userDao.insert(user);
        expect(result).toMatchObject(user);
    })

    test('Update', () => {
        let user = { id: 1, name: 'Ozzy Osbourne' }
        userDao.insert(user);
        user = { id: 1, name: 'Ozzy Osbourne Updated' }
        const result = userDao.update(user);
        expect(result).toMatchObject(user);
    })

    test('Delete', () => {
        const user = { id: 2, name: 'Max Cavalera' }
        userDao.insert(user);
        const lengthAfterInsert = userDao.findAll().length;
        userDao.delete(user.id);
        const lengthAfterDelete = userDao.findAll().length;
        expect(lengthAfterInsert).toEqual(1);
        expect(lengthAfterDelete).toEqual(0);
    })

    test('Find All', () => {
        const user = { id: 1, name: 'Ozzy Osbourne' }
        userDao.insert(user);
        const result = userDao.findAll();
        expect(result).toHaveLength(1);
    })

    test('Find By id', () => {
        const user1 = { id: 1, name: 'Ozzy Osbourne' }
        const user2 = { id: 2, name: 'Max Cavalera' }
        userDao.insert(user1);
        userDao.insert(user2);
        const result = userDao.findById(user2.id);
        expect(result).toMatchObject(user2);
    })

  })