export module interfaceACG{
    export interface acgLi{
        title: string;
        href: string
    }
    export interface acgListProp{
        title: string;
        li: acgLi[]
    }
    export interface acgDetail{
        poster: string;
        title: string;
        des: string,
        list: acgListProp[]
    }
}