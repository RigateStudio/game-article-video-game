import '../sass/styles.scss';
import 'bootstrap'

let pageArgument;

const setRoute = () => {
  let path = window.location.hash.substring(1).split("/");
  pageArgument = path[1] || "";
  
  var pageContent = document.getElementById("pageContent");
  console.log(path)
  routes[path[0]](pageArgument);
  return true;
};
window.addEventListener("hashchange", () => setRoute());
window.addEventListener("DOMContentLoaded", () => setRoute());

const searchBar = document.getElementById('searchBar');
console.log(searchBar.value);

var searching = function searching() {
  console.log(searchBar.value);
  window.location = getElementById;
};

document.getElementById("searchButton").addEventListener("click", searching);
console.log(searchBar);

/*
var selector = document.getElementById('Game');
var 
function search()
*/

import { routes } from "./route";

