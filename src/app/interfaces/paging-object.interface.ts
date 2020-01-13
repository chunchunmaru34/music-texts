interface PagingObject<T> {
    href: string;
    items: Array<T>;
    limit: number;
    next: string;
    offset: number;
    previous: number;
    total: number;
}
