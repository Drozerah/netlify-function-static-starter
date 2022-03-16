
document.addEventListener('DOMContentLoaded', (event) => {

  const display_response = document.getElementById('fetched-response')
  const evt = document.getElementById('fetch-event')
  const ctx = document.getElementById('fetch-context')
  
  evt.addEventListener('click', (e) => {
    e.preventDefault()
    fetch('http://localhost:8888/api/v1/event')
    .then((response) => response.json())
    .then((data) => {
      display_response.innerHTML = JSON.stringify(data, 2, ' ')
      hljs.highlightElement(display_response)
      display_response.parentElement.classList.add('active')
    }).catch((error) => {
      console.log(error)
    })
  })
  ctx.addEventListener('click', (e) => {
    e.preventDefault()
    fetch('http://localhost:8888/api/v1/context')
      .then((response) => response.json())
      .then((data) => {
        display_response.innerHTML = JSON.stringify(data, 2, ' ')
        hljs.highlightElement(display_response)
        display_response.parentElement.classList.add('active')
      }).catch((error) => {
        console.log(error)
      })
  })
})

