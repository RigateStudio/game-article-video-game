console.log("pagelist");
const PageList = (argument = "") => {
  console.log("Home", argument);

    const preparePage = () => {
      let cleanedArgument = argument.replace(/\s+/g, "-");
      let articles = "";
  
      const fetchList = (url, argument) => {
        let finalURL = url;
        if (argument) {
          finalURL = url + "?search=" + argument;
        }
  
        fetch(`${finalURL}`)
          .then((response) => response.json())
          .then((response) => {
            response.results.forEach((article) => {
              console.log(response);
              articles += `
                    <div class="card">
                    <a href="#pagedetail/${article.id}"><img class="card-img-top" src="${article.background_image}"></a>
                      <div class="card-body">
                        <h1 class="card-title"><a href="#pagedetail/${article.id}">${article.name}</a></h1>
                        <span>${article.platforms.map(system => {
                          return `<button>${system.platform.name}</button>`
                        }).join(' ')}</span>
                      </div>
                    </div>
                  `;
            });
            document.querySelector(".page-list .articles").innerHTML = articles;
          });
      };
  
      fetchList("https://api.rawg.io/api/games", cleanedArgument);
    };
  
    const render = () => {
      pageContent.innerHTML = `
        <section class="page-list">
          <div class="articles">...loading</div>
        </section>
      `;
  
      preparePage();
    };
  
    render();
  };

  export { PageList };