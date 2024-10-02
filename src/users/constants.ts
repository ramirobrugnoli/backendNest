export const jwtConstants = {
  secret:
    'DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.',
};

export enum AdminStatus {
  ADMIN = 'admin',
  USER = 'user',
  SUPERADMIN = 'superadmin',
}
