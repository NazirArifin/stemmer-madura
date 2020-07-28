interface Rule {
    name: string;
    pattern: RegExp;
    replacement: string;
    replacements: string[];
    hasVariance: boolean;
    recover: true | false | 'both';
}
declare const rules: Rule[];
export default rules;
