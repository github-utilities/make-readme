#!/usr/bin/env node


'use strict';


const Mustache = require('mustache');
const File_System = require('fs');
const Path = require('path');
const Os = require('os');


/**
 * Defines partial files to include within rendered output, used within `View['files']` list
 * @interface partial_files_definition
 * @property {string} in_path - File path relative to root directory of `make-readme` project
 * @property {string} out_path - File path relative to root directory of target repository
 * @property {string[]} tags - Optional list of tags used by MustacheJS
 */
interface partial_files_definition {
  in_path: string,
  out_path: string,
  tags: [string],
  partials: [string]
}


/**
 * Copy of View configurations that is passed about
 * @interface View
 * @see Helpers - For helper functions that are added to View
 * @property {boolean} gfm - GitLab/Hub Flavored MarkDown
 * @property {string} name - NOT IMPLEMENTED?!
 * @property {string} author - Name of author of project
 * @property {string} repository - Name of repository on GitHub
 * @property {string} organization - User/Organization name on GitHub that repository is hosted by
 * @property {string} description - Short one-line description of repository
 * @property {string} license - License name/ID that repository is shared under
 * @property {string} output_directory - Local directory path to write rendered files to
 * @property {boolean} is_submodule - Includes partials from `.mustache/partials/quick_start/is_submodule.md.mst` when `true`
 * @property {boolean} utilizes_submodules - Includes partials from `.mustache/partials/quick_start/utilizes_submodules.md.mst` when `true`
 * @property {boolean} include_notes - Includes partials from `.mustache/partials/readme/notes.md.mst` when `true`
 * @property {boolean} include_shields_io - Includes badge links from Shilds IO
 * @property {boolean|object} gh_pages - Includes links to GitHub Pages when _truthy_
 * @property {boolean} verbose - Outputs non-error logs of actions taken when `true`
 * @property {boolean} clobber - Overwrites preexisting files when `true`, else throws error object(s) if/when files already exist
 * @property {partial_files_definition[]} files - List of defined partial files to include within rendered files
 */
interface View {
  (text: string): string;
  gfm: boolean;
  author: string;
  organization: string;
  repository: string;
  description: string;
  license: string;
  output_directory: string;
  is_submodule: boolean;
  utilizes_submodules: boolean;
  include_notes: boolean;
  include_shields_io: boolean;
  gh_pages: boolean;
  verbose: boolean;
  clobber: boolean;
  files: [partial_files_definition];
}
const View = require('../dataView.json');


/**
 * Trims last element (directory or file) from path
 * @function parentDir
 * @param {string} directory_or_file_path - Path to trim last element from
 * @return {string}
 * @example
 * ```JavaScript
 * parent_directory = parentDir('/tmp/some/where/else');
 *
 * console.log(parent_directory);
 * //> "/tmp/some/where"
 * ```
 */
const parentDir = (directory_or_file_path: string): string => {
  return directory_or_file_path.replace(/Path.sep$/, '')
                               .split(Path.sep)
                               .slice(0, -1)
                               .join(Path.sep);
};


/**
 * Call-back function that parses text encapsulated by mustache tags
 * @callback renderCallback
 * @param {string} text - Text that is encased within Mustache tag
 * @param {View} render - Reference to `View` configurations
 */
interface renderCallback {
  (text: string, render: View): string;
};


/**
 * @interface Helpers
 */
interface Helpers {
  getFullYear(): string;
  includeLicense(): string;
  stripForID(): renderCallback;
  stripForHeading(): renderCallback;
  stripNewLines(): renderCallback;
  stripForHeading(): renderCallback;
  stripNewLines(): renderCallback;
  trimLeadingSpaces(): renderCallback;
  trimTrailingSpaces(): renderCallback;
  toTitleCase(): renderCallback;
  toLowerCase(): renderCallback;
  renderPartialsPath(): renderCallback;
};
/**
 * Object that contains helper functions to enhance `View`
 * @namespace Helpers
 */
