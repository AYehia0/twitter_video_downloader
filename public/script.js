const form = document.getElementById('submit-form')
const linkInput = document.getElementById('get-link')
const resultContatiner = document.querySelector('.result')

const getDataFromApi = async (apiRoute, link) => {

    const res = await fetch(apiRoute, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({link})
    })

    const data = await res.json()

    return data
}

// video
// <video controls class="vid">
//     <source src="${data.download_url}" type="video/mp4">
// </video> 

// displaying the tweet's info
const showResult = (data) => {

    const htmlTemp = `
        <div class="result">
            <img src="${data.video_img}" alt="">

            <span class="duration">Duration: ${data.duration}</span>

            <a href="${data.download_url}" download><button class="download-btn">Download Vid</button></a>

        </div>
    `
    resultContatiner.innerHTML = htmlTemp

}

form.addEventListener('submit', async (e) => {

    // preventing the page from reloading
    e.preventDefault()

    // getting the link
    const link = linkInput.value

    if (link){
        const data = await getDataFromApi('/send-link', link)

        // showing the data to the html
        showResult(data)

        // resetting 
        linkInput.value = ""
    }
})
