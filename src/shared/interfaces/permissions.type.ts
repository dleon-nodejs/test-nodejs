export type PrivilegeEntity = {
  id: string;
  cod: string;
};

export type Privilege = {
  _id: string;
  cod: string;
  privilege_cod: string;
  name: string;
  entity: PrivilegeEntity;
};

export type PermissionResponse = {
  user: string;
  permissions: Privilege[];
};
