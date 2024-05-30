import { SVGAttributes } from "react";

export default function SearchSvg(props: SVGAttributes<SVGElement>) {
    return (
        <svg
            fill="currentColor"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                clipRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                fillRule="evenodd"
            />
        </svg>
    );
}
