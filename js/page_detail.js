import { PageList } from "./pagelist";
import { spawnSliding } from "./animations";
console.log("pagedetail");
const PageDetail = (argument) => {
  console.log("Home", argument);

  const preparePage = () => {
    let cleanedArgument = argument.replace(/\s+/g, "-");


    const fetchGame = (url, argument) => {
      let finalURL = url + argument;
      console.log(finalURL)
      fetch(`${finalURL}`)
        .then((response) => response.json())
        .then((response) => {
          console.log(response)
          let { tags, id, genres, publishers, parent_platforms, developers, website, stores, name, released, description, background_image, clip, rating, ratings_count } = response;
          if (background_image) {
            document.querySelector('#background_image').innerHTML = `
              <div id='heroBackground' class='background_image d-flex flex-row-reverse' style='height: ${Math.round(window.innerHeight / 2)}px; background-image: url(${background_image})'></div>
            `
          }
          if (website) {
            document.querySelector('.background_image').innerHTML = `
              <a target="blank" class="website-button ml-4 mr-4 align-self-end" href='${website}'><div class='d-flex mb-3 mr-3' id='website'>Check Website<i class="ml-2 align-self-center fas fa-play"></i></div></a>
            `}
          if (name) {
            document.querySelector('#name').innerHTML = `
              <h1 class="front-title">${name}</h1>
            `}
          if (rating) {
            document.querySelector('#rating').innerHTML = `
              <h3 class="subtitle">${rating}/5 - ${ratings_count} votes</h4>
            `}
          if (description) {
            document.querySelector('#description').innerHTML = `
              <h2 class="subtitle"=>DESCRIPTION</h2>
              <p class="description">${description}</p>
            `}
          if (released) {
            document.querySelector('#informations').insertAdjacentHTML("beforeend", `
              <div class='mr-5'><h5 class="small-title">Release date</h5><p>${released}</p></div>
            `)
          }
          if (developers) {
            document.querySelector('#informations').insertAdjacentHTML("beforeend", `
              <div class='mr-5'>
              <h5 class="small-title">Developer</h5>
              <div class='d-flex flex-wrap'>
              ${developers.map((developer) => {
              return `<a class='animed-link' href='#pagelist/?developers=${developer.id}'>${developer.name}</a>`
            }).join()
              }</div>
              </div>
            `)
          }
          if (parent_platforms) {
            document.querySelector('#informations').insertAdjacentHTML("beforeend", `
              <div  class='mr-5'>
              <h5 class="small-title">Platform</h5>
              <div class='d-flex flex-wrap'>
              ${parent_platforms.map((parent_platform) => {
              return `<a class='animed-link' href='#pagelist/?platfoms=${parent_platform.platform.id}'>${parent_platform.platform.name}</a>`
            }).join()
              }</div>
              </div>
            `)
          }
          if (publishers) {
            document.querySelector('#informations').insertAdjacentHTML("beforeend", `
              <div  class='mr-5'>
              <h5 class="small-title">Publisher</h5>
              <div class='d-flex flex-wrap'>
              ${publishers.map((publisher) => {
              return `<a class='animed-link' href='#pagelist/?publishers=${publisher.id}'>${publisher.name}</a>`
            }).join()
              }</div>
              </div>
            `)
          }
          if (genres) {
            document.querySelector('#informations').insertAdjacentHTML("beforeend", `
              <div  class='mr-5'>
              <h5 class="small-title">Genre</h5>
              <div class='d-flex flex-wrap'>
              ${genres.map((genre) => {
              return `<a class='animed-link' href='#pagelist/?genres=${genre.id}'>${genre.name}</a>`
            }).join()
              }</div>
              </div>
            `)
          }
          if (tags) {
            document.querySelector('#informations').insertAdjacentHTML("beforeend", `
              <div  class='mr-5'>
              <h5 class="small-title">Tags</h5>
              <div class='d-flex flex-wrap'>
              ${tags.map((tag) => {
              return `<a class='animed-link' href='#pagelist/?tags=${tag.id}'>${tag.name}</a>`
            }).join()
              }</div>
              </div>
            `)
          }
          if (store) {
            document.querySelector('#store').innerHTML = `
              <h2 class="subtitle">BUY</h2>
              <div class='d-flex flex-wrap'>${stores.map((store) => {
              return `<a class='animed-link' href='${store.url}' target='blank'>${store.store.name}</a>`
            })
              }</div>
            `}
          if (clip) {
            document.querySelector('#clip').innerHTML = `
              <h2 class="subtitle">TRAILER</h2>
              <video width='${document.querySelector(".article").offsetWidth}' controls="controls" src="${clip.clip}"></video>
            `}
          PageList(`/${id}/suggested`, document.getElementById("similar_games"))
          spawnSliding(".page-detail")
        })
      fetch(`${finalURL}/screenshots`)
        .then((response) => response.json())
        .then((response) => {
          console.log(response)
          let screenshotsDatas = response.results.slice(0, 4)
          if (screenshotsDatas[0]) {
            document.querySelector("#screenshots").innerHTML = `
              <h2 class="subtitle">SCREENSHOTS</h2>
              <div class='d-flex flex-wrap justify-content-between'>
              ${screenshotsDatas.map((sceenshotData) => {
              return `<a href='${sceenshotData.image}' target='blank' class=' ml-auto mr-auto'><img class='screenshots mb-5' src='${sceenshotData.image}' alt="game'screenshot"></a>`
            })}
              </div>`
          }
        })
      fetch(`${finalURL}/youtube`)
        .then((response) => response.json())
        .then((response) => {
          console.log(response)
          let youtubeDatas = response.results.slice(0, 4)
          if (youtubeDatas[0]) {
            document.querySelector("#youtube").innerHTML = `
              <h2 class="subtitle">YOUTUBE</h2>
              <iframe width="100%" height="${document.querySelector(".article").offsetWidth * 0.6}" src="https://www.youtube.com/embed/${youtubeDatas.shift().external_id}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              <div class='d-flex flex-wrap justify-content-between'>
              ${youtubeDatas.map((youtubeData) => {
              return `<iframe class='ml-auto mr-auto' width="300" height="200" src="https://www.youtube.com/embed/${youtubeData.external_id}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
            })}
              </div>`
          }
        })
    }
    fetchGame("https://api.rawg.io/api/games/", cleanedArgument);
  };

  const render = () => {
    pageContent.innerHTML = `
    <section style='opacity: 0' class="page-detail">
      <div class='h-100'id='background_image'></div>
      <div class="article container">
        <div class='d-flex justify-content-between'>
          <div id='name'></div>
          <div id='rating' class='align-self-center'></div>
        </div>
        <div id='description'></div>
        <div class='d-flex flex-wrap' id='informations'></div>
        <div class='mb-5' id='store'></div>
        <div id='clip'></div>
        <div id='screenshots'></div>
        <div id='youtube'></div>
        <h2 class="subtitle">SIMILAR GAMES</h2>
        <div id=similar_games></div>
      </div>
    </section>`;
    preparePage();
  };

  render();
};

export { PageDetail };