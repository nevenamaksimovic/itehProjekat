import "reflect-metadata"
import { DataSource } from "typeorm"
import { Doctor } from "./entity/Doctor"
import { Intervention } from "./entity/Intervention"
import { InterventionItem } from "./entity/InterventionItem"
import { Ordination } from "./entity/Ordination"
import { Service } from "./entity/Service"
import { User } from "./entity/User"
import { users1663089750515 } from "./migration/1663089750515-users"
import { doctors1663090355775 } from "./migration/1663090355775-doctors"
import { ordinations1663090730523 } from "./migration/1663090730523-ordinations"
import { services1663091052283 } from "./migration/1663091052283-services"
import { interventions1663091835006 } from "./migration/1663091835006-interventions"
import { itemquantity1663352940019 } from "./migration/1663352940019-itemquantity"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: 'root',
    password: 'root',
    database: "medic",
    logging: false,
    entities: [User, Doctor, Ordination, Service, Intervention, InterventionItem],
    migrations: [users1663089750515, doctors1663090355775, ordinations1663090730523, services1663091052283, interventions1663091835006, itemquantity1663352940019],
    subscribers: [],
})
