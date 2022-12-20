import {
    ANIME_ROUTE,
    COLLECTION_ROUTE,
    LOGIN_ROUTE, MY_COLLECTION_ROUTE,
    PROFILE_ROUTER,
    REGISTRATION_ROUTE
} from "./utils/consts";
import Anime from "./Pages/Anime";
import AuthPage from "./Pages/AuthPage";
import CollectionPage from "./Pages/CollectionPage";
import ProfilePage from "./Pages/ProfilePage";
import AnimePage from "./Pages/AnimePage";
import MyCollections from "./Pages/MyCollections";
import Collections from "./Pages/Collections";

export const authRoutes = [
    {
        path: PROFILE_ROUTER,
        Component: <ProfilePage/>
    },
    {
        path: PROFILE_ROUTER+"/:_id",
        Component: <ProfilePage/>
    },
    {
        path: MY_COLLECTION_ROUTE,
        Component: <MyCollections/>
    },
]
export const publicRoutes = [
    {
        path: ANIME_ROUTE,
        Component: <Anime/>
    },
    {
        path: ANIME_ROUTE + "/:id",
        Component: <AnimePage/>
    },
    {
        path: LOGIN_ROUTE,
        Component: <AuthPage/>
    },
    {
        path: REGISTRATION_ROUTE,
        Component: <AuthPage/>
    },
    {
        path: COLLECTION_ROUTE,
        Component: <Collections/>
    },
    {
        path: COLLECTION_ROUTE + "/:_id",
        Component: <CollectionPage/>
    },



]