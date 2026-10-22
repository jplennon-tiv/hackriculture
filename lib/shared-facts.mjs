import assert from 'node:assert/strict';

// Shared facts contain a path, never a second editable value. Preserve complete
// metric wording and type distinctions; never silently use imperial fallback.
export function readMasterFact(record, path) {
  assert(record, 'A live master record is required for shared facts');
  assert(/^[a-z][a-z0-9_]*(\.[a-z][a-z0-9_]*)*$/.test(path), 'Invalid master fact path');
  const value = path.split('.').reduce((node, key) => node?.[key], record);
  const metric = value && typeof value === 'object' && ('metric' in value || 'imperial' in value) ? value.metric : value;
  assert(typeof metric === 'string' && metric.trim(), `Missing metric master fact: ${path}`);
  return metric;
}
