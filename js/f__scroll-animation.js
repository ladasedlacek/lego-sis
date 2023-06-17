const run_scroll_animation = () => {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting)  {
                entry.target.classList.add('runAnimation--active')
            }
        })
    },
    {
        threshold: .25
    })

    const elements = document.querySelectorAll('.runAnimation')
    elements.forEach((element) => observer.observe(element))
}
run_scroll_animation()