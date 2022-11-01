declare type Props = {
    htmlWebpackPlugin: {
        options: {
            title: string;
            description: string;
            author: string;
        };
    };
};
export default function StaticTemplate(props: Props): string;
export {};
