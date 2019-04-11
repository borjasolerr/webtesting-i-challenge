module.exports = {
  succeed,
  fail,
  repair,
  get
};

function objectError(object) {
  const { name, enhancement, durability } = object;

  if (typeof name !== 'string') {
    throw new Error('Item must contain name string');
  }

  if (typeof enhancement !== 'number' || isNaN(enhancement)) {
    throw new Error('Item must contain enhancement number');
  }

  if (typeof durability !== 'number' || isNaN(durability)) {
    throw new Error('Item must contain durability number');
  }

  if (name.length < 3) {
    throw new Error('Item name must be longer than 3 characters. ');
  }
}

function succeed(item) {
  const newItem = Object.assign({}, item);
  objectError(newItem);

  if (newItem.enhancement < 20) {
    newItem.enhancement += 1;
  }
  return { ...newItem };
}

function fail(item) {
  const newItem = Object.assign({}, item);
  objectError(newItem);

  const { enhancement } = newItem;

  if (enhancement < 15) {
    newItem.durability -= 5;
  }

  if (enhancement >= 15) {
    newItem.durability -= 10;
  }

  if (enhancement > 16) {
    newItem.enhancement -= 1;
  }

  return { ...newItem };
}

function repair(item) {
  const newItem = Object.assign({}, item);
  objectError(newItem);

  newItem.durability = 100;
  return { ...newItem };
}

function get(item) {
  const newItem = Object.assign({}, item);
  objectError(newItem);

  const { enhancement } = newItem;

  if (enhancement > 0) {
    newItem.name = `[+${newItem.enhancement}] ${newItem.name}`;
  }
  return { ...newItem };
}
