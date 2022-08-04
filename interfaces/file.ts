export interface IFile {
    fileid: string,
    ownerid: string,
    filename: string,
    upload: Date,
    expiration: Date,
    size: number,
    downloaded: number
}
