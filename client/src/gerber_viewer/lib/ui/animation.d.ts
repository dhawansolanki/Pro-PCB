import React from "react";
declare type AnimationProps = {
    in: boolean | string | null | undefined;
    children: React.ReactNode;
};
export declare type FadeProps = AnimationProps;
export declare function Fade(props: AnimationProps): JSX.Element;
export declare type SlideProps = AnimationProps & {
    from: "top" | "bottom" | "left" | "right";
};
export declare function Slide(props: SlideProps): JSX.Element;
export {};
