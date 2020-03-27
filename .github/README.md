# Make ReadMe
[heading__title]:
  #make-readme
  "&#x2B06; Top of ReadMe File"


Makes new ReadMe file for GitHub repository


## [![Byte size of make-readme][badge__master__make_readme__source_code]][make_readme__master__source_code] [![Open Issues][badge__issues__make_readme]][issues__make_readme] [![Open Pull Requests][badge__pull_requests__make_readme]][pull_requests__make_readme] [![Latest commits][badge__commits__make_readme__master]][commits__make_readme__master]


------


#### Table of Contents


- [:arrow_up: Top of ReadMe File][heading__title]

- [:zap: Quick Start][heading__quick_start]

  - [:memo: Track Repository Customizations][heading__track_repository_customizations]
  - [:factory: Utilize Make ReadMe][heading__utilize]
  - [:floppy_disk: Commit and Push][heading__commit_and_push]

- [&#x1F5D2; Notes][heading__notes]

- [:card_index: Attribution][heading__attribution]

- [&#x2696; License][heading__license]


------



## Quick Start
[heading__quick_start]:
  #quick-start
  "&#9889; Perhaps as easy as one, 2.0,..."



Clone the source code of this repository somewhere...


```Bash
mkdir -vp ~/git/hub/github-utilities
cd ~/git/hub/github-utilities


git clone git@github.com:github-utilities/make-readme.git
cd make-readme
```


To update in the future `pull` the `master` branch of this repository...


```Bash
cd ~/git/hub/github-utilities/make-readme

git pull origin master
```


To install updated NPM dependencies from `package.json` file...


```Bash
cd ~/git/hub/github-utilities/make-readme

npm install
```


To force upgrading of NPM dependencies...


```Bash
npm update
```


> Note, forcing and update of NPM dependencies may cause instabilities and/or merge conflicts; if however everything operates as expected after an update please consider submitting a Pull Request.


### Track Repository Customizations
[heading__track_repository_customizations]:
  #track-repository-customizations
  "&#x1F4DD; Suggested Git commands for having a good time customizing code from this repository"


Checkout a branch for tracking Repository customizations...


```Bash
cd ~/git/hub/github-utilities/make-readme


git checkout -b repository-name
```


Modify the `dataView.json` file...


```JSON
{
  "gfm": true,
  "email": "account@host.tld",
  "author": "your-name",
  "organization": "your-name__or__organization-name",
  "repository": "repository-name",
  "output_directory": "~/git/hub/organization-name/repository-name",
  "description": "Quick statement on what this Repository aims to accomplish",
  "is_submodule": false,
  "utilizes_submodules": false,
  "include_notes": false,
  "license": "AGPL-3.0",
  "gh_pages": {
    "branch": "gh-pages",
    "url": false
  },
  "verbose": true,
  "clobber": false,
  "files": [
    {
      "in_path": ".mustache/.github/README.md.mst",
      "out_path": ".github/README.md",
      "partials": [
        ".mustache/partials/readme/quick_start/clone.md.mst",
        ".mustache/partials/readme/quick_start/is_submodule.md.mst",
        ".mustache/partials/readme/quick_start/utilizes_submodules.md.mst",
        ".mustache/partials/readme/notes.md.mst"
      ]
    }
  ]
}
```


> Note, `is_submodule` and `utilizes_submodules` are mutually exclusive in regards to either being _`true`_, and if both are _`false`_ then the `quick_start_clone.md.mst` file is used instead for cloning and updating instructions.


```JSON
{
  "gfm": true,
  "email": "account@host.tld",
  "author": "GitHub-account-name",
  "organization": "organization-name",
  "repository": "repository-name",
  "output_directory": "~/git/hub/organization-name/repository-name",
  "description": "Tests functions of Make ReadMe",
  "license": "AGPL-3.0",
  "is_submodule": false,
  "utilizes_submodules": false,
  "include_notes": true,
  "gh_pages": false,
  "verbose": true,
  "clobber": false,
  "files": [
    {
      "in_path": ".mustache/.github/README.md.mst",
      "out_path": ".github/README.md",
      "partials": [
        ".mustache/partials/readme/quick_start/clone.md.mst",
        ".mustache/partials/readme/quick_start/is_submodule.md.mst",
        ".mustache/partials/readme/quick_start/utilizes_submodules.md.mst",
        ".mustache/partials/readme/notes.md.mst"
      ]
    }
  ]
}
```


Add and commit changes...


```Bash
git add -A .

git commit -m 'Customizes defaults from master branch for repository-name'
```


### Utilize Make ReadMe
[heading__utilize]:
  #utilize-make-readme
  "&#x1F3ED; How to make use of this project"


Initialize a Git repository...


```Bash
mkdir -vp ~/git/hub/organization-name

git init ~/git/hub/organization-name/repository-name
```


> Note, above should match the same path as defined by `output_directory` within your customized `dataView.json` file.


Issue `npm run build` from this repository...


```Bash
cd ~/git/hub/github-utilities/make-readme

npm run make-readme
```

... which will generate files under `~/git/hub/organization-name/repository-name`


```
.github/README.md
LICENSE
```


### Commit and Push
[heading__commit_and_push]:
  #commit-and-push
  "&#x1F4BE; It may be just this easy..."


Change directories to the new repository, finish customizing the ReadMe file, and track built files...


```Bash
cd ~/git/hub/organization-name/repository-name

vim .github/README.md

git add -A .

git commit -m ':tada: Initial commit'
```


After creating a repository on GitHub, add a remote, and push


```Bash
git remote add hub git@github.com:organization-name/repository-name.git

git push hub master
```


**:tada: Excellent :tada:** your repository is now finished unitizing the ReadMe file built from this repository!


___


## Notes
[heading__notes]:
  #notes
  "&#x1F5D2; Additional things to keep in mind when developing"


Pull Requests are most welcomed to add features and/or fix bugs. For example the following four steps show how to add the MIT license to those that are available to add with this project.


`0` Checkout the `master` branch of this repository and write a Mustache template and add a `LICENSE` file within a named directory...


```Bash
cd ~/git/hub/github-utilities/make-readme


git checkout master


mkdir -vp .mustache/licenses/MIT
```


**`.mustache/licenses/MIT/include.mustache`**


```
Copyright {{{ getFullYear }}} {{ author }}

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```


**`.mustache/licenses/MIT/LICENSE`**


```
Copyright <year> <author>

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```


> Note, currently this project does **not** edit/render the selected `LICENSE` file and instead copies it to the target repository, however the _`include.mustache`_ file(s) are rendered prior to being included within generated ReadMe file. Pull Requests to add more features in this regard are certainly appreciated.


`1` Edit the `dataView.json` file...


**`dataView.json`**


```JSON
{
  "gfm": true,
  "email": "account@host.tld",
  "author": "your-name",
  "organization": "your-name__or__organization-name",
  "repository": "repository-name",
  "output_directory": "~/git/hub/github-utilities/make-readme/tests",
  "description": "Quick statement on what this Repository aims to accomplish",
  "is_submodule": false,
  "utilizes_submodules": false,
  "include_notes": false,
  "license": "MIT",
  "gh_pages": false,
  "verbose": true,
  "clobber": false,
  "files": [
    {
      "in_path": ".mustache/.github/README.md.mst",
      "out_path": ".github/README.md",
      "partials": [
        ".mustache/partials/readme/quick_start/clone.md.mst",
        ".mustache/partials/readme/quick_start/is_submodule.md.mst",
        ".mustache/partials/readme/quick_start/utilizes_submodules.md.mst",
        ".mustache/partials/readme/notes.md.mst"
      ]
    }
  ]
}
```


... then test...


```Bash
mkdir -vp tests


npm run build
```


... and check that generated ReadMe and license files contain the selected license text...


```Bash
more tests/.github/README.md

more LICENSE
```


`2` Add and commit changes...


```Bash
git add -A .

git commit -m 'Adds MIT license to generated ReadMe files'
```


`3` After forking on GitHub, add it as a remote and push changes


```Bash
git remote add fork git@github.com:your-name/make-readme.git

git push fork master
```


`4` Open a Pull Request when your changes are ready.


------


This project utilizes TypeScript to transpile and make stronger assertions of type safety with JavaScript related code, please direct such code edits to the `ts/index.ts` file then issue `npm ts-build` to re-build the `js/index.js` file.


___


## Attribution
[heading__attribution]:
  #attribution
  "&#x1F4C7; Resources that where helpful in building this project so far."


Resources that where helpful in building this project so far


- [GitHub -- `janl/mustache.js` -- mustache source `readPartials`](https://github.com/janl/mustache.js/blob/master/bin/mustache#L76)

- [GitHub -- `janl/mustache.js` -- mustache documentation `API`](https://github.com/janl/mustache.js#api)

- [StackOverflow -- Windows Batch Files: if else](https://stackoverflow.com/questions/5683583)

- [StackOverflow -- JavaScript: remove trailing spaces only](https://stackoverflow.com/questions/37864460)

- [StackOverflow -- How to define function return type of a custom object literal?](https://stackoverflow.com/questions/37342835)

- [JSDoc -- Configuring JSDoc](https://jsdoc.app/about-configuring-jsdoc.html)

- [JSDoc -- Enabling the MarkDown Plugin](https://jsdoc.app/plugins-markdown.html#enabling-the-markdown-plugin)

- [GitHub -- `jsdoc2md/jsdoc-to-markdown`](https://github.com/jsdoc2md/jsdoc-to-markdown)


___


## License
[heading__license]:
  #license
  "&#x2696; Legal bits of Open Source software"


Legal bits of Open Source software


```
Make ReadMe documentation on how things like this could be utilized
Copyright (C) 2020  S0AndS0

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published
by the Free Software Foundation; version 3 of the License.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
```



[badge__commits__make_readme__master]:
  https://img.shields.io/github/last-commit/github-utilities/make-readme/master.svg

[commits__make_readme__master]:
  https://github.com/github-utilities/make-readme/commits/master
  "&#x1F4DD; History of changes on this branch"


[make_readme__community]:
  https://github.com/github-utilities/make-readme/community
  "&#x1F331; Dedicated to functioning code"

[make_readme__gh_pages]:
  https://github.com/github-utilities/make-readme/tree/gh-pages
  "Source code examples hosted thanks to GitHub Pages!"



[badge__demo__make_readme]:
  https://img.shields.io/website/https/github-utilities.github.io/make-readme/index.html.svg?down_color=darkorange&down_message=Offline&label=Demo&logo=Demo%20Site&up_color=success&up_message=Online

[demo__make_readme]:
  https://github-utilities.github.io/make-readme/index.html
  "&#x1F52C; Check the example collection tests"


[badge__issues__make_readme]:
  https://img.shields.io/github/issues/github-utilities/make-readme.svg

[issues__make_readme]:
  https://github.com/github-utilities/make-readme/issues
  "&#x2622; Search for and _bump_ existing issues or open new issues for project maintainer to address."


[badge__pull_requests__make_readme]:
  https://img.shields.io/github/issues-pr/github-utilities/make-readme.svg

[pull_requests__make_readme]:
  https://github.com/github-utilities/make-readme/pulls
  "&#x1F3D7; Pull Request friendly, though please check the Community guidelines"


[badge__master__make_readme__source_code]:
  https://img.shields.io/github/repo-size/github-utilities/make-readme

[make_readme__master__source_code]:
  https://github.com/github-utilities/make-readme/
  "&#x2328; Project source!"
