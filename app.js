
document.addEventListener('DOMContentLoaded', (event) => {

  // refs
  const display = document.getElementById('fetched-response')
  // get page location origin
  const origin = window.location.origin
  // set api endpoints
  const api = {
    event: `${origin}/api/v1/event`,
    context: `${origin}/api/v1/context`
  }
  // fetch api by endpoint
  // then update given HTMLElement text content
  const fetchAPI = (url, HTMLElement) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // inject response to HTMLElement
        HTMLElement.innerHTML = JSON.stringify(data, 2, ' ')
        // highlight HTMLElement
        hljs.highlightElement(HTMLElement)
        // add .active selector to HTMLElement parent Element
        HTMLElement.parentElement.classList.add('active')
      })
      .catch((error) => {
        // print error
        console.error(error)
      })
  }
  // handle click events
  // fetch data
  document
    .getElementById('fetch-event')
    .addEventListener('click', (e) => {
      e.preventDefault()
      fetchAPI(api.event, display)
    })
  document
    .getElementById('fetch-context')
    .addEventListener('click', (e) => {
      e.preventDefault()
      fetchAPI(api.context, display)
  })
})
