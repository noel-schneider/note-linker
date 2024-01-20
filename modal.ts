import {Modal} from "obsidian";
import {AllFiles, File} from "./file";


export class SampleModal extends Modal {

	onOpen() {
		const {contentEl} = this;

		// Create a button
        const button = contentEl.createEl('button', {text: 'Display file contents'});
        button.onclick = async () => {
			contentEl.empty();

			const allFiles = new AllFiles(this.app.vault); // Maybe move to main.ts? Or even before clicking the plugin?

			// Display file contents
			for (const file of allFiles.files) {
				contentEl.createEl('p', {text: String(await file.rawContentBefore)});
			}

		}


		// Display file contents
		// Promise.all(fileChanges)
		// 	.then(fileContentsResolved => {
		// 		console.log(fileContentsResolved);
		// 		for (const element of fileContentsResolved) {
		// 			contentEl.createEl('p', {text: String(element)});
		// 		}
		// 	})
		// 	.catch(error => {
		// 		console.error(error);
		// 	});

		// Close the modal
		// this.close();
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}
}
