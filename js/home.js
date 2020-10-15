console.log("home")
import { PageList } from "./pagelist";
import moment from "moment";
import { spawnSliding } from "./animations";



const Home = (argument = "") => {

  console.log("Home", argument);
  pageContent.innerHTML = `
  `;

  console.log(pageContent)
  pageContent.innerHTML = `
  <div class="container_pimp" id='p-welcom'>
      <div id="welcome"><h1> Welcome to the hyper pro Game finder 🌱 </h1> </div>                          
      <div id="welcome-text"><h4> The Hyper Progame is the world’s premier event for
      computer and video games and related products. At The Hyper
      Progame, the video game industry’s top talent pack the Los
      Angeles Convention Center, connecting tens of thousands of
      the best, brightest, and most innovative in the interactive
      entertainment industry.</br> For three exciting days, leading-edge
      companies, groundbreaking new technologies, and never-before-seen
      products will be showcased. The Hyper Progame connects you with
      both new and existing partners, industry executives, gamers,
      and social influencers providing unprecedented exposure to the
      entire video game industry, all under one roof. This text seems
      familiar.
      </h4>
      </div>

      <div class="button-title">
        <a class="button" data-toggle="collapse" href="#collapseExample" aria-expanded="false" aria-controls="collapseExample">FILTER GAMES BY PLATFORM &#9663;</a>
      </div> 

          <div class="collapse" id="collapseExample">
            <div class="card card-body">
                  <div class='option' id='1'><h5>PC</h5></div>
                  <div class='option' id='2'><h5>PlayStation</h5></div>
                  <div class='option' id='3'><h5>Xbox</h5></div>
                  <div class='option' id='4'><h5>iOS</h5></div>
                  <div class='option' id='8'><h5>Android</h5></div>
                  <div class='option' id='7'><h5>Nintendo</h5></div>
                </div>
              </div>
            <div id="anticipatedgames">
          </div>
    </div>`
  spawnSliding("#p-welcom")
  Array.from(document.getElementsByClassName("option")).forEach((platform) => {
    platform.addEventListener("click", () => {
      PageList(`?dates=2019-09-01,2019-09-30&/platforms/lists/parents=${platform.id}`, document.getElementById("anticipatedgames"));
    })
  })

  PageList(`?dates=2019-10-10,${moment().format("YYYY[-]MM[-]DD")}&ordering=-added`, document.getElementById("anticipatedgames"));
}
export { Home };;