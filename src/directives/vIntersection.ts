const name = 'intersection'
let observer: IntersectionObserver
const mounted = (el: any, binding: any) => {
  const options = {
    rootMargin: '0px',
    threshold: 1.0
  }
  const callback = function (entries: any, observer: any) {
    if (entries[0].isIntersecting) binding.value()
  }
  observer = new IntersectionObserver(callback, options)
  observer.observe(el)
}
const unmounted = (el: any) => {
  observer.unobserve(el)
}
const directive = {
  name,
  mounted,
  unmounted
}

export default directive
