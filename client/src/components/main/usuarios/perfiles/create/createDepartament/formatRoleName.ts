enum RoleName {
  ADMIN = "ADMIN",
  ROLE = "ROLE",
  USER = "USER",
  MANAGER = "MANAGER",
  CASHIER = "CASHIER",
  HOSTESS = "HOSTESS",
  WAITER = "WAITER",
}

export const formatRoleName = (roleName: string) => {
  switch (roleName) {
    case RoleName.ADMIN:
      return "Administrador";
    case RoleName.ROLE:
      return "Rol";
    case RoleName.USER:
      return "Entradas y salidas";
    case RoleName.MANAGER:
      return "Manager";
    case RoleName.CASHIER:
      return "Cajero";
    case RoleName.HOSTESS:
      return "Hostes";
    case RoleName.WAITER:
      return "Mesero";
    default:
      return "Rol";
  }
};