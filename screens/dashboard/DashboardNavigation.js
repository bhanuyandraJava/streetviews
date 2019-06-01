import React from "react";
import {createAppContainer, createSwitchNavigator} from "react-navigation";
import Dashboard from './Dashboard'
import SearchResults from '../search/SearchScreenNavigation'
import ContributeScreen from '../contribute/ContributeScreen'
const DashBoardNavigation = createSwitchNavigator(
    {
        Home: Dashboard,
        search: SearchResults,
        contribute: ContributeScreen
    },
    {
        initialRouteName: "Home"
    }
);

export default createAppContainer(DashBoardNavigation);


