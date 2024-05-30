import {
    CSSProperties,
    DetailedHTMLProps,
    HTMLAttributes,
    SVGAttributes,
    FC,
} from "react";

export interface IconProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
    color?: string;
    size?: number | string;
    svg: FC<SVGAttributes<SVGElement>>;
}

const defaultStyle: CSSProperties = {
    opacity: 0.7,
};

export default function Icon({
    color,
    size = 16,
    style,
    svg: Component,
    ...svgProps
}: IconProps) {
    const styleObj = { ...defaultStyle, ...style };

    if (color) styleObj.color = color;

    const svgExtraProps: SVGAttributes<SVGElement> = {
        height: `${size}px`,
        width: `${size}px`,
        style: styleObj,
    };

    // @ts-ignore
    return <Component {...svgProps} {...svgExtraProps} />;
}
