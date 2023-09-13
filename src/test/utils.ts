
export function conversionIn(formulas, allTags) {
    const regex = /\{ptag\|(\d+)\}/g;
    const replacedString = formulas.replace(regex, (match, tagId) => {
        const matchingTag = allTags?.find(tag => tag.tagId === Number(tagId));
        return matchingTag ? `{${matchingTag.tagName}}` : match;
    });
    return replacedString;
}
