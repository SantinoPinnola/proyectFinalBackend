import minimist from 'minimist';

const args = minimist(process.argv.slice(2));

if (args.h)
  console.log(
    'Argumentos validos: port=NUMBER - fbClientId=FACEBOOK_CLIENT_ID - fbClientSecret=FACEBOOK_CLIENT_SECRET'
  );

export const allArguments = args;
export const portArgument = args.port;
export const clusterArg = args.cluster;
