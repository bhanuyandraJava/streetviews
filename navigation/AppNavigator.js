import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import SearchResultsScreen from '../screens/search/SearchResultsScreen';
import Dashboard from '../screens/dashboard/DashboardNavigation';

export default createAppContainer(createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: Dashboard,
}));