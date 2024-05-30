import {
    FormEventHandler,
    PropsWithChildren,
    ReactNode,
    useCallback,
} from "react";
import { Helmet } from "react-helmet";

import BrandingPage from "./BrandingPage";

export interface GenericFormPageProps extends PropsWithChildren {
    error?: string;
    navLinks?: ReactNode[];
    onSubmit: FormEventHandler<HTMLFormElement>;
    title: string;
}

export default function GenericFormPage({
    children,
    error,
    navLinks,
    onSubmit,
    title,
}: GenericFormPageProps) {
    const renderLink = useCallback(
        (linkComponent: ReactNode, index: number) => {
            const isLastElement = index === (navLinks?.length || 0) - 1;
            const className = isLastElement ? undefined : "mr-3";

            return (
                <>
                    <div {...{ className }}>{linkComponent}</div>

                    {!isLastElement && <div className="mr-3">•</div>}
                </>
            );
        },
        [navLinks],
    );

    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>

            <BrandingPage>
                <form
                    {...{ onSubmit }}
                    className="card card-compact w-80 bg-base-100 shadow-xl sm:w-96"
                >
                    <div className="card-body gap-2">
                        <h2 className="card-title mb-1 justify-center">
                            {title}
                        </h2>

                        {!!error && <p className="text-error">{error}</p>}

                        {children}

                        {!!navLinks?.length && (
                            <div className="mt-2 flex flex-row justify-center">
                                {navLinks.map(renderLink)}
                            </div>
                        )}
                    </div>
                </form>
            </BrandingPage>
        </>
    );
}
