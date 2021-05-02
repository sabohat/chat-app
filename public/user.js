let photoInput = document.getElementById('img-upload')

let formData = new FormData()
console.log('starting..')
photoInput.addEventListener('change', event => {
    formData.append('photo', event.target.files[0])
    fetchData()
})

async function fetchData(){
    try {
        let response = await fetch('/photo', {
            method : "POST", 
            body: formData
        })

        response = await response.json()
        console.log(response)
    } catch(e) {
        console.log(e)
    }
}