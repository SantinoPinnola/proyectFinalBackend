import { SchemaComposer } from "graphql-compose";
import { productsQuery, productsMutation } from "../graphql-controllers/products";

const schemaComposer = new SchemaComposer();

schemaComposer.Query.addFields({
  ...productsQuery,
});

schemaComposer.Mutation.addFields({
  ...productsMutation,
});

export const graphQLMainSchema = schemaComposer.buildSchema();