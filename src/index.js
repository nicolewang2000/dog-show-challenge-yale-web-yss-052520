document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('tbody#table-body')
    const dogForm = document.querySelector('form#dog-form')
    const submit = dogForm[3]
    const editBtn = document.querySelectorAll('button')
    
    getDogs()

    function getDogs(){
        fetch('http://localhost:3000/dogs')
        .then (res => res.json())
        .then (dogs => dogs.forEach(addDog))
    }

    function addDog(dog){
        const tr = document.createElement('tr')
        tr.dataset.id = dog.id

        const nameTd = document.createElement('td')
        nameTd.innerText = dog.name

        const breedTd = document.createElement('td')
        breedTd.innerText = dog.breed

        const sexTd = document.createElement('td')
        sexTd.innerText = dog.sex

        const btnTd = document.createElement('td')
        const btn = document.createElement('button')
        btn.innerText = 'Edit Dog'
        btn.dataset.id = dog.id
        btnTd.append(btn) 

        tr.append(nameTd, breedTd, sexTd, btnTd)
        tableBody.append(tr)
    }

    document.addEventListener('click', () => {
        if (event.target.tagName == "BUTTON"){
            getDog(event.target.dataset.id)
        }
        else if (event.target == submit){
            event.preventDefault()
            editDog(event.target.parentElement.dataset.id)
        }
    })

    function getDog(id){
        fetch(`http://localhost:3000/dogs/${id}`)
        .then (res => res.json())
        .then (dog => {
            dogForm.name.value = dog.name, 
            dogForm.breed.value = dog.breed, 
            dogForm.sex.value = dog.sex,
            dogForm.dataset.id = dog.id
        })
    }

    function editDog(id){
        const configObj = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: dogForm.name.value, 
                breed: dogForm.breed.value, 
                sex: dogForm.sex.value
            })
        }
        fetch(`http://localhost:3000/dogs/${id}`, configObj)
        .then (res => res.json())
        .then (dog => {
            let row = document.querySelector(`tr[data-id= '${id}']`).children
            row[0].innerText = dog.name
            row[1].innerText  = dog.breed
            row[2].innerText  = dog.sex
            dogForm.reset()
        })
    }
})