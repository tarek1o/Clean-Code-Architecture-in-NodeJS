export interface IFindOptions {
    where?: any, //{[key: string]: any},
    include?: any, //{[key: string]: boolean},
    skip?: number,
    take?: number,
    cursor?: any,
    distinct?: any,
    orderBy?: any,
    select?: any,
}