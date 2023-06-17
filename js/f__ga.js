const eventGA = () => {
    document.querySelectorAll('#landingpage .gaTrack').forEach(item => {
        item.addEventListener('click', event => {
            /* // Only for local purpose - remove when its rdy to go
            event.preventDefault() */
            
            let itemName = item.getAttribute("data-ga")
            let itemHref = item.getAttribute("href")
            let itemGAel =  itemName + " - " + itemHref

            window.dataLayer = window.dataLayer || [],
            window.dataLayer.push({
                'event': 'GA360-event',
                'ga.ec': 'LP - Lego Shop',
                'ga.ea': 'Buttons',
                'ga.el': itemGAel,
                'interaction': true
            });
        })
    })
} 
eventGA()