import diff from 'fast-diff';
import keyMaps from '../constants/keymaps';

function mapKeys(str, dict) {
  return str.split('')
    .map(key => dict && dict[key] ? dict[key] : key)
    .join('');
}

export default function mapInput({ currentValue, value, keyMap }) {
  return diff(currentValue, value)
    .map(s => {
      const [mode, str] = s;
      let v;
      if (mode === diff.INSERT) {
        v = mapKeys(str, keyMaps[keyMap]);
      } else if (mode === diff.EQUAL) {
        v = str;
      } else {
        v = '';
      }
      return v;
    })
    .join('');
}
