export async function verifications () {
  return fetch(process.env.PUBLIC_URL + "/ether.json").then(res => res.json())
}
