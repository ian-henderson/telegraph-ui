import { parse, formatHex } from "culori";
import { useEffect } from "react";

export default function useSynchronizeTheme() {
    useEffect(() => {
        function synchronizeTheme() {
            const themeColorMetaTag = document.querySelector(
                "meta[name='theme-color']",
            );
            const style = getComputedStyle(document.documentElement);
            const backgroundColor = formatHex(parse(style.backgroundColor));

            if (!backgroundColor || !themeColorMetaTag) return null;

            themeColorMetaTag.setAttribute("content", backgroundColor);
        }

        const colorSchemeChangeQuery = window.matchMedia(
            "(prefers-color-scheme: dark)",
        );

        colorSchemeChangeQuery.addEventListener("change", synchronizeTheme);

        synchronizeTheme();

        return () => {
            colorSchemeChangeQuery.removeEventListener(
                "change",
                synchronizeTheme,
            );
        };
    }, []);
}