const Helpers = {
  /**
   * Returns current four digit year as string
   * @function getFullYear
   * @return {string}
   * @memberof Helpers
   * @example <caption>Mustache file snip</caption>
   * ```Mustache
   * Copyright (C) {{{ getFullYear }}} {{ author }}
   * ```
   * @example <caption>rendered output snip</caption>
   * ```MarkDown
   * Copyright (C) 2020 S0AndS0
   * ```
   */
  getFullYear: (): string => {
    return new Date().getFullYear().toString();
  },

  /**
   * Includes `include.mustache` file within rendered output
   * @throws {ReferenceError} - When license `include.mustache` file cannot be found
   * @return {string} - Results from `Mustache.render` on found license `include.mustache` file
   * @memberof Helpers
   * @this {View|View.license} - AKA the `license` value from `dataView.json` configurations
   * @example <caption>Mustache file snip</caption>
   * ```Mustache
   * {{{ includeLicense }}}
   * ```
   * @example <caption>rendered output snip</caption>
   * ```MarkDown
   *     Quick statement on what this Repository aims to accomplish
   *     Copyright (C) 2020 your-name
   *
   *     This program is free software: you can redistribute it and/or modify
   *     it under the terms of the GNU Affero General Public License as published
   *     by the Free Software Foundation, version 3 of the License.
   *
   *     This program is distributed in the hope that it will be useful,
   *     but WITHOUT ANY WARRANTY; without even the implied warranty of
   *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   *     GNU Affero General Public License for more details.
   *
   *     You should have received a copy of the GNU Affero General Public License
   *     along with this program.  If not, see <https://www.gnu.org/licenses/>.
   * ```
   */
  includeLicense: function(): string {
    let license_include_path: string;
    if (typeof this === 'object') {
      license_include_path = Path.join(parentDir(__dirname), '.mustache', 'licenses', this.license, 'include.mustache');
    } else {
      license_include_path = Path.join(parentDir(__dirname), '.mustache', 'licenses', this, 'include.mustache');
    }

    if (!File_System.existsSync(license_include_path)) {
      throw new ReferenceError(`Cannot find license -> ${license_include_path}`);
    }

    const license_data = File_System.readFileSync(license_include_path);

    if (typeof this === 'object') {
      return Mustache.render(license_data.toString(), this.view);
    } else {
      return Mustache.render(license_data.toString(), View);
    }
  },

  /**
   * Strips and/or replaces known bad characters for heading id/name linking
   * @extends renderCallback
   * @function stripForID
   * @return {renderCallback}
   * @memberof Helpers
   * @example <caption>Mustache file snip</caption>
   * ```Mustache
   * # {{# toTitleCase }}{{ repository }}{{/ toTitleCase }}
   * [heading__top]:
   *   #{{#stripForID}}{{ repository }}{{/stripForID}}
   *   "{{ description }}"
   * ```
   * @example <caption>rendered output snip</caption>
   * ```MarkDown
   * # Repository Name
   * [heading__top]:
   *   #repository-name
   *   "Quick statement on what this Repository aims to accomplish"
   * ```
   */
  stripForID: (): renderCallback => {
    const renderCallback = (text: string, render: View) => {
      if (!!render.gfm) {
        return render(text).trim()
                           .toLowerCase()
                           .replace(/<[^>]*>?/gm, '--')
                           .replace(/[^a-z0-9_\- ]/g, '')
                           .replace(/ +/g, '-');
      }
      return render(text).trim()
                         .toLowerCase()
                         .replace(/[^a-z0-9_\- ]/g, '')
                         .replace(/ +/g, '-');
    }
    return renderCallback;
  },

  /**
   *
   * @function stripForHeading
   * @return {renderCallback}
   * @memberof Helpers
   * @example <caption>Mustache file snip</caption>
   * ```Mustache
   * [commits__{{#stripForHeading}}{{ repository }}{{/stripForHeading}}__master]:
   *   https://github.com/{{ organization }}/{{ repository }}/commits/master
   *   "&#x1F4DD; History of changes on this branch"
   * ```
   * @example <caption>rendered output snip</caption>
   * ```MarkDown
   * [commits__repository_name__master]:
   *   https://github.com/your-name__or__organization-name/repository-name/commits/master
   *   "&#x1F4DD; History of changes on this branch"
   * ```
   */
  stripForHeading: (): renderCallback => {
    const renderCallback = (text: string, render: View) => {
      return render(text).trim().toLowerCase().replace(/ +|\-+/g, '_');
    }
    return renderCallback;
  },

  /**
   *
   * @function stripNewLines
   * @return {renderCallback}
   * @memberof Helpers
   * @example <caption>Mustache file snip</caption>
   * ```Mustache
   * [badge__gh_pages__{{#stripForHeading}}{{ repository }}{{/stripForHeading}}]:
   *   https://img.shields.io/website/{{#stripNewLines}}
   *   {{#gh_pages.url}}{{ gh_pages.url }}{{/gh_pages.url}}
   *   {{^gh_pages.url}}https/{{ organization }}.github.io/{{ repository }}/index.html{{/gh_pages.url}}
   *   .svg?down_color=darkorange&down_message=Offline&label=Demo&logo=Demo%20Site&up_color=success&up_message=Online
   *   {{/stripNewLines}}
   * ```
   * @example <caption>rendered output snip</caption>
   * ```MarkDown
   * [badge__gh_pages__repository_name]:
   *   https://img.shields.io/website/https/your-name__or__organization-name.github.io/repository-name/index.html.svg?down_color=darkorange&down_message=Offline&label=Demo&logo=Demo%20Site&up_color=success&up_message=Online
   * ```
   */
  stripNewLines: (): renderCallback => {
    const renderCallback = (text: string, render: View) => {
      return render(text).replace(/\r?\n|\r/g, '');
    }
    return renderCallback;
  },

  /**
   *
   * @function trimLeadingSpaces
   * @return {renderCallback}
   * @memberof Helpers
   * @todo Unused code
   * @example <caption>Mustache file snip</caption>
   * ```Mustache
   * {{# trimLeadingSpaces }}
   *   Something to dedent
   * {{/ trimLeadingSpaces }}
   * ```
   * @example <caption>rendered output snip</caption>
   * ```MarkDown
   * Something to dedent
   * ```
   */
  trimLeadingSpaces: (): renderCallback => {
    const renderCallback = (text: string, render: View) => {
      return render(text).replace(/^\s+/g, '');
    }
    return renderCallback;
  },

  /**
   *
   * @function trimTrailingSpaces
   * @return {renderCallback}
   * @memberof Helpers
   * @todo Unused code
   * @example <caption>Mustache file snip</caption>
   * ```Mustache
   * {{# trimTrailingSpaces }}Something that once had trailing spaces   {{/ trimTrailingSpaces }}
   * ```
   * @example <caption>rendered output snip</caption>
   * ```MarkDown
   * Something that once had trailing spaces
   * ```
   */
  trimTrailingSpaces: (): renderCallback => {
    const renderCallback = (text: string, render: View) => {
      return render(text).replace(/\s+$/g, '');
    }
    return renderCallback;
  },

  /**
   *
   * @function toTitleCase
   * @return {renderCallback}
   * @memberof Helpers
   * @this {View} - AKA `dataView.json` configurations
   * @example <caption>Mustache file snip</caption>
   * ```Mustache
   * # {{# toTitleCase }}{{ repository }}{{/ toTitleCase }}
   * [heading__top]:
   *   #{{#stripForID}}{{ repository }}{{/stripForID}}
   *   "{{ description }}"
   * ```
   * @example <caption>rendered output snip</caption>
   * ```MarkDown
   * # Repository Name
   * [heading__top]:
   *   #repository-name
   *   "Quick statement on what this Repository aims to accomplish"
   * ```
   */
  toTitleCase: (): renderCallback => {
    const renderCallback = (text: string, render: View) => {
      return render(text).trim()
                         .replace(/<[^>]*>?/gm, '--')
                         .replace(/[^a-zA-Z0-9_\- ]/g, '')
                         .replace(/ +/g, '-')
                         .replace(/-/g, ' ')
                         .replace(/\b\w/g, l => l.toUpperCase());
      };

    return renderCallback;
  },

  /**
   *
   * @function toLowerCase
   * @return {renderCallback}
   * @memberof Helpers
   * @todo Unused code
   * @example <caption>Mustache file snip</caption>
   * ```Mustache
   * {{# toLowerCase }}String Stripped of{{/ toLowerCase }} Capitalization
   * ```
   * @example <caption>rendered output snip</caption>
   * ```MarkDown
   * string stripped of Capitalization
   * ```
   */
  toLowerCase: (): renderCallback => {
    const renderCallback = (text: string, render: View) => {
      return render(text).trim().toLowerCase();
    };

    return renderCallback;
  },

  /**
   *
   * @function renderPartialsPath
   * @return {renderCallback}
   * @memberof Helpers
   * @todo Unused code
   * @example <caption>Mustache file snip</caption>
   * ```Mustache
   * {{# renderPartialsPath }}quick_start/clone.md.mst{{/ renderPartialsPath }}
   * ```
   * @example <caption>rendered output snip</caption>
   * ```MarkDown
   * Clone this project...
   * ```
   */
  renderPartialsPath: function(): renderCallback {
    const renderCallback = (text: string, render: View) => {
      //@ts-ignore
      const partials_path_list = render(text).replace(/\//g, Path.sep);
      const partials_abs_path = Path.join(parentDir(__dirname), '.mustache', 'partials', partials_path_list);
      if (File_System.existsSync(partials_abs_path)) {
        //@ts-ignore
        return render(File_System.readFileSync(partials_abs_path).toString());
      } else {
        console.error(`Cannot find file -> ${partials_abs_path}`);
      }
    }

    return renderCallback;
  }

};


/**
 * Main class for this file
 */
class App {
  view: View;
  output_directory: string;

  /**
   * Constructs internal state for `new` instances of class
   * @param {any} view
   * @param {Helpers|object} helpers
   * @example <caption></caption>
   * ```JavaScript
   * // Load configurations
   * const View = require('../dataView.json');
   * // Define helper functions within an object
   * const Helpers = {...};
   *
   * const app = new App(View, Helpers);
   * ```
   */
  constructor(view: any, helpers: Helpers|object) {
    this.view = view;

    Object.keys(helpers).forEach((key) => {
      if (!(key in view)) {
        this.view[key] = helpers[key];
      }
    });

    this.output_directory = view.output_directory ? view.output_directory : parentDir(__dirname);
  }

  /**
   * Make directory path including any intervening directories that do not already exist
   * @param {string} directory_path Absolute path to make directories for
   * @param {boolean} verbose Output directories that are made when `true`
   * @example
   * ```JavaScript
   * const app = new App(View, Helpers);
   *
   * app._makeDirectories('/tmp/some/where/else', true);
   * ```
   */
  _makeDirectories(directory_path: string, verbose: boolean) {
    if (!!verbose) {
      console.log(`directory_path -> ${directory_path}`);
    }

    let checked_directory_path = '';
    directory_path.split(Path.sep).forEach((directory) => {
      if (directory !== '/' && !!directory) {
        checked_directory_path += `${Path.sep}${directory}`;
        if (!File_System.existsSync(checked_directory_path)) {
          if (!!verbose) {
            console.log(`Making directory -> ${checked_directory_path}`);
          }

          File_System.mkdirSync(checked_directory_path);
        }
      }
    });
  }

  /**
   * Translates list of files to object/dict data structure
   * @param {string[]} partials_paths List of file paths relative to root directory of this repository
   * @param {boolean} verbose Output partial file(s) parsed when `true`
   * @return {{key: string, value: string}}
   * @throws {Error} when file does not exist or cannot be read
   * @example <caption></caption>
   * ```JavaScript
   * const app = new App(View, Helpers);
   *
   * const objectified_partials = app._objectifyPartials(
   *   [
   *     ".mustache/partials/quick_start/clone.md.mst",
   *     ".mustache/partials/quick_start/is_submodule.md.mst",
   *     ".mustache/partials/quick_start/utilizes_submodules.md.mst",
   *     ".mustache/partials/readme/notes.md.mst"
   *   ],
   *   true
   * );
   *
   *
   * console.log(objectified_partials);
   * // {
   * //   "clone.md": ".mustache/partials/quick_start/clone.md.mst",
   * //   "is_submodule.md": ".mustache/partials/quick_start/is_submodule.md.mst",
   * //   "utilizes_submodules.md": ".mustache/partials/quick_start/utilizes_submodules.md.mst",
   * //   "notes.md": ".mustache/partials/readme/notes.md.mst"
   * // }
   * ```
   * @example <caption></caption>
   * ```Mustache
   * {{> notes.md}}
   * ```
   */
  _objectifyPartials(partials_paths: string[], verbose: boolean): {[key: string]: string} {
    const objectified_partials = {};
    if (!partials_paths) {
      return objectified_partials;
    }

    partials_paths.forEach((partials_path) => {
      const {name} = Path.parse(partials_path);

      if (!!verbose) {
        console.log(`Reading ${name} from -> ${partials_path}`);
      }

      File_System.readFile(partials_path, (err, data) => {
        if (err) {
          throw err;
        }

        objectified_partials[name] = data.toString();
      });
    });
    return objectified_partials;
  }

  /**
   * Returns absolute path
   * @param {string} input
   * @returns {string}
   */
  absPath(input: string): string {
  if (input.indexOf('~/') === 0) {
    return input.replace(/^~\//, Os.homedir());
  }
  return input.replace(
    new RegExp(`^(?!${Path.sep})`),
    `${__dirname}${Path.sep}`
  );
};

  /**
   * Writes rendered files to directory configured by `View`
   * @throws {Error} when `clobber` is `false` and files would be overwritten
   * @example
   * ```JavaScript
   * app.renderFiles();
   * ```
   */
  renderFiles() {
    this.view.files.forEach(({in_path, out_path, partials, tags}) => {
      const objectified_partials = this._objectifyPartials(partials, this.view.verbose);
      File_System.readFile(in_path, (err, data) => {
        if (err) {
          throw err;
        }

        const rendered_mustache = Mustache.render(data.toString(), this.view, objectified_partials, tags);

        const full_out_path = Path.join(this.absPath(this.output_directory), out_path);
        this._makeDirectories(Path.dirname(full_out_path), this.view.verbose);

        if (File_System.existsSync(full_out_path) && !this.view.clobber) {
          throw new Error(`clobber -> ${this.view.clobber} and file already exists at -> ${full_out_path}`);
        }

        File_System.writeFile(full_out_path, rendered_mustache, {'encoding': 'utf8'}, (err) => {
          if (err) {
            throw err;
          }

          if (!!this.view.verbose) {
            console.log(`Wrote file -> ${out_path}`);
          }
        });
      });
    });

    if (this.view.license) {
      const src_path = Path.join(parentDir(__dirname), '.mustache', 'licenses', this.view.license, 'LICENSE');

      const dest_path = Path.join(this.absPath(this.output_directory), 'LICENSE');

      if (File_System.existsSync(dest_path) && !this.view.clobber) {
        throw new Error(`clobber -> ${this.view.clobber} and file already exists at -> ${dest_path}`);
      }

      File_System.copyFile(src_path, dest_path, (err) => {
        if (err) {
          throw err;
        }

        if (!!this.view.verbose) {
          console.log(`Copied file to -> ${dest_path}`);
        }
      });
    }
  }

}


const app = new App(View, Helpers);
app.renderFiles();
