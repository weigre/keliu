let navIndex = localStorage.getItem('navIndex')||0

let navActive = document.querySelectorAll('.navActive')
navActive.forEach((item, index) => {
    if(index == navIndex){
        item.classList.add('active')
    }
    else{
        item.addEventListener('click', (e) => {
            //   e.preventDefault() 
                navActive.forEach((item, index2) => {
                    item.classList.remove('active')
                })
                item.classList.add('active')
                if (index === navIndex) {
                    return
                }
                navIndex = index
              localStorage.setItem('navIndex', index)
            })
    }
        
})