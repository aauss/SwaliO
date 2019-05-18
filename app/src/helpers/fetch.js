const SIGNER = {
  URL: "http://localhost:8080",
}
export const postToEndpoint = (endpoint, data) => {
  return fetch(`${SIGNER.URL}${endpoint}`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}

export const fetchFromEndpoint = async (endpoint) => {
  const response = await fetch(`${SIGNER.URL}${endpoint}`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  });
  return await response.json()
}
