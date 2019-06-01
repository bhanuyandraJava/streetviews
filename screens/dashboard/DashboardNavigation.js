import React from "react";
import {createAppContainer, createSwitchNavigator} from "react-navigation";
import Dashboard from './Dashboard'
import SearchResults from '../search/SearchScreenNavigation'

const DashBoardNavigation = createSwitchNavigator(
    {
        Home: Dashboard,
        search: SearchResults
    },
    {
        initialRouteName: "Home"
    }
);

export default createAppContainer(DashBoardNavigation);


