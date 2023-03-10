const searchBar = document.forms[0].querySelector('input')

searchBar.addEventListener('keyup', function(e){
    const term = e.target.value.toLowerCase()
    const allCards = document.querySelectorAll('.card')
    Array.from(allCards).forEach(function(item){
        const title = item.querySelector('h5').textContent
        if(title.toLowerCase().indexOf(term) === -1){
            item.style.display='none'
        } else {
            item.style.display = 'block'
        }
    })
})