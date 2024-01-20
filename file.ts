import {Vault} from "obsidian";


export class AllFiles {
	files: File[];

	constructor(vault: Vault) {
		this.files = vault.getMarkdownFiles().map(
			file => new File(file.basename, vault.read(file))
		);
		this.computeLemmatizedContents();
	}

	computeLemmatizedContents() {
		this.files.forEach(file => file.computeLemmatizedContent());
	}

	computePossibleLinks = (fileContent: string, fileTitles: string[]) => {
		const titlesPresentInFile: string[] = [];
		fileTitles.forEach(title => {
			if (fileContent.includes(title)) {
				titlesPresentInFile.push(title);
			}
		});
		return titlesPresentInFile;
	}

}


export class File {
	fileName: string;
	possibleLinks: File[];
	rawContentBefore: Promise<string>;
	rawContentAfter: string; // Probably useless to store it
	lemmatizedContent: Promise<string>;

	constructor(fileName: string, rawContentBefore: Promise<string>) {
		this.fileName = fileName;
		this.possibleLinks = [];
		this.rawContentBefore = rawContentBefore;
		this.rawContentAfter = '';
		this.computeLemmatizedContent();
	}

	computeLemmatizedContent = async () => {
		// TODO: Remove punctuation, remove stop words, lemmatize, etc.
		this.lemmatizedContent = await this.rawContentBefore.toLowerCase();
	}


	// computeRawContentAfter() {}
	// computeLemmatizedContentBefore() {}
	// computeLemmatizedContentAfter() {}

}
