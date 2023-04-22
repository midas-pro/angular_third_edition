import { normalize, strings } from '@angular-devkit/core';
import { apply, applyTemplates, chain, mergeWith, move, Rule, SchematicContext, Tree, url } from '@angular-devkit/schematics';
import { Schema } from './schema';

export function tailwindContainer(_options: Schema): Rule {
  return (_tree: Tree, _context: SchematicContext) => {
    _options.path = _options.path ?? normalize('src/app/' + _options.name as string);
    const templateSource = apply(url('./files'), [
      applyTemplates({
        classify: strings.classify,
        dasherize: strings.dasherize,
        name: _options.name
      }),
      move(normalize(_options.path as string))
    ]);
    return chain([
      mergeWith(templateSource)
    ]);    
  };
}
