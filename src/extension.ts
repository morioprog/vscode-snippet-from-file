import * as vscode from 'vscode';
import * as fs from 'fs';

function getExtension(filename: string) {
	const reg: RegExpMatchArray | null = filename.match(/[^.]+$/);
	if (reg === null) {
		return "";
	}
	const sz: number = reg.length;
	return reg[sz - 1];
}

export function activate(context: vscode.ExtensionContext) {
	// Load setting.json
	const pkg: string = 'snippet-from-file';
	const basedir: string = vscode.workspace.getConfiguration(pkg).get('snippetbasedir') || "";
	const snippetdir: { [key: string]: string; } | undefined = vscode.workspace.getConfiguration(pkg).get('snippets');
	if (snippetdir === undefined) {
		vscode.window.showErrorMessage(`snippet-from-file: Error: Set '${pkg}.snippets' in settings.json`);
		return;
	}
	const addregion: boolean = vscode.workspace.getConfiguration(pkg).get('addregion') || false;
	const beginregion: { [key: string]: string; } = vscode.workspace.getConfiguration(pkg).get('beginregion') || {};
	const   endregion: { [key: string]: string; } = vscode.workspace.getConfiguration(pkg).get(  'endregion') || {};
	const addregionexcept: Array<string> = vscode.workspace.getConfiguration(pkg).get('addregionexcept') || [];

	let quickpick: Array<vscode.QuickPickItem> = [];
	for (var f in snippetdir) {
		quickpick.push({ label: f, description: snippetdir[f] });
	}

	async function insertSnippet(textEditor: vscode.TextEditor) {
		const value = await vscode.window.showQuickPick(
			quickpick,
			{ placeHolder: 'Choose Snippet' }
		);
		if (value === undefined) {
			return;
		}

		const path: string = basedir + value?.description;
		var lib: string;
		try {
			lib = fs.readFileSync(path, 'utf8');
		} catch (err) {
			vscode.window.showErrorMessage(`snippet-from-file: Error: No file '${path}' found`);
			return;
		}

		const ext: string = getExtension(textEditor.document.fileName);
		const addreg: boolean = addregion && !addregionexcept.includes(value?.description || "");
		let header = addreg ? ((ext in beginregion) ? beginregion[ext].replace('<SNIPPETTITLE>', value.label) + "\n" : "") : "";
		let footer = addreg ? ((ext in   endregion) ?   endregion[ext].replace('<SNIPPETTITLE>', value.label) + "\n" : "") : "";
		
		const snippet: vscode.SnippetString = new vscode.SnippetString(header + lib + footer);
		textEditor.insertSnippet(snippet);
	}

	let disposable_insertsnippet = vscode.commands.registerTextEditorCommand(
		'snippet-from-file.insertsnippet',
		(textEditor: vscode.TextEditor) => {
			insertSnippet(textEditor);
		}
	);

	let disposable_insertsnippetandfold = vscode.commands.registerTextEditorCommand(
		'snippet-from-file.insertsnippetandfold',
		async (textEditor: vscode.TextEditor) => {
			await insertSnippet(textEditor);
			vscode.commands.executeCommand(`editor.foldAllMarkerRegions`);
		}
	);

	context.subscriptions.push(disposable_insertsnippet);
	context.subscriptions.push(disposable_insertsnippetandfold);
}

export function deactivate() {}
