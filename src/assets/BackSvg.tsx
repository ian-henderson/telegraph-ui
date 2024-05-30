import { SVGAttributes } from "react";

export default function BackSvg(props: SVGAttributes<SVGElement>) {
    return (
        <svg
            fill="currentColor"
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M244 400L100 256l144-144M120 256h292"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={48}
            />
        </svg>
    );
}
