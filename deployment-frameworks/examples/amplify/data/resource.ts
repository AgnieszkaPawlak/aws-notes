import {type ClientSchema, a , defineData } from "@aws-amplify/backend";

const schema = a.schema ({
    Pet: a.model({
        name: a.string(),
        species: a.string(),
    })
})

export type Schema = ClientSchema<typeof schema>;
export const data = defineData({ schema });
