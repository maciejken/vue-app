import keyMaps from '../constants/keymaps';

function getKeyMapping(value, keyMap) {
  if (keyMap) {
    const key = value.slice(-1);
    value = value.slice(0, -1) + (keyMaps[keyMap][key] || key);
  }
  return value;
}

export default function mapInput({ target, currentValue, keyMap }) {
  let value;
  const truncated = currentValue.slice(0, -1);
  if (target.value !== truncated) {
    value = getKeyMapping(target.value, keyMap);
  } else {
    value = truncated;
  }
  return value;
}