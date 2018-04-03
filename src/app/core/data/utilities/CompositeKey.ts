export function extractLocalKey(key: string) {
  const dotIndex = key.lastIndexOf(".");
  if (dotIndex < 0) {
    return key;
  }
  return key.substr(dotIndex + 1);
}

export function compositeKey(namespace: string, localKey: string) {
  if (!namespace || namespace.length === 0) {
    return localKey;
  }

  return `${namespace}.${localKey}`;
}
