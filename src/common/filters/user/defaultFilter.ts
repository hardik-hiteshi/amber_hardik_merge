export const filterRules = {
  readFilter: {
    private: [
      'name',
      'location',
      'contact',
      'history',
      'login',
      'niceName',
      'profile',
      'image',
      'rank',
      'info',
      'status',
      'favorites',
      'todo',
      'badges',
      'recipesCounter',
      'region',
      'role',
      'shopItems',
      'dietPreferences',
      'memberConditions',
      'communityConditions',
      'internationalConditions',
      'newsletterConditions',
      'following',
      'nutritionalPreferences',
    ],
    public: [
      'name.displayName',
      'niceName',
      'profile.language',
      'profile.about',
      'profile.social',
      'profile.lastViewNotifications',
      'image',
      'rank',
      'favorites',
      'todo',
      'badges',
      'location.town',
      'recipesCounter',
      'region',
      'role',
      'dietPreferences',
      'following',
    ],
    admin: [
      'name',
      'location',
      'contact',
      'history',
      'login',
      'niceName',
      'password',
      'profile',
      'image',
      'rank',
      'info',
      'status',
      'favorites',
      'badges',
      'recipesCounter',
      'role',
      'region',
      'shopItems',
      'dietPreferences',
      'following',
      'nutritionalPreferences',
    ],
  },
  writeFilter: {
    private: [
      'name',
      'location',
      'contact',
      'history',
      'login',
      'niceName',
      'profile',
      'image',
      'rank',
      'info',
      'status',
      'favorites',
      'todo',
      'badges',
      'recipesCounter',
      'region',
      'shopItems',
      'dietPreferences',
      'following',
      'nutritionalPreferences',
    ],
    public: [
      'name.displayName',
      'niceName',
      'profile.language',
      'profile.about',
      'profile.social',
      'profile.lastViewNotifications',
      'image',
      'rank',
      'favorites',
      'todo',
      'badges',
      'location.town',
      'recipesCounter',
      'region',
      'dietPreferences',
    ],
    admin: [
      'name',
      'location',
      'contact',
      'history',
      'login',
      'niceName',
      'password',
      'profile',
      'image',
      'rank',
      'info',
      'status',
      'favorites',
      'todo',
      'badges',
      'recipesCounter',
      'region',
      'shopItems',
      'dietPreferences',
      'following',
      'nutritionalPreferences',
    ],
  },
  defaultFilterRole: 'public',
  sanitize: true,
  compat: false,
};
