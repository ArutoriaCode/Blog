export default (response, $alert) => {
  console.log("🚀 ~ file: handlerException.js ~ line 2 ~ $alert", $alert)
  if (!process.client) {
    return
  }
  
  console.log("🚀 ~ file: handlerException.js ~ line 2 ~ $alert", $alert)
}
