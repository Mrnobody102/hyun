export const routesByTab = {
    home: '/',
    skills: '/skills',
    projects: '/projects',
    'personal-projects': '/personal-projects',
    articles: '/articles',
    contact: '/contact',
};

export function getRouteByTab(tab) {
    return routesByTab[tab] || routesByTab.home;
}
