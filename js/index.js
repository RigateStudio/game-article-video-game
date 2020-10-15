import '../sass/styles.scss';
import { routes } from "./route";
import 'bootstrap';
import moment from "moment";
console.log(moment().format("YYYY[-]MM[-]DD"))

let pageArgument;

const setRoute = () => {
  let path = window.location.hash.substring(1).split("/");
  pageArgument = path[1] || "";

  console.log(path)
  routes[path[0]](pageArgument);
  return true;
};

window.addEventListener("hashchange", () => setRoute());
window.addEventListener("DOMContentLoaded", () => setRoute());

const searchBar = document.getElementById('searchBar');
console.log(searchBar.value);

var searching = () => {
  console.log(searchBar.value);
  window.location.hash = "#pagelist/?search=" + searchBar.value
};

var keypress = (e) => {
  console.log(e)
  if (e.key === 'Enter') {
    console.log(searchBar.value);
    window.location.hash = "#pagelist/?search=" + searchBar.value
  }
};

window.addEventListener("keypress", keypress);

