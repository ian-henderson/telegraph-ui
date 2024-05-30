import { PropsWithChildren } from "react";

export default function BrandingPage({ children }: PropsWithChildren) {
    return (
        <main className="flex min-h-screen flex-col items-center bg-base-200">
            <div className="prose my-16">
                <h1>Telegraph</h1>
            </div>

            {children}
        </main>
    );
}
