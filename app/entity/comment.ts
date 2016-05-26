export class Comment {
    constructor(public body: string, public bandId: number, public albumId: number = null, public author: string = 'guest') { }
}