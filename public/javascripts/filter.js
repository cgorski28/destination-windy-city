const dropDown = document.querySelector('.dropdown-menu')

dropDown.addEventListener('click', function(e){
    let filterValue = e.target.innerText.toLowerCase().slice(0, -1)
    if(filterValue === 'activitie'){
        filterValue = 'activity'
    }
    const allCards = document.querySelectorAll('.card')
    Array.from(allCards).forEach(function(item){
        const category = item.querySelector('span').innerText
        if(category.toLowerCase().indexOf(filterValue) === -1){
            item.style.display='none'
        } else {
            item.style.display = 'block'
        }
    })
})