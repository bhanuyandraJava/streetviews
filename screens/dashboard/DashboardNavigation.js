import React from "react";
import {createAppContainer, createSwitchNavigator} from "react-navigation";
import Dashboard from './Dashboard'
import SearchResults from '../search/SearchScreenNavigation'
import ContributeLocationScreen from '../contribute/ContributeLocationScreen'
import ContributeOptions from '../contribute/ContributeOptionsScreen'
import ContributeVoiceScreen from '../contribute/ContributeVoiceScreen'
import ContributePictureScreen from '../contribute/ContributePictureScreen'
import SocialScreen from '../social/SocialScreen'
import SearchVoiceResultsScreen from '../search/SearchVoiceResultsScreen'
import ContributeTakePictureScreen from '../contribute/ContributeTakePictureScreen'
const DashBoardNavigation = createSwitchNavigator(
    {
        Home: Dashboard,
        search: SearchResults,
        voiceSearch: SearchVoiceResultsScreen,
        contribute: ContributeLocationScreen,
        uploadOptions: ContributeOptions,
        contributeVoice: ContributeVoiceScreen,
        contributePicture: ContributePictureScreen,
        contributeTakePicture: ContributeTakePictureScreen,
        social: SocialScreen
    },
    {
        initialRouteName: "Home"
    }
);

export default createAppContainer(DashBoardNavigation);


