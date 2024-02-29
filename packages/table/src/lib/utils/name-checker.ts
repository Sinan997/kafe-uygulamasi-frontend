import { MessageService } from "primeng/api";

export function checkTableName(name: string): boolean {
  // check is it contains space
  try {
    if (!(/\s/.test(name))) {
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