export function checkTableName(name: string): boolean {
  try {
    if (!/\s/.test(name)) {
      return false;
    }
    // check length
    if (name.split(' ').length > 2) {
      return false;
    }

    const [text, tableNumber] = name.split(' ');

    if (typeof text !== 'string' || typeof JSON.parse(tableNumber) !== 'number') {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
}
