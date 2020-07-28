interface Rule {
    name: string;
    pattern: RegExp;
    replacement: string;
    replacements: string[];
    hasVariance: boolean;
}
declare const rules: Rule[];
export default rules;
