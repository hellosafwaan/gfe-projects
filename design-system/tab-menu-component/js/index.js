const tabsListElement = document.querySelector('.tabs__list');

tabsListElement.addEventListener('click', (event) => {
    let activeTab = document.querySelector('.tabs__trigger--active');
    const item = event.target.closest('.tabs__trigger');
    if(!item || item === activeTab) return;
    if (activeTab) activeTab.classList.remove('tabs__trigger--active')
    item.classList.add('tabs__trigger--active');

    const currentTabValue = item.dataset.tab
    let currentPanelElement = document.querySelector('.tabs__panel--active');
    currentPanelElement?.classList.remove('tabs__panel--active');
    document.getElementById(`${currentTabValue}-panel`).classList.add('tabs__panel--active')
})