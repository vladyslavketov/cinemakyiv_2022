// === import ===
import libProjects from '../lib/libProjects.JSON' assert {type: "json"};

// === const ===
const refs = {
  projectList: document.querySelector("ul.projects__list"),
  projectsBtnPlay: document.querySelectorAll(".projects__play-btn"),
}
const projectsGalleryMarkup = createlibProjectsMarkup(libProjects);

// === action ===
// window.addEventListener('load', () => {
//   refs.projectList.insertAdjacentHTML('beforeend', projectsGalleryMarkup);
// })

refs.projectList.insertAdjacentHTML('beforeend', projectsGalleryMarkup);
refs.projectList.addEventListener('click', playProjectVideo);

// === funcion ===
function createlibProjectsMarkup(libProjects) {
  return libProjects
    .map(({ projectName, category }) => {
      return ` 
        <li class="projects__item" data-filter="${category}">
          <img class="projects__img-cover js-coverPlay" src="./images/projects/cover/${category}/${projectName}.webp" alt="${projectName}" width="320" height="280"/>
          <svg class="projects__play-svg" width="60" height="60">
            <use href="./images/icons/icons.svg#play_youtube"></use>
          </svg>
        </li>
      `;
    })
    .join('');
};

function getProjectNameFromCoverImg(e) { 
  return e.target.getAttribute('alt');
};

function getProjectEmbedSrc(projectName) {
  let projectEmbedSrc;

  for (const item of libProjects) {
    if (item.projectName === projectName) {
      projectEmbedSrc = item.embedSrc;

      return projectEmbedSrc;
    }
  };
}

function playProjectVideo (e) {
  if (!e.target.classList.contains("js-coverPlay")) {
    return;
  }

  const projectName = getProjectNameFromCoverImg(e);
  const projectEmbedSrc = getProjectEmbedSrc(projectName);
  // console.log(projectName);
  // console.log(projectEmbedSrc);
  
  const instance = basicLightbox.create(`
    <iframe class="projects__play-iframe" src="${projectEmbedSrc}" frameborder="0" allowfullscreen></iframe>
    `, {
    onShow: (instance) => {
      document.addEventListener('keydown', function(e){
	      if(e.key === "Escape"){
          // console.log('this is ESCAPE')
          instance.close();
	      }
        });
      }
    });

  instance.show(); 
};