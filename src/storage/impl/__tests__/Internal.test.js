const Internal = require('../Internal');

describe('Test the internal data store', () => {
  test('It should not find objects that do not exist', () => {
    const db = new Internal(false);
    const result = db.select('stuff', row => row.name === 'jane doe');
    expect(result).toStrictEqual([]); // note empty array, not null
  });

  test('It should support inserting then querying a new object', () => {
    const db = new Internal(false);
    let result = db.select('stuff', row => row.name === 'john doe');
    expect(result).toStrictEqual([]);
    db.insert('stuff', { id: 1, name: 'john doe', email: 'jdoe@example.com' });

    result = db.select('stuff', row => row.name === 'john doe');
    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({ id: 1, name: 'john doe', email: 'jdoe@example.com' });
    // note no strict equality test; the result contains a $loki field as well
  });

  test('It should support updating an object', () => {
    const db = new Internal(false);
    let result = db.select('stuff', row => row.name === 'john doe');
    expect(result).toStrictEqual([]);
    db.insert('stuff', { id: 1, name: 'john doe', email: 'jdoe@example.com' });

    db.update(
      'stuff',
      row => row.name === 'john doe',
      row => (row.email = 'john_doe@example.com')
    );

    result = db.select('stuff', row => row.name === 'john doe');
    expect(result).toHaveLength(1);
    expect(result[0]).not.toMatchObject({ id: 1, name: 'john doe', email: 'jdoe@example.com' });
    expect(result[0]).toMatchObject({ id: 1, name: 'john doe', email: 'john_doe@example.com' });
  });

  test('It should support deleting an object', () => {
    const db = new Internal(false);
    let result = db.select('stuff', row => row.name === 'john doe');
    expect(result).toStrictEqual([]);
    db.insert('stuff', { id: 1, name: 'john doe', email: 'jdoe@example.com' });

    result = db.select('stuff', row => row.name === 'john doe');
    expect(result).toHaveLength(1);

    db.delete('stuff', row => row.id === 1);

    result = db.select('stuff', row => row.name === 'john doe');
    expect(result).toStrictEqual([]);
  });
});
