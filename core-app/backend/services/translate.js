import {TranslateClient, TranslateTextCommand} from "@aws-sdk/client-translate";

const region = "us-east-1";

const client = new TranslateClient({region});

const supportedLanguages = {
    af: "Afrikaans",
    sq: "Albanian",
    am: "Amharic",
    ar: "Arabic",
    hy: "Armenian",
    az: "Azerbaijani",
    bn: "Bengali",
    bs: "Bosnian",
    bg: "Bulgarian",
    ca: "Catalan",
    zh: "Chinese (Simplified)",
    "zh-TW": "Chinese (Traditional)",
    hr: "Croatian",
    cs: "Czech",
    da: "Danish",
    "fa-AF": "Dari",
    nl: "Dutch",
    en: "English",
    et: "Estonian",
    fa: "Farsi (Persian)",
    tl: "Filipino, Tagalog",
    fi: "Finnish",
    fr: "French",
    "fr-CA": "French (Canada)",
    ka: "Georgian",
    de: "German",
    el: "Greek",
    gu: "Gujarati",
    ht: "Haitian Creole",
    ha: "Hausa",
    he: "Hebrew",
    hi: "Hindi",
    hu: "Hungarian",
    is: "Icelandic",
    id: "Indonesian",
    ga: "Irish",
    it: "Italian",
    ja: "Japanese",
    kn: "Kannada",
    kk: "Kazakh",
    ko: "Korean",
    lv: "Latvian",
    lt: "Lithuanian",
    mk: "Macedonian",
    ms: "Malay",
    ml: "Malayalam"
}


export const translateFile = async (lines, targetLanguageCode) => {

    

    if (!Object.keys(supportedLanguages).includes(targetLanguageCode)) {
        throw new Error("Invalid language code provided.");
    }

    try {
        const linesWithTranslatedText = [];
        console.log("in tras");
        for (const line of lines) {
            console.log("in for");
            const translateCommand = new TranslateTextCommand({
                SourceLanguageCode: "auto",
                TargetLanguageCode: targetLanguageCode,
                Text: line.text
                
            });

            console.log(line.text);

            const result = await client.send(translateCommand);

            console.log(result);

            if (result.$metadata.httpStatusCode === 200) {
                linesWithTranslatedText.push({
                    text: line.text,
                    translatedText: result.TranslatedText
                });
            }
        }

        return linesWithTranslatedText;
    } catch (err) {
        console.log(err);
        return err;
    }
};