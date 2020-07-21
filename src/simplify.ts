import * as db from "quick.db";

export const initServer = (id: string) => {
    if(db.has(`servers.${id}`)) return;
    return db.set(`servers.${id}`, {
        stock: 0
    });
}

/*
export const initUser = (id: string) => {
    if(db.has(`users.${id}`)) return;
    return db.set(`users.${id}`, {

    });
}
*/