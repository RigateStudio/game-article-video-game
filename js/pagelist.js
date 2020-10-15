import { animin, animout } from './animations';

console.log("pagelist");
const PageList = (argument = "", defineTarget = document.getElementById("pageContent")) => {

  const target = defineTarget;
  console.log("Home", argument);

  const preparePage = () => {
    let cleanedArgument = argument.replace(/\s+/g, "-");

    let articles = ""

    const platformLogo = (platformName) => {

      switch (platformName) {
        case "PC":
          return `<img src="images/windows.svg"></img>`;
          break;
        case "Linux":
          return `<img src="images/linux.svg"></img>`;
          break;
        case "PlayStation":
        case "PS Vita":
        case "PSP":
        case "PlayStation 2":
        case "PlayStation 3":
        case "PlayStation 4":
        case "PlayStation 5":
          return `<img src="images/ps4.svg"></img>`;
          break;
        case "Xbox":
        case "Xbox 360":
        case "Xbox One":
        case "Xbox Series S/X":
          return `<img src="images/xbox.svg"></img>`;
          break;
        case "Nintendo Switch":
          return `<img src="images/switch.svg"></img>`;
          break;
        case "Wii":
        case "Wii U":
        case "Nintendo 64":
        case "Nintendo 3DS":
        case "Nintendo DS":
        case "Nintendo DSi":
        case "GameCube":
        case "Game Boy Color":
        case "Game Boy Advance":
        case "Game Boy":
        case "SNES":
        case "NES":
        case "Neo Geo":
          return `<img src="images/nintendo.svg"></img>`;
          break;
        case "Genesis":
        case "SEGA Saturn":
        case "SEGA CD":
        case "SEGA 32X":
        case "SEGA Master System":
        case "Dreamcast":
        case "Game Gear":
          return `<img src="images/sega.svg"></img>`;
          break;
        case "Atari 7800":
        case "Atari 5200":
        case "Atari 2600":
        case "Atari Flashback":
        case "Atari 8-bit":
        case "Atari ST":
        case "Atari Lynx":
        case "Atari XEGS":
        case "Jaguar":
          return `<img src="images/atari.svg"></img>`;
          break;
        case "macOS":
        case "Classic Macintosh":
        case "Apple II":
          return `<img src="images/mac.svg"></img>`;
          break;
        case "iOS":
          return `<img src="images/mobile.svg"></img>`;
          break;
        case "Android":
          return `<img src="images/android.svg"></img>`;
          break;
        case "3DO":
          return `<img src="images/3do.svg"></img>`;
          break;
        case "Commodore / Amiga":
          return `<img src="images/commodore.svg"></img>`;
          break;
        case "Web":
          return `<img src="images/web.svg"></img>`;
          break;
      }
    }
    const morphButtonList = () => {
      if (page === 1 && !argument.includes("/suggested")) {
        articles = ""
        document.getElementById("buttonList").innerHTML = "<button id='showmore'>Show more</button>"
        document.getElementById('showmore').addEventListener("click", moreCards);
      } else if (page === 3 && !argument.includes("/suggested")) {
        console.log("reversing show more button")
        document.getElementById("buttonList").innerHTML = "<button id='showless'>Show less</button>"
        document.getElementById('showless').addEventListener("click", lessCards);
      }
    }

    var page = 1;

    var currentArgument = ""

    const url = "https://api.rawg.io/api/games"

    const fetchList = (argument) => {

      let finalURL = url;
      console.log(argument)
      if (argument.includes("suggested")) {
        console.log("argument contains suggested")
        finalURL = url + argument
      } else if (argument) {
        finalURL = url + argument + "&page_size=9" + "&page=" + page
      }
      currentArgument = argument;

      console.log(finalURL)

      fetch(`${finalURL}`)
        .then((response) => response.json())
        .then((response) => {
          articles += `<div class="card-spawning d-flex flex-wrap justify-content-between" id="page${page}">`
          response.results.slice(0, 9).forEach((article) => {
            console.log(response);

            articles += `
                    <div class='card-box'>
                    <div class="card mb-4" id="card${response.results.indexOf(article)}" data-aos="fade-left">
                    <a class='image_box d-flex justify-content-center' id="${response.results.indexOf(article)}" href="#pagedetail/${article.id}"><img class="card-img-top img_sizer" src="${article.background_image}"></a>
                      <div class="card-body">
                        <h1 class="card-title"><a href="#pagedetail/${article.id}">${article.name}</a></h1>
                        <span id="logo">${article.platforms.map(system => {
              return platformLogo(system.platform.name)
            }).join(' ')}</span>
                      </div>
                      <div class="card-text">
                        <table>
                          <tr>
                            <th>Release date:</th>
                            <td>${article.released}</td>
                          </tr>
                          <tr>
                            <th>Genres:</th>
                            <td>${article.genres.map(genre => {
              return `${genre.name}`
            }).join(',')}</td>
                          </tr>
                          <tr>
                          <th>Average rating:</th>
                          <td>${article.rating}</td>
                        </tr>
                          <tr>
                            <th>Ratings:</th>
                            <td>${article.ratings_count}</td>
                          </tr>
                        </table>
                      </div>
                    </div>
                    </div>
                  `;
          });
          articles += `</div>`
          console.log(articles[0])
          document.querySelector(".container .articles").innerHTML = articles

          Array.from(document.getElementsByClassName("image_box")).forEach((imageBox) => {
            const buildInjectVideo = () => {
              const injectVideo = () => {
                console.log("injecting video")
                animin(`#card${imageBox.id}`)
                if (response.results[imageBox.id].clip.clip) {
                  imageBox.innerHTML = `
                          <video height='180' muted="muted">
                            <source src="${response.results[imageBox.id].clip.clip}" type="video/mp4" >
                          </video>
                         `
                }
                imageBox.children[0].play()
              }
              return injectVideo
            }
            const buildInjectImg = () => {
              const injectImg = () => {
                console.log("injecting img")
                animout(`#card${imageBox.id}`)
                imageBox.innerHTML = `
                          <img class="card-img-top" src="${response.results[imageBox.id].background_image}">
                         `
                imageBox.parentNode.addEventListener("mouseenter", buildInjectVideo(), { once: true })
              }
              return injectImg
            }
            console.log(buildInjectVideo())
            imageBox.parentNode.addEventListener("mouseenter", buildInjectVideo(), { once: true })
            imageBox.parentNode.addEventListener("mouseleave", buildInjectImg())
          })
        });
      morphButtonList()
    };

    const moreCards = () => {
      page++
      console.log(page)
      fetchList(currentArgument)
      document.querySelector(".container .articles").insertAdjacentHTML("afterbegin", articles)
    }
    const lessCards = () => {
      const removing = Array.from(document.querySelector(`.articles`).children).slice(-1)[0]
      removing.classList.add("card-depoping")
      removing.remove
      const buildRemove = () => {
        removing.remove()
      }
      setTimeout(buildRemove, 1000)
      page--
      morphButtonList()
      console.log(page)
    }




    fetchList(cleanedArgument);
  };

  const render = () => {
    target.innerHTML = `
        <section class="container">
          <div class="articles d-flex flex-column">...loading</div>
          <div id="buttonList" ></div>
        </section>
      `;

    preparePage();
  };

  render();
};

export { PageList };