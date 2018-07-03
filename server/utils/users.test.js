const expect = require('expect');
const { Users } = require('./users');

describe('Users', () => {
  var users;
  beforeEach(() => {
    users = new Users();
    users.users = [
      {
        id: '123',
        name: 'Mike',
        room: 'Node'
      },
      {
        id: '1234',
        name: 'John',
        room: 'React'
      },
      {
        id: '12345',
        name: 'Mary',
        room: 'Node'
      }
    ];
  });
  it('should add a new user', () => {
    var users = new Users();
    var colin = {
      id: '123',
      name: 'Colin',
      room: 'Advanced Bondage'
    };

    var newUser = users.addUser(colin.id, colin.name, colin.room);
    expect(users.users).toEqual([colin]);
  });

  it('should return names of node course', () => {
    console.log(users);
    var userList = users.getUserList('Node');
    expect(userList).toEqual(['Mike', 'Mary']);
  });

  it('should return names of react course', () => {
    var userList = users.getUserList('React');
    expect(userList).toEqual(['John']);
  });

  it('should return a user id', () => {
    var userId = '123';
    var user = users.getUser('123');
    expect(user.id).toBe(userId);
  });
  it('should delete a user', () => {
    var userId = '123';
    var user = users.removeUser(userId);

    expect(users.users.length).toBe(2);
  });
});
