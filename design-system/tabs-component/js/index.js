const tabsListElement = document.querySelector('.tabs__list');

tabsListElement.addEventListener('click', (event) => {
    let activeTab = document.querySelector('.tabs__trigger--active');
    const item = event.target.closest('.tabs__trigger');
    if(!item || item === activeTab) return;
    if (activeTab) {
        activeTab.classList.remove('tabs__trigger--active')
        activeTab.setAttribute('aria-selected', 'false')
    }
    item.classList.add('tabs__trigger--active');
    item.setAttribute('aria-selected', 'true')

    const currentTabValue = item.dataset.tab
    let currentPanelElement = document.querySelector('.tabs__panel--active');
    currentPanelElement?.classList.remove('tabs__panel--active');
    currentPanelElement?.setAttribute('hidden', '')
    const nextPanel = document.getElementById(`${currentTabValue}-panel`)
    nextPanel?.classList.add('tabs__panel--active')
    nextPanel?.removeAttribute('hidden')
    
})