export enum Routes {
    HOME = '/:type',
    LOGIN = '/auth/login',
    ABOUT = '/about',
    DASHBOARD = '/dashboard'
}

export enum DASHBOARD_TYPES {
    DASHBOARD = 'dashboard',
    REPOSITORY = 'repository',
    INGESTION = 'ingestion',
    WORKFLOW = 'workflow',
    REPORTING = 'reporting',
    ADMIN = 'admin'
}

export function getRoute(route: Routes | DASHBOARD_TYPES): string {
    return `/${route}`;
}
