# vscode-snippet-from-file

[![Visual Studio Marketplace](https://img.shields.io/visual-studio-marketplace/v/morioprog.snippet-from-file.svg?style=flat-square&logo=visual-studio-code&label=VS%20Marketplace)](https://marketplace.visualstudio.com/items?itemName=morioprog.snippet-from-file)
[![LICENSE](https://img.shields.io/github/license/morioprog/vscode-snippet-from-file.svg?style=flat-square)](https://github.com/morioprog/vscode-snippet-from-file/blob/master/LICENSE)

![usage](https://raw.githubusercontent.com/morioprog/vscode-snippet-from-file/master/docs/usage.gif)

## Features

Insert code snippet from file (and automatically fold regions).

## Usage

1. Add your snippets (title and directory) to `settings.json` by setting `snippet-from-file.snippets`
    * Directories should be specified by an absolute path
        * or you can set `snippet-from-file.snippetbasedir` and specify by a relative path if all snippets are in the same directory.

    ```json
    {
        "snippet-from-file.snippets": {
            "SNIPPET TITLE 1": "/ANY/ABSOLUTE/PATH/snippet1.hpp",
            "SNIPPET TITLE 2": "/ANY/ABSOLUTE/PATH2/snippet2.hpp",
            ...
        }
    }
    ```

1. Reload VSCode
1. Open command palette (Press `F1` or `Ctrl-Shift-P`)
1. Type `snippet-from-file` and select below:
    * `snippet-from-file: Insert snippet`: Just insert snippet from file
    * `snippet-from-file: Insert snippet and fold all regions`: Insert snippet and fold regions
1. Choose your snippet by typing your snippet title
1. Done!

## Extension Settings

Configure extensinon settings by editing `settings.json`.

* `snippet-from-file.snippets`: Configure titles and directories of your snippets

### Optional Settings

* `snippet-from-file.snippetbasedir`: Load snippet from this directory
* `snippet-from-file.addregion`: Add the region delimiter before/after your snippet
* `snippet-from-file.beginregion`: The region delimiter for each language extension before your snippet (string `<SNIPPETTITLE>` will be replaced to your snippet title)
* `snippet-from-file.endregion`: The region delimiter for each language extension after your snippet (string `<SNIPPETTITLE>` will be replaced to your snippet title)
* `snippet-from-file.addregionexcept`: Specify the snippet (by directory) that you don't want to add the region delimiter

### Example

```json
{
    "snippet-from-file.snippets": {
        "template": "template.hpp",
        "segmenttree": "datastructure/segmenttree.hpp",
        "sparsetable": "datastructure/sparsetable.hpp",
        "math primefactor": "math/primefactor.hpp"
    },
    "snippet-from-file.snippetbasedir": "/ANY/ABSOLUTE/PATH/",
    "snippet-from-file.addregion": true,
    "snippet-from-file.beginregion": {
        "cpp": "#pragma region <SNIPPETTITLE>",
        "py": "#region <SNIPPETTITLE>"
    },
    "snippet-from-file.endregion": {
        "cpp": "#pragma endregion",
        "py": "#endregion"
    },
    "snippet-from-file.regionexcludefile": [
        "template.hpp"
    ]
}
```

## License

This extension releases under the [MIT License](https://github.com/morioprog/vscode-snippet-from-file/blob/master/LICENSE).
