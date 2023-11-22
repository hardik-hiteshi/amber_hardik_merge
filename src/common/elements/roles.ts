const roles: string[] = [];

if (
  !process.env.RI_ENV ||
  (process.env.RI_ENV && process.env.RI_ENV == 'development')
) {
  roles.push('user', 'admin', 'superadmin', 'regionadmin', 'recipeadmin');
} else if (process.env.RI_ENV == 'production_mycook') {
  roles.push(
    'user',
    'operator',
    'factory',
    'machine',
    'admin',
    'superadmin',
    'regionadmin',
    'recipeadmin',
  );
} else {
  roles.push('user', 'admin', 'regionadmin', 'recipeadmin');
}

export default roles;
