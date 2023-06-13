const toggle_content = () => {
    document.querySelectorAll('#landingpage .lpNav__button').forEach(item => {
        item.addEventListener('click', event => {
            event.preventDefault()
            const switch_content = () => {
                const target = item.getAttribute("href")
                const active_button = document.querySelector('.lpNav__button--active')
                const active_content = document.querySelector('.lpContent--visible')
                active_button.classList.remove('lpNav__button--active')
                active_content.classList.remove('lpContent--visible')
                item.classList.add('lpNav__button--active')
                document.querySelector(target).classList.add('lpContent--visible')
            }

            item.classList.contains('lpNav__button--active') ? 0 : switch_content()
        })
    })
}
toggle_content()