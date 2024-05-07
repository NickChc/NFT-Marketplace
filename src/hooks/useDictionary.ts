import { useLocaleProvider } from "@/providers/LocaleProvider";



export function useDictionary() {
    const { dictionary } = useLocaleProvider();

    if (dictionary == null) {
        throw new Error("useDictionary must be used within LocaleProvider");
    }

    return dictionary;
}