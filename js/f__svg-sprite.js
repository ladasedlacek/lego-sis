const sprite_engine = () => {
    fetch('https://cdn.alza.cz/Foto/or/lp/lego-sis/build/img/sprite.svg?ver=1.02')
    .then(data => data.text())
    .then(text => {
        const sprite_element = document.createElement("div")
        const landingpage_target = document.querySelector('#landingpage')
        sprite_element.innerHTML = text
        landingpage_target.append(sprite_element);
        landingpage_target.lastElementChild.classList.add("svgsprite")
    })
}
sprite_engine()