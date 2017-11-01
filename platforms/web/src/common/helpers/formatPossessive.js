// @flow
export default function formatPossessive(name: string) {
  return name.endsWith('s') ? `${name}` : `${name}'s`;
}
