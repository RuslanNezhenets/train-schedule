import {PATHS_ROUTE, STATIONS_ROUTE, TICKETS_ROUTE, TRAINS_ROUTE} from "./utils/consts"
import Tickets from "./pages/Tickets"
import Paths from "./pages/Paths"
import Stations from "./pages/Stations"
import Trains from "./pages/Trains"

export const authRoutes = [
    {path: STATIONS_ROUTE, Component: Stations},
    {path: TRAINS_ROUTE, Component: Trains}
]

export const publicRoutes = [
    {path: TICKETS_ROUTE, Component: Tickets},
    {path: PATHS_ROUTE, Component: Paths},
]