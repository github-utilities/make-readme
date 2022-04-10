## Classes

<dl>
<dt><a href="#App">App</a></dt>
<dd><p>Main class for this file</p>
</dd>
</dl>

## Objects

<dl>
<dt><a href="#Helpers">Helpers</a> : <code>object</code></dt>
<dd><p>Object that contains helper functions to enhance <code>View</code></p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#parentDir">parentDir(directory_or_file_path)</a> ⇒ <code>string</code></dt>
<dd><p>Trims last element (directory or file) from path</p>
</dd>
</dl>

<a name="App"></a>

## App
Main class for this file

**Kind**: global class  

* [App](#App)
    * [new App(view, helpers)](#new_App_new)
    * [._makeDirectories(directory_path, verbose)](#App+_makeDirectories)
    * [._objectifyPartials(partials_paths, verbose)](#App+_objectifyPartials) ⇒ <code>Object</code>
    * [.renderFiles()](#App+renderFiles)


* * *

<a name="new_App_new"></a>

### new App(view, helpers)
Constructs internal state for `new` instances of class


| Param | Type |
| --- | --- |
| view | <code>any</code> | 
| helpers | [<code>Helpers</code>](#Helpers) \| <code>object</code> | 

**Example**  
```JavaScript
// Load configurations
const View = require('../dataView.json');
// Define helper functions within an object
const Helpers = {...};

const app = new App(View, Helpers);
```

* * *

<a name="App+_makeDirectories"></a>

### app.\_makeDirectories(directory_path, verbose)
Make directory path including any intervening directories that do not already exist

**Kind**: instance method of [<code>App</code>](#App)  

| Param | Type | Description |
| --- | --- | --- |
| directory_path | <code>string</code> | Absolute path to make directories for |
| verbose | <code>boolean</code> | Output directories that are made when `true` |

**Example**  
```JavaScript
const app = new App(View, Helpers);

app._makeDirectories('/tmp/some/where/else', true);
```

* * *

<a name="App+_objectifyPartials"></a>

### app.\_objectifyPartials(partials_paths, verbose) ⇒ <code>Object</code>
Translates list of files to object/dict data structure

**Kind**: instance method of [<code>App</code>](#App)  
**Throws**:

- <code>Error</code> when file does not exist or cannot be read


| Param | Type | Description |
| --- | --- | --- |
| partials_paths | <code>Array.&lt;string&gt;</code> | List of file paths relative to root directory of this repository |
| verbose | <code>boolean</code> | Output partial file(s) parsed when `true` |

**Example**  
```JavaScript
const app = new App(View, Helpers);

const objectified_partials = app._objectifyPartials(
  [
    ".mustache/partials/quick_start/clone.md.mst",
    ".mustache/partials/quick_start/is_submodule.md.mst",
    ".mustache/partials/quick_start/utilizes_submodules.md.mst",
    ".mustache/partials/readme/notes.md.mst"
  ],
  true
);


console.log(objectified_partials);
// {
//   "clone.md": ".mustache/partials/quick_start/clone.md.mst",
//   "is_submodule.md": ".mustache/partials/quick_start/is_submodule.md.mst",
//   "utilizes_submodules.md": ".mustache/partials/quick_start/utilizes_submodules.md.mst",
//   "notes.md": ".mustache/partials/readme/notes.md.mst"
// }
```
**Example**  
```Mustache
{{> notes.md}}
```

* * *

<a name="App+renderFiles"></a>

### app.renderFiles()
Writes rendered files to directory configured by `View`

**Kind**: instance method of [<code>App</code>](#App)  
**Throws**:

- <code>Error</code> when `clobber` is `false` and files would be overwritten

**Example**  
```JavaScript
app.renderFiles();
```

* * *

<a name="Helpers"></a>

## Helpers : <code>object</code>
Object that contains helper functions to enhance `View`

**Kind**: global namespace  

* [Helpers](#Helpers) : <code>object</code>
    * [.getFullYear()](#Helpers.getFullYear) ⇒ <code>string</code>
    * [.includeLicense()](#Helpers.includeLicense) ⇒ <code>string</code>
    * [.stripForID()](#Helpers.stripForID) ⇒ <code>renderCallback</code>
    * [.stripForHeading()](#Helpers.stripForHeading) ⇒ <code>renderCallback</code>
    * [.stripNewLines()](#Helpers.stripNewLines) ⇒ <code>renderCallback</code>
    * [.trimLeadingSpaces()](#Helpers.trimLeadingSpaces) ⇒ <code>renderCallback</code>
    * [.trimTrailingSpaces()](#Helpers.trimTrailingSpaces) ⇒ <code>renderCallback</code>
    * [.toTitleCase()](#Helpers.toTitleCase) ⇒ <code>renderCallback</code>
    * [.toLowerCase()](#Helpers.toLowerCase) ⇒ <code>renderCallback</code>
    * [.renderPartialsPath()](#Helpers.renderPartialsPath) ⇒ <code>renderCallback</code>


* * *

<a name="Helpers.getFullYear"></a>

### Helpers.getFullYear() ⇒ <code>string</code>
Returns current four digit year as string

**Kind**: static method of [<code>Helpers</code>](#Helpers)  
**Example** *(Mustache file snip)*  
```Mustache
Copyright (C) {{{ getFullYear }}} {{ author }}
```
**Example** *(rendered output snip)*  
```MarkDown
Copyright (C) 2020 S0AndS0
```

* * *

<a name="Helpers.includeLicense"></a>

### Helpers.includeLicense() ⇒ <code>string</code>
Includes `include.mustache` file within rendered output

**Kind**: static method of [<code>Helpers</code>](#Helpers)  
**Returns**: <code>string</code> - - Results from `Mustache.render` on found license `include.mustache` file  
**Throws**:

- <code>ReferenceError</code> - When license `include.mustache` file cannot be found

**this**: <code>{View\|View.license}</code>  
**Example** *(Mustache file snip)*  
```Mustache
{{{ includeLicense }}}
```
**Example** *(rendered output snip)*  
```MarkDown
    Quick statement on what this Repository aims to accomplish
    Copyright (C) 2020 your-name

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published
    by the Free Software Foundation, version 3 of the License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
```

* * *

<a name="Helpers.stripForID"></a>

### Helpers.stripForID() ⇒ <code>renderCallback</code>
Strips and/or replaces known bad characters for heading id/name linking

**Kind**: static method of [<code>Helpers</code>](#Helpers)  
**Extends**: <code>renderCallback</code>  
**Example** *(Mustache file snip)*  
```Mustache
# {{# toTitleCase }}{{ repository }}{{/ toTitleCase }}
[heading__top]:
  #{{#stripForID}}{{ repository }}{{/stripForID}}
  "{{ description }}"
```
**Example** *(rendered output snip)*  
```MarkDown
# Repository Name
[heading__top]:
  #repository-name
  "Quick statement on what this Repository aims to accomplish"
```

* * *

<a name="Helpers.stripForHeading"></a>

### Helpers.stripForHeading() ⇒ <code>renderCallback</code>
**Kind**: static method of [<code>Helpers</code>](#Helpers)  
**Example** *(Mustache file snip)*  
```Mustache
[commits__{{#stripForHeading}}{{ repository }}{{/stripForHeading}}__master]:
  https://github.com/{{ organization }}/{{ repository }}/commits/master
  "&#x1F4DD; History of changes on this branch"
```
**Example** *(rendered output snip)*  
```MarkDown
[commits__repository_name__master]:
  https://github.com/your-name__or__organization-name/repository-name/commits/master
  "&#x1F4DD; History of changes on this branch"
```

* * *

<a name="Helpers.stripNewLines"></a>

### Helpers.stripNewLines() ⇒ <code>renderCallback</code>
**Kind**: static method of [<code>Helpers</code>](#Helpers)  
**Example** *(Mustache file snip)*  
```Mustache
[badge__gh_pages__{{#stripForHeading}}{{ repository }}{{/stripForHeading}}]:
  https://img.shields.io/website/{{#stripNewLines}}
  {{#gh_pages.url}}{{ gh_pages.url }}{{/gh_pages.url}}
  {{^gh_pages.url}}https/{{ organization }}.github.io/{{ repository }}/index.html{{/gh_pages.url}}
  .svg?down_color=darkorange&down_message=Offline&label=Demo&logo=Demo%20Site&up_color=success&up_message=Online
  {{/stripNewLines}}
```
**Example** *(rendered output snip)*  
```MarkDown
[badge__gh_pages__repository_name]:
  https://img.shields.io/website/https/your-name__or__organization-name.github.io/repository-name/index.html.svg?down_color=darkorange&down_message=Offline&label=Demo&logo=Demo%20Site&up_color=success&up_message=Online
```

* * *

<a name="Helpers.trimLeadingSpaces"></a>

### Helpers.trimLeadingSpaces() ⇒ <code>renderCallback</code>
**Kind**: static method of [<code>Helpers</code>](#Helpers)  
**Todo**

- [ ] Unused code

**Example** *(Mustache file snip)*  
```Mustache
{{# trimLeadingSpaces }}
  Something to dedent
{{/ trimLeadingSpaces }}
```
**Example** *(rendered output snip)*  
```MarkDown
Something to dedent
```

* * *

<a name="Helpers.trimTrailingSpaces"></a>

### Helpers.trimTrailingSpaces() ⇒ <code>renderCallback</code>
**Kind**: static method of [<code>Helpers</code>](#Helpers)  
**Todo**

- [ ] Unused code

**Example** *(Mustache file snip)*  
```Mustache
{{# trimTrailingSpaces }}Something that once had trailing spaces   {{/ trimTrailingSpaces }}
```
**Example** *(rendered output snip)*  
```MarkDown
Something that once had trailing spaces
```

* * *

<a name="Helpers.toTitleCase"></a>

### Helpers.toTitleCase() ⇒ <code>renderCallback</code>
**Kind**: static method of [<code>Helpers</code>](#Helpers)  
**this**: <code>{View}</code>  
**Example** *(Mustache file snip)*  
```Mustache
# {{# toTitleCase }}{{ repository }}{{/ toTitleCase }}
[heading__top]:
  #{{#stripForID}}{{ repository }}{{/stripForID}}
  "{{ description }}"
```
**Example** *(rendered output snip)*  
```MarkDown
# Repository Name
[heading__top]:
  #repository-name
  "Quick statement on what this Repository aims to accomplish"
```

* * *

<a name="Helpers.toLowerCase"></a>

### Helpers.toLowerCase() ⇒ <code>renderCallback</code>
**Kind**: static method of [<code>Helpers</code>](#Helpers)  
**Todo**

- [ ] Unused code

**Example** *(Mustache file snip)*  
```Mustache
{{# toLowerCase }}String Stripped of{{/ toLowerCase }} Capitalization
```
**Example** *(rendered output snip)*  
```MarkDown
string stripped of Capitalization
```

* * *

<a name="Helpers.renderPartialsPath"></a>

### Helpers.renderPartialsPath() ⇒ <code>renderCallback</code>
**Kind**: static method of [<code>Helpers</code>](#Helpers)  
**Todo**

- [ ] Unused code

**Example** *(Mustache file snip)*  
```Mustache
{{# renderPartialsPath }}quick_start/clone.md.mst{{/ renderPartialsPath }}
```
**Example** *(rendered output snip)*  
```MarkDown
Clone this project...
```

* * *

<a name="parentDir"></a>

## parentDir(directory_or_file_path) ⇒ <code>string</code>
Trims last element (directory or file) from path

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| directory_or_file_path | <code>string</code> | Path to trim last element from |

**Example**  
```JavaScript
parent_directory = parentDir('/tmp/some/where/else');

console.log(parent_directory);
//> "/tmp/some/where"
```

* * *


