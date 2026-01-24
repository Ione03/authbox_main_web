export type Blog = {
    id: number;
    title: string;
    paragraph: string;
    image: string;
    author: {
        name: string;
        image: string;
        designation: string;
    };
    tags: string[];
    publishDate: string;
};
