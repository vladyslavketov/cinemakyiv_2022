const refs = {
  projectsFilterList: document.querySelector('.projects__filter-list'),
  projectsItems: document.querySelectorAll('.projects__item'),
};

refs.projectsFilterList.addEventListener('click', onProjectsFilterListClick);

function onProjectsFilterListClick(e) {
  if (e.target.nodeName !== 'BUTTON') {
    return;
  };

  setClassActiveToFilterBtn(e);
  setClassHideToProjectsItem(e);
}; 

function setClassActiveToFilterBtn(e) {
  const currentFilterBtn = document.querySelector('.projects__filter-btn.current');

  if (currentFilterBtn) {
    currentFilterBtn.classList.remove('current');
  }

  e.target.classList.add('current');
};

function setClassHideToProjectsItem(e) {
  const currentCategory = e.target.dataset.filter;
  console.log(currentCategory);

  for (const item of refs.projectsItems) {
    if (item.dataset.filter !== currentCategory) {
      item.classList.add("hide");
    } else {
      item.classList.remove("hide");
    }
  }
};