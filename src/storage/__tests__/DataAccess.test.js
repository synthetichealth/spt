const db = require('../DataAccess');

describe('Test the internal data store', () => {
  test('It should expose the proper api', () => {
    expect(typeof db.insert).toEqual('function');
    expect(db.insert).toHaveLength(2); // function.length == number of args

    expect(typeof db.select).toEqual('function');
    expect(db.select).toHaveLength(2);

    expect(typeof db.update).toEqual('function');
    expect(db.update).toHaveLength(3);

    expect(typeof db.delete).toEqual('function');
    expect(db.delete).toHaveLength(2);
  });
});
