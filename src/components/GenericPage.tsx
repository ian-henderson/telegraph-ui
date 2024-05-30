import { PropsWithChildren } from "react";
import { Helmet } from "react-helmet";

import BrandingPage from "./BrandingPage";

export interface GenericPageProps extends PropsWithChildren {
    title: string;
}

export default function GenericPage({ children, title }: GenericPageProps) {
    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>

            <BrandingPage>
                <div className="card card-compact w-80 bg-base-100 shadow-xl sm:w-96">
                    <div className="card-body gap-2">
                        <h2 className="card-title mb-1 justify-center">
                            {title}
                        </h2>

                        {children}
                    </div>
                </div>
            </BrandingPage>
        </>
    );
}
