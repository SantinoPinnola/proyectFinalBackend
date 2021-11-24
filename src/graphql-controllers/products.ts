import { productsLocal } from '../models/productsModels';

export const productsQuery = {
  productsById: productsLocal.productsGraphQL.getResolver('findById'),
  productsByIds: productsLocal.productsGraphQL.getResolver('findByIds'),
  productsOne: productsLocal.productsGraphQL.getResolver('findOne'),
  productsMany: productsLocal.productsGraphQL.getResolver('findMany'),
  productsCount: productsLocal.productsGraphQL.getResolver('count'),
  productsConnection: productsLocal.productsGraphQL.getResolver('connection'),
  productsPagination: productsLocal.productsGraphQL.getResolver('pagination'),
};

export const productsMutation = {
  productsCreateOne: productsLocal.productsGraphQL.getResolver('createOne'),
  productsCreateMany: productsLocal.productsGraphQL.getResolver('createMany'),
  productsUpdateById: productsLocal.productsGraphQL.getResolver('updateById'),
  productsUpdateOne: productsLocal.productsGraphQL.getResolver('updateOne'),
  productsUpdateMany: productsLocal.productsGraphQL.getResolver('updateMany'),
  productsRemoveById: productsLocal.productsGraphQL.getResolver('removeById'),
  productsRemoveOne: productsLocal.productsGraphQL.getResolver('removeOne'),
  productsRemoveMany: productsLocal.productsGraphQL.getResolver('removeMany'),
};