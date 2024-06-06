export function getPatientOnGitHub(path) {
  // path is of the form "github/org/repo/folderpath/to/file.json"

  if (path.startsWith("github/")) {
    path = path.substring(7);
  }

  const parts = path.split('/');
  const org = parts[0];
  const repo = parts[1];
  const branch = parts[2];
  const filepath = parts.slice(3).join('/');

  return fetch(`https://raw.githubusercontent.com/${path}`)
      .then(response => response.text())
      .then(text => JSON.parse(text))
}