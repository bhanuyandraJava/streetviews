import React from "react";
import {createAppContainer, createSwitchNavigator} from "react-navigation";
import SearchResultsScreen from './SearchResultsScreen';
import Dashboard from '../dashboard/Dashboard'

const SearchScreenNavigation = createSwitchNavigator({
        SearchResults: SearchResultsScreen,
        Home: Dashboard
    },
    {
        initialRouteName: "SearchResults"
    })
export default createAppContainer(SearchScreenNavigation);