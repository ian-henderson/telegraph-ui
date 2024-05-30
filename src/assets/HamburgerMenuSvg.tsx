import { SVGAttributes } from "react";

export default function HamburgerMenuSvg(props: SVGAttributes<SVGElement>) {
    return (
        <svg
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M4 6h16M4 12h16M4 18h16"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
            />
        </svg>
    );
}
