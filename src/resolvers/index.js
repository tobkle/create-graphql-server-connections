 import { print } from 'recast';
 import getCode from '../util/getCode';
 import { templateToAst } from '../util/read';
 import { RESOLVER } from '../util/constants';

export default function generateResolvers(inputSchema) {
  const ast = generateResolversAst(inputSchema)
  return print(ast, { trailingComma: true }).code;
}

export function generateResolversAst(inputSchema) {
  const templateCode = getCode(RESOLVER, {
    inputSchema,
    basePath: [__dirname, 'templates']
  });

  // validate syntax of generated template code
  const replacements = {};
  const ast = templateToAst(templateCode, replacements);

  return ast;
}
