export interface RouteDefinition {
  path: string;
  name: string;
  icon: string;
  role?: string;
}

export const routesFactory = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "fas fa-tachometer-alt",
    role: "user-gaia"
  },
  {
    id: 2,
    path: "/customers-list",
    name: "Clientes",
    icon: "fas fa-users",
    role: "list-group"
  },
  {
    id: 3,
    path: "/investment-profile-list",
    name: "Perfil de Investimento",
    icon: "fas fa-donate",
    role: "list-group"
  },
  {
    id: 4,
    path: "/investment-plans-list",
    name: "Planos de Investimento",
    icon: "fas fa-poll",
    role: "list-group"
  }
];